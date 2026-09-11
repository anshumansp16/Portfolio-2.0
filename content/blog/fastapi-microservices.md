---
title: "From FastAPI to Microservices: Handling 10K Concurrent Requests"
excerpt: "Our journey building production FastAPI microservices—reducing API response time by 40% and achieving predictable failure modes."
category: "AI & Systems"
topics: ["systems-i-build"]
readTime: "7 min read"
date: "August 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop"
---
## Introduction

FastAPI has become my go-to framework for building Python backends. Its async-first design, automatic OpenAPI docs, and type safety make it perfect for high-performance APIs.

This article shares how we built FastAPI microservices handling 10K+ concurrent requests, reduced response times by 40%, and designed for predictable failure modes.

## Why FastAPI?

Before FastAPI, we used Flask. The migration was driven by:

| Aspect | Flask | FastAPI |
|--------|-------|---------|
| Async support | Bolted on | Native |
| Type checking | Optional | Built-in |
| API docs | Manual | Automatic |
| Performance | ~1000 RPS | ~3000 RPS |
| Validation | External | Pydantic |

The performance difference alone justified the migration.

## Architecture: From Monolith to Microservices

### Before: The Monolith

```
┌────────────────────────────────────────┐
│            Flask Monolith              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ Auth │ │ User │ │ Task │ │ Data │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
└────────────────────────────────────────┘
```

Problems:
- Single point of failure
- Can't scale components independently
- Deployments affect everything

### After: Microservices

```
┌─────────────┐
│ API Gateway │
└──────┬──────┘
       │
┌──────┴──────┬──────────────┬──────────────┐
│             │              │              │
▼             ▼              ▼              ▼
┌─────┐   ┌──────┐    ┌──────┐    ┌──────┐
│Auth │   │ User │    │ Task │    │ Data │
│ API │   │ API  │    │ API  │    │ API  │
└─────┘   └──────┘    └──────┘    └──────┘
```

Each service:
- Scales independently
- Has its own database
- Can be deployed separately
- Fails in isolation

## Building High-Performance FastAPI Services

### Async All The Way

The key to FastAPI performance is embracing async:

```python
from fastapi import FastAPI
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

app = FastAPI()

# Bad: Blocking database call
@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()

# Good: Async database call
@app.get("/users/{user_id}")
async def get_user(user_id: int, db: AsyncSession = Depends(get_async_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()
```

### Connection Pooling

Database connections are expensive. Pool them:

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=30,
    pool_timeout=30,
    pool_recycle=1800,
)

AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

### Response Caching

Not everything needs to hit the database:

```python
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url("redis://localhost")
    FastAPICache.init(RedisBackend(redis), prefix="api-cache")

@app.get("/products/{product_id}")
@cache(expire=300)  # Cache for 5 minutes
async def get_product(product_id: int):
    # This result will be cached
    return await fetch_product(product_id)
```

## Handling 10K Concurrent Requests

### Load Testing Results

Using Locust for load testing:

```python
# locustfile.py
from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(0.1, 0.5)

    @task(3)
    def get_tasks(self):
        self.client.get("/api/v1/tasks")

    @task(1)
    def create_task(self):
        self.client.post("/api/v1/tasks", json={
            "title": "Test task",
            "priority": "high"
        })
```

**Results at 10K concurrent users:**

| Metric | Before Optimization | After Optimization |
|--------|--------------------|--------------------|
| RPS | 2,500 | 4,200 |
| P50 Latency | 180ms | 95ms |
| P95 Latency | 850ms | 280ms |
| P99 Latency | 2.1s | 520ms |
| Error Rate | 2.3% | 0.1% |

### Key Optimizations

1. **Async database driver** (asyncpg instead of psycopg2)
2. **Connection pooling** (20 base, 30 overflow)
3. **Redis caching** for read-heavy endpoints
4. **Pagination** for list endpoints
5. **Query optimization** (proper indexes, eager loading)

## Predictable Failure Modes

Systems will fail. The goal is predictable, graceful failure.

### Structured Error Responses

```python
from fastapi import HTTPException
from pydantic import BaseModel

class ErrorResponse(BaseModel):
    error_code: str
    message: str
    details: dict | None = None

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error_code=f"ERR_{exc.status_code}",
            message=exc.detail,
        ).dict()
    )
```

### Circuit Breakers

```python
from circuitbreaker import circuit

@circuit(failure_threshold=5, recovery_timeout=30)
async def call_external_service(data: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(EXTERNAL_URL, json=data)
        response.raise_for_status()
        return response.json()
```

### Health Checks

```python
@app.get("/health")
async def health_check():
    checks = {
        "database": await check_database(),
        "redis": await check_redis(),
        "external_api": await check_external_api(),
    }

    status = "healthy" if all(checks.values()) else "degraded"
    return {"status": status, "checks": checks}
```

### Graceful Degradation

```python
@app.get("/recommendations/{user_id}")
async def get_recommendations(user_id: int):
    try:
        # Try personalized recommendations
        return await ml_service.get_personalized(user_id)
    except ServiceUnavailable:
        # Fall back to popular items
        return await get_popular_items()
    except Exception:
        # Ultimate fallback
        return {"recommendations": [], "fallback": True}
```

## Observability

### Structured Logging

```python
import structlog

logger = structlog.get_logger()

@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())

    with structlog.contextvars.bound_contextvars(
        request_id=request_id,
        path=request.url.path,
        method=request.method,
    ):
        logger.info("request_started")

        start = time.perf_counter()
        response = await call_next(request)
        duration = time.perf_counter() - start

        logger.info(
            "request_completed",
            status_code=response.status_code,
            duration_ms=round(duration * 1000, 2)
        )

        return response
```

### Metrics

```python
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

This gives you automatic metrics for:
- Request count by endpoint
- Request latency histograms
- Response status codes
- In-flight requests

## Results

After the migration and optimizations:

- **40% reduction** in average response time
- **10K+ concurrent requests** handled reliably
- **99.5% deployment success rate** with CI/CD
- **Zero-downtime deployments** with rolling updates
- **Predictable failure modes** with circuit breakers

## Key Takeaways

1. **Go async**: FastAPI's async support is its superpower—use it everywhere
2. **Pool connections**: Database connections are expensive; pool aggressively
3. **Cache strategically**: Redis caching can eliminate most database load
4. **Design for failure**: Circuit breakers and graceful degradation are essential
5. **Observe everything**: You can't optimize what you can't measure

FastAPI makes building high-performance Python APIs accessible. The key is understanding async patterns and designing for scale from the start.

---

*Questions about FastAPI or microservices? Connect with me on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or [GitHub](https://github.com/anshumansp).*

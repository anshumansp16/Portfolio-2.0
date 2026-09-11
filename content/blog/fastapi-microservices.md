---
title: "Why I Ditched Flask and Never Looked Back"
excerpt: "We moved from a Flask monolith to FastAPI microservices and cut response time by 40%. Here's exactly what changed."
category: "AI & Systems"
topics: ["systems-i-build"]
readTime: "7 min read"
date: "August 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop"
faq:
  - question: "Is FastAPI actually faster than Flask?"
    answer: "In our load tests, yes, by a good margin, mostly because async is native instead of bolted on. We saw roughly 3000 RPS versus 1000 RPS on comparable endpoints."
  - question: "When should I split a monolith into microservices?"
    answer: "When one part of your system needs to scale, fail, or deploy independently from the rest. Not before that. Splitting too early just adds network overhead for no benefit."
  - question: "What actually helped us handle 10K concurrent requests?"
    answer: "Going async everywhere, pooling database connections properly, and caching read-heavy endpoints in Redis. Those three changes did most of the work."
---
FastAPI is my go-to for Python backends now. But it wasn't always. We started on Flask, and moved for real reasons, not just because FastAPI was newer.

Here's what actually changed, and the numbers that came with it.

## Why we left Flask

Flask's async support always felt bolted on afterward. FastAPI has it built in from the start, plus automatic API docs and real type checking through Pydantic.

In our load tests, FastAPI handled roughly 3000 requests per second where Flask managed about 1000 on the same hardware. That gap alone justified the migration.

## From one big app to several small ones

We had a single Flask app doing auth, users, tasks, and data, all tangled together. One bug in any part could take down everything, and we couldn't scale just the busy part.

```
┌────────────────────────────────────────┐
│            Flask Monolith              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ Auth │ │ User │ │ Task │ │ Data │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
└────────────────────────────────────────┘
```

We split it into separate services behind an API gateway, each with its own database, each deployable on its own.

```
┌─────────────┐
│ API Gateway │
└──────┬──────┘
       │
┌──────┴──────┬──────────────┬──────────────┐
▼             ▼              ▼              ▼
┌─────┐   ┌──────┐    ┌──────┐    ┌──────┐
│Auth │   │ User │    │ Task │    │ Data │
└─────┘   └──────┘    └──────┘    └──────┘
```

## Going async, properly

The real win in FastAPI only shows up if you actually go async everywhere, not just in the framework.

```python
# Blocking, holds up the whole event loop
@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()

# Async, doesn't block anything else
@app.get("/users/{user_id}")
async def get_user(user_id: int, db: AsyncSession = Depends(get_async_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()
```

Database connections are expensive to open, so we pool them instead of creating new ones per request.

```python
engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=30,
    pool_timeout=30,
    pool_recycle=1800,
)
```

And a lot of reads don't need to hit the database every single time.

```python
@app.get("/products/{product_id}")
@cache(expire=300)
async def get_product(product_id: int):
    return await fetch_product(product_id)
```

## What happened at 10K concurrent users

We load tested with Locust before and after these changes.

| Metric | Before | After |
|--------|--------|-------|
| RPS | 2,500 | 4,200 |
| P50 Latency | 180ms | 95ms |
| P95 Latency | 850ms | 280ms |
| Error Rate | 2.3% | 0.1% |

The biggest wins came from switching to an async database driver, connection pooling, Redis caching, and just adding pagination to list endpoints instead of returning everything at once.

## Designing for things to fail well

Systems fail. The goal is making sure they fail in a way you can predict and recover from.

We return structured errors instead of raw stack traces, wrap external calls in circuit breakers, expose a real health check endpoint, and fall back gracefully instead of crashing.

```python
@app.get("/recommendations/{user_id}")
async def get_recommendations(user_id: int):
    try:
        return await ml_service.get_personalized(user_id)
    except ServiceUnavailable:
        return await get_popular_items()
    except Exception:
        return {"recommendations": [], "fallback": True}
```

We also added structured logging with a request ID on every log line, so tracing one request across the system actually works, plus Prometheus metrics for request counts, latency, and status codes.

## Where we ended up

40% faster average response time, reliably handling 10K+ concurrent requests, 99.5% deployment success with CI/CD, and zero-downtime rolling deployments.

None of it was exotic. Go async everywhere, pool your connections, cache what you can, and plan for failure instead of hoping it won't happen.

## FAQ

**Is FastAPI actually faster than Flask?**
In our tests, yes, roughly 3000 RPS versus 1000 RPS, mostly because async is native instead of added on top.

**When should I split a monolith into microservices?**
When a specific part needs to scale, fail, or deploy independently. Splitting earlier than that just adds overhead.

**What actually helped us handle 10K concurrent requests?**
Going async everywhere, proper connection pooling, and Redis caching on read-heavy endpoints.

---

*Questions about FastAPI or microservices? Connect with me on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or [GitHub](https://github.com/anshumansp).*

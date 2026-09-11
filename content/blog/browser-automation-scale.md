---
title: "Browser Automation at Scale: 50K Tasks Daily"
excerpt: "How we architected an enterprise browser automation platform processing 50K+ daily tasks with 99.9% reliability using Selenium and Playwright."
category: "AI & Systems"
topics: ["systems-i-build"]
readTime: "10 min read"
date: "October 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1600&h=900&fit=crop"
---
## Introduction

When I joined Thunder Marketing Corporation, we had a challenge: automate browser-based workflows at enterprise scale. Not hundreds of tasks—tens of thousands daily, with 99.9% reliability requirements.

This article shares how we built a browser automation platform processing 50K+ tasks daily, the architectural decisions that made it possible, and the lessons learned along the way.

## The Challenge

Our requirements were demanding:

- **Volume**: 50,000+ automated tasks per day
- **Reliability**: 99.9% success rate (only 50 failures allowed per day)
- **Latency**: Most tasks complete within 30 seconds
- **Diversity**: Handle multiple websites with different structures
- **Resilience**: Graceful degradation when target sites change

Traditional automation approaches couldn't meet these requirements.

## Architecture Overview

We built a distributed system with these components:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Task Queue    │────▶│  Worker Pool    │────▶│  Result Store   │
│   (Redis)       │     │  (Kubernetes)   │     │  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         │              ┌───────────────┐               │
         └─────────────▶│   Scheduler   │◀──────────────┘
                        │   (FastAPI)   │
                        └───────────────┘
```

### Component Breakdown

1. **Task Queue (Redis)**: Holds pending tasks with priority levels
2. **Worker Pool (Kubernetes)**: Scalable browser workers running Playwright
3. **Scheduler (FastAPI)**: Orchestrates task distribution and retries
4. **Result Store (PostgreSQL)**: Persists results and audit logs

## Why Playwright Over Selenium

We started with Selenium but migrated to Playwright for several reasons:

| Feature | Selenium | Playwright |
|---------|----------|------------|
| Auto-wait | Manual | Built-in |
| Browser contexts | Slow | Fast, isolated |
| Network interception | Limited | First-class |
| Debugging | Basic | Excellent (trace viewer) |
| Parallelization | Complex | Simple |

### The Migration

```python
# Before: Selenium with explicit waits everywhere
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "submit"))
)
element.click()

# After: Playwright with auto-wait
await page.click("#submit")  # Auto-waits for element
```

This alone reduced our flaky tests by 40%.

## Scaling to 50K Tasks Daily

### Worker Pool Design

Each worker runs in a Kubernetes pod with:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: browser-worker
spec:
  replicas: 20  # Scales based on queue depth
  template:
    spec:
      containers:
      - name: worker
        image: browser-worker:latest
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
```

### Horizontal Pod Autoscaling

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: browser-worker-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: browser-worker
  minReplicas: 10
  maxReplicas: 50
  metrics:
  - type: External
    external:
      metric:
        name: redis_queue_length
      target:
        type: AverageValue
        averageValue: 100
```

We scale based on queue depth, not CPU—because browser automation is I/O bound.

## Achieving 99.9% Reliability

### Strategy 1: Intelligent Retries

Not all failures are equal. We classify them:

```python
class FailureType(Enum):
    TRANSIENT = "transient"      # Network timeout, retry immediately
    RATE_LIMITED = "rate_limit"  # Back off exponentially
    STRUCTURAL = "structural"    # Site changed, alert humans
    PERMANENT = "permanent"      # Invalid input, don't retry

async def execute_with_retry(task: Task) -> Result:
    for attempt in range(MAX_RETRIES):
        try:
            return await execute_task(task)
        except AutomationError as e:
            failure_type = classify_failure(e)

            if failure_type == FailureType.PERMANENT:
                raise  # Don't retry
            elif failure_type == FailureType.RATE_LIMITED:
                await asyncio.sleep(2 ** attempt * 10)  # Exponential backoff
            elif failure_type == FailureType.STRUCTURAL:
                alert_on_call(task, e)
                raise
            else:
                await asyncio.sleep(attempt * 2)  # Linear backoff
```

### Strategy 2: Health Checks and Circuit Breakers

```python
from circuitbreaker import circuit

@circuit(failure_threshold=5, recovery_timeout=60)
async def automate_site_a(task: Task) -> Result:
    # If this fails 5 times in a row, stop trying for 60 seconds
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # ... automation logic
```

### Strategy 3: Self-Healing Selectors

Sites change their HTML. We use multiple selector strategies:

```python
class ResilientLocator:
    def __init__(self, strategies: list[str]):
        self.strategies = strategies

    async def find(self, page) -> ElementHandle:
        for strategy in self.strategies:
            try:
                element = await page.wait_for_selector(
                    strategy,
                    timeout=5000
                )
                if element:
                    return element
            except:
                continue
        raise ElementNotFound(self.strategies)

# Usage
submit_button = ResilientLocator([
    "#submit-btn",                    # ID
    "button[type='submit']",          # Attribute
    "text=Submit",                    # Text content
    "button:has-text('Submit')",      # Playwright-specific
])
```

## Monitoring and Observability

You can't maintain 99.9% reliability without visibility.

### Metrics We Track

```python
from prometheus_client import Counter, Histogram, Gauge

tasks_total = Counter(
    'automation_tasks_total',
    'Total tasks processed',
    ['site', 'status']
)

task_duration = Histogram(
    'automation_task_duration_seconds',
    'Task execution time',
    ['site'],
    buckets=[1, 5, 10, 30, 60, 120]
)

queue_depth = Gauge(
    'automation_queue_depth',
    'Current queue depth',
    ['priority']
)
```

### Alerting Rules

```yaml
groups:
- name: automation
  rules:
  - alert: HighFailureRate
    expr: |
      sum(rate(automation_tasks_total{status="failed"}[5m]))
      / sum(rate(automation_tasks_total[5m])) > 0.01
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Automation failure rate above 1%"
```

## AI-Powered Enhancements

We integrated LLMs to handle edge cases:

### Dynamic Element Detection

When standard selectors fail, we use GPT-4 Vision:

```python
async def find_element_with_ai(page, description: str):
    screenshot = await page.screenshot()

    response = await openai.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": f"Find the {description} element and return its approximate coordinates"},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{screenshot}"}}
            ]
        }]
    )

    coordinates = parse_coordinates(response)
    await page.click(position=coordinates)
```

This handles sites with obfuscated selectors or dynamic class names.

## Results

After 9 months of iteration:

- **50K+ tasks daily** with consistent throughput
- **99.9% success rate** (averaging 30-40 failures per day)
- **P95 latency under 25 seconds** for standard tasks
- **60% cost reduction** compared to manual processing
- **85% improvement** in system reliability vs. initial version

## Key Takeaways

1. **Choose the right tool**: Playwright's auto-wait and browser contexts are game-changers
2. **Design for failure**: Intelligent retries and circuit breakers are essential
3. **Make selectors resilient**: Multiple fallback strategies prevent breakage
4. **Scale horizontally**: Browser automation is I/O bound; scale on queue depth
5. **Observe everything**: You can't fix what you can't see

Browser automation at scale is challenging, but with the right architecture, it's achievable.

---

*Building automation systems? Let's connect on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or check out my work on [GitHub](https://github.com/anshumansp).*

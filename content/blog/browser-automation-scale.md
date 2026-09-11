---
title: "How Do You Run 50,000 Browser Automation Tasks a Day Without It All Breaking?"
excerpt: "We needed 50K+ browser tasks a day at 99.9% reliability. Here's the architecture that actually got us there."
category: "AI & Systems"
topics: ["systems-i-build"]
readTime: "10 min read"
date: "October 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1600&h=900&fit=crop"
faq:
  - question: "Should I use Selenium or Playwright for browser automation at scale?"
    answer: "Playwright. It auto-waits for elements, has proper browser isolation, and its network interception is far better. We saw 40% fewer flaky tests just from migrating."
  - question: "How do you keep browser automation reliable at scale?"
    answer: "Classify failures instead of treating them all the same. Retry transient errors, back off on rate limits, alert a human when a site's structure actually changed, and never retry permanent failures."
  - question: "Do you scale browser workers based on CPU?"
    answer: "No, scale on queue depth. Browser automation is I/O bound, waiting on network and page loads, so CPU usage is a misleading signal."
---
When I joined Thunder Marketing Corporation, the ask was simple to say and hard to do: automate browser workflows at real scale.

Not hundreds of tasks a day. Tens of thousands. With 99.9% reliability, meaning basically no room for random failures.

Here's how we actually got there.

## What we were up against

50,000+ tasks a day. Only about 50 allowed failures in that whole day. Most tasks needed to finish inside 30 seconds. And every task hit a different website with a different structure, any of which could change without warning.

Normal automation scripts fall apart under this kind of load.

## The system we built

We split it into four pieces working together: a Redis task queue holding pending work with priority, a pool of Kubernetes workers actually running the browsers, a FastAPI scheduler handing out tasks and retries, and PostgreSQL storing results and logs.

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

## We started with Selenium, then switched

Selenium worked, technically. But we were constantly writing manual waits, and tests were flaky.

Playwright waits for elements automatically, isolates browser sessions properly, and its trace viewer makes debugging so much easier.

```python
# Before: manual wait, every single time
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "submit"))
)
element.click()

# After: Playwright just handles it
await page.click("#submit")
```

That switch alone cut our flaky tests by 40%.

## Getting to 50K tasks a day

Each worker runs in its own Kubernetes pod, and we scale the pool based on Redis queue depth, not CPU, because this kind of work is mostly waiting on the network, not crunching numbers.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: browser-worker
spec:
  replicas: 20
  template:
    spec:
      containers:
      - name: worker
        image: browser-worker:latest
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
```

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: browser-worker-hpa
spec:
  minReplicas: 10
  maxReplicas: 50
  metrics:
  - type: External
    external:
      metric:
        name: redis_queue_length
      target:
        averageValue: 100
```

## Getting to 99.9% reliability

This is the part people underestimate. Not all failures are the same, and treating them the same is how you either give up too early or retry forever.

We classify every failure into one of four types, and only retry the ones worth retrying.

```python
class FailureType(Enum):
    TRANSIENT = "transient"      # network hiccup, retry now
    RATE_LIMITED = "rate_limit"  # back off and wait
    STRUCTURAL = "structural"    # site actually changed, alert a human
    PERMANENT = "permanent"      # bad input, don't bother retrying
```

On top of that, we use circuit breakers so a failing site stops getting hammered:

```python
from circuitbreaker import circuit

@circuit(failure_threshold=5, recovery_timeout=60)
async def automate_site_a(task: Task) -> Result:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
```

And selectors that fall back to alternatives when a site changes its HTML:

```python
class ResilientLocator:
    def __init__(self, strategies: list[str]):
        self.strategies = strategies

    async def find(self, page) -> ElementHandle:
        for strategy in self.strategies:
            try:
                element = await page.wait_for_selector(strategy, timeout=5000)
                if element:
                    return element
            except:
                continue
        raise ElementNotFound(self.strategies)

submit_button = ResilientLocator([
    "#submit-btn",
    "button[type='submit']",
    "text=Submit",
])
```

## When even that fails, we use AI as the last resort

For sites with genuinely obfuscated or randomly generated class names, standard selectors just don't work. We fall back to asking GPT-4 Vision to look at a screenshot and point at the right element.

```python
async def find_element_with_ai(page, description: str):
    screenshot = await page.screenshot()

    response = await openai.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": f"Find the {description} element"},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{screenshot}"}}
            ]
        }]
    )

    coordinates = parse_coordinates(response)
    await page.click(position=coordinates)
```

It's slower and costs more, so we only reach for it when everything else fails.

## You have to be able to see what's happening

At this scale, you cannot maintain 99.9% reliability blind. We track task counts, latency, and queue depth with Prometheus, and alert automatically when failure rate crosses 1% over 5 minutes.

## Where we landed after 9 months

50K+ tasks daily, consistently. 99.9% success rate, usually 30 to 40 failures in a whole day. P95 latency under 25 seconds. 60% cheaper than doing it manually. And reliability improved 85% compared to our first version.

The honest takeaway: pick tools that handle waiting for you, design for things to fail gracefully instead of pretending they won't, and scale on the bottleneck that's actually real, which for browser work is almost always I/O, not CPU.

## FAQ

**Should I use Selenium or Playwright for browser automation at scale?**
Playwright. Auto-wait and proper isolation alone cut our flaky tests by 40%.

**How do you keep browser automation reliable at scale?**
Classify failures and only retry the ones worth retrying. Alert a human when a site's structure actually changed instead of retrying forever.

**Do you scale browser workers based on CPU?**
No, scale on queue depth. This kind of work is I/O bound, so CPU usage doesn't tell you much.

---

*Building automation systems? Let's connect on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or check out my work on [GitHub](https://github.com/anshumansp).*

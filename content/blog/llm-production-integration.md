---
title: "What Happens When Your Only LLM Provider Goes Down?"
excerpt: "Depending on one LLM provider is risky. Here's how we built fallbacks across GPT-4, Claude, and Gemini without losing our minds."
category: "AI & Systems"
topics: ["agents-llms", "systems-i-build"]
readTime: "6 min read"
date: "June 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&h=900&fit=crop"
faq:
  - question: "Should I use just one LLM provider in production?"
    answer: "I wouldn't. Outages happen, rate limits happen, and one provider might just be worse at your specific task. A fallback chain across two or three providers costs little and saves you on a bad day."
  - question: "How do you keep LLM costs under control?"
    answer: "Cache repeated prompts, send simple tasks to cheaper models, and keep your prompts short. Cutting prompt verbosity alone reduced our token usage by 30%."
  - question: "How do you get consistent output from an LLM?"
    answer: "Don't ask it to just write text and hope. Use a structured output parser (Pydantic works well) so the response has to match a schema you define."
---
The first time our only LLM provider had an outage mid-production, I learned this lesson the hard way. Everything just stopped.

After that, working across GPT-4, Claude, and Gemini for clients at Thunder Marketing and Sazag Infotech, the real lessons weren't about prompting. They were about reliability, cost, and not depending on any single vendor.

## Why one provider is a bad bet

OpenAI has had real outages. Rate limits hit you when you least expect it. Different providers are genuinely better at different things, Claude handles long context better, GPT-4 is often stronger at reasoning.

So we built a thin abstraction that tries providers in order and falls back automatically.

```python
class MultiProviderLLM:
    def __init__(self):
        self.providers = {
            LLMProvider.OPENAI: OpenAIClient(),
            LLMProvider.ANTHROPIC: AnthropicClient(),
            LLMProvider.GOOGLE: GoogleClient(),
        }
        self.fallback_order = [
            LLMProvider.OPENAI,
            LLMProvider.ANTHROPIC,
            LLMProvider.GOOGLE,
        ]

    async def complete(self, prompt: str, preferred_provider=None, **kwargs) -> str:
        providers = (
            [preferred_provider] + self.fallback_order
            if preferred_provider else self.fallback_order
        )

        for provider in providers:
            try:
                return await self.providers[provider].complete(prompt, **kwargs)
            except (RateLimitError, ServiceUnavailable) as e:
                logger.warning(f"{provider} failed: {e}")
                continue

        raise AllProvidersFailedError()
```

## Which provider for which job

From actual production use: GPT-4 for complex reasoning, Claude when the document is long (that 200K context window matters), either one for code, a cheaper fast model like Gemini Flash for simple stuff, and GPT-4V or Claude 3 for anything with images.

```python
def select_provider(task: Task) -> LLMProvider:
    if task.requires_vision:
        return LLMProvider.OPENAI
    if task.context_length > 100_000:
        return LLMProvider.ANTHROPIC
    if task.complexity == "simple":
        return LLMProvider.GOOGLE
    return LLMProvider.OPENAI
```

## Keeping the bill under control

LLM costs sneak up on you fast if you're not careful. Three things helped a lot.

Caching repeated prompts, since a surprising number of prompts repeat:

```python
async def complete(self, prompt: str, **kwargs) -> str:
    cache_key = hashlib.sha256(f"{prompt}:{kwargs}".encode()).hexdigest()
    cached = await self.cache.get(cache_key)
    if cached:
        return cached

    result = await self.llm.complete(prompt, **kwargs)
    await self.cache.setex(cache_key, 3600, result)
    return result
```

Sending simple tasks to cheaper models instead of the expensive one by default:

```python
async def smart_complete(prompt: str, task_type: str) -> str:
    if task_type in ["classification", "extraction", "simple_qa"]:
        return await gpt35_client.complete(prompt)
    if task_type in ["summarization", "translation"]:
        return await claude_instant_client.complete(prompt)
    return await gpt4_client.complete(prompt)
```

And just writing shorter prompts. Verbose, polite prompts cost more tokens for no real benefit.

```python
# Wastes tokens on politeness
prompt = """You are a helpful assistant that extracts information...
Please be thorough and accurate. Here is the document: {document}"""

# Same result, fewer tokens
prompt = """Extract names, dates, and amounts from this document:
{document}
Return as JSON: {{"names": [], "dates": [], "amounts": []}}"""
```

That last change alone cut our token usage by 30%.

## Making the output actually reliable

Asking an LLM to "just write JSON" and hoping is not a strategy. Force the structure with a parser.

```python
class ExtractedData(BaseModel):
    names: list[str]
    dates: list[str]
    amounts: list[float]

parser = PydanticOutputParser(pydantic_object=ExtractedData)
response = await llm.complete(prompt + parser.get_format_instructions())
data = parser.parse(response)
```

Wrap every call with retries and backoff, since transient failures happen more than you'd think.

```python
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=60))
async def robust_llm_call(prompt: str) -> str:
    return await llm.complete(prompt)
```

And track everything, requests by provider and status, latency, and token usage, so you actually see problems before your users complain about them.

## What this bought us

85% task automation accuracy in production, 99.5% availability thanks to the fallbacks, 40% lower cost from caching and tiered models, and no lock-in to a single vendor.

None of this is exciting engineering. But it's the difference between an AI feature that works reliably and one that quietly breaks the day your main provider has a bad afternoon.

## FAQ

**Should I use just one LLM provider in production?**
I wouldn't. Outages and rate limits happen. A fallback chain across two or three providers costs little and saves you on a bad day.

**How do you keep LLM costs under control?**
Cache repeated prompts, send simple tasks to cheaper models, keep prompts short. That last one alone cut our tokens by 30%.

**How do you get consistent output from an LLM?**
Use a structured output parser like Pydantic so the response has to match a schema, instead of hoping the model formats things correctly.

---

*Building with LLMs? Let's connect on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or explore my projects on [GitHub](https://github.com/anshumansp).*

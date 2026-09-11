---
title: "Integrating LLMs in Production: GPT-4, Claude, and Beyond"
excerpt: "Practical lessons from integrating multiple LLM providers into production systems—orchestration, fallbacks, and cost optimization."
category: "AI & Systems"
topics: ["agents-llms", "systems-i-build"]
readTime: "6 min read"
date: "June 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&h=900&fit=crop"
---
## Introduction

Integrating LLMs into production systems is more than just API calls. After deploying AI-powered automation systems at Thunder Marketing and building agentic AI architectures at Sazag Infotech, I've learned that the real challenges are reliability, cost management, and orchestration.

This article shares practical lessons from integrating GPT-4, Claude, and Gemini into production systems.

## The Multi-Provider Strategy

Relying on a single LLM provider is risky:

- **Outages happen**: OpenAI has had multiple significant outages
- **Rate limits**: Heavy usage can hit limits unexpectedly
- **Cost variation**: Different providers excel at different tasks
- **Capability differences**: Claude handles long contexts better; GPT-4 excels at reasoning

We use a multi-provider approach:

```python
from enum import Enum
from typing import Protocol

class LLMProvider(Enum):
    OPENAI = "openai"
    ANTHROPIC = "anthropic"
    GOOGLE = "google"

class LLMClient(Protocol):
    async def complete(self, prompt: str, **kwargs) -> str:
        ...

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

    async def complete(
        self,
        prompt: str,
        preferred_provider: LLMProvider | None = None,
        **kwargs
    ) -> str:
        providers = (
            [preferred_provider] + self.fallback_order
            if preferred_provider
            else self.fallback_order
        )

        for provider in providers:
            try:
                return await self.providers[provider].complete(prompt, **kwargs)
            except (RateLimitError, ServiceUnavailable) as e:
                logger.warning(f"{provider} failed: {e}")
                continue

        raise AllProvidersFailedError()
```

## Provider Selection: When to Use What

Based on our production experience:

| Use Case | Best Provider | Why |
|----------|--------------|-----|
| Complex reasoning | GPT-4 | Best logical capabilities |
| Long documents | Claude | 200K context window |
| Code generation | GPT-4 / Claude | Both excellent |
| Fast, cheap tasks | GPT-3.5 / Gemini Flash | Cost-effective |
| Vision tasks | GPT-4V / Claude 3 | Best multimodal |

### Dynamic Provider Selection

```python
def select_provider(task: Task) -> LLMProvider:
    if task.requires_vision:
        return LLMProvider.OPENAI  # GPT-4V

    if task.context_length > 100_000:
        return LLMProvider.ANTHROPIC  # Claude's long context

    if task.complexity == "simple":
        return LLMProvider.GOOGLE  # Gemini Flash for cost

    return LLMProvider.OPENAI  # GPT-4 as default
```

## Cost Optimization

LLM costs can explode quickly. Here's how we keep them manageable.

### 1. Prompt Caching

Many prompts are repeated. Cache them:

```python
import hashlib
from functools import lru_cache

class CachedLLM:
    def __init__(self, llm: LLMClient, cache: Redis):
        self.llm = llm
        self.cache = cache

    async def complete(self, prompt: str, **kwargs) -> str:
        # Create cache key from prompt + params
        cache_key = hashlib.sha256(
            f"{prompt}:{kwargs}".encode()
        ).hexdigest()

        # Check cache
        cached = await self.cache.get(cache_key)
        if cached:
            return cached

        # Call LLM
        result = await self.llm.complete(prompt, **kwargs)

        # Cache result (1 hour TTL)
        await self.cache.setex(cache_key, 3600, result)

        return result
```

### 2. Tiered Model Usage

Use cheaper models when possible:

```python
async def smart_complete(prompt: str, task_type: str) -> str:
    if task_type in ["classification", "extraction", "simple_qa"]:
        # Use cheaper model
        return await gpt35_client.complete(prompt)

    if task_type in ["summarization", "translation"]:
        # Medium tier
        return await claude_instant_client.complete(prompt)

    # Complex tasks get GPT-4
    return await gpt4_client.complete(prompt)
```

### 3. Prompt Optimization

Shorter prompts = lower costs:

```python
# Bad: Verbose prompt
prompt = """
You are a helpful assistant that extracts information from text.
Your task is to carefully read the following document and extract
all the key information including names, dates, and amounts.
Please be thorough and accurate in your extraction.
Here is the document:
{document}
"""

# Good: Concise prompt
prompt = """Extract names, dates, and amounts from this document:
{document}

Return as JSON: {{"names": [], "dates": [], "amounts": []}}"""
```

This reduced our token usage by 30%.

## Orchestration with LangChain

For complex workflows, LangChain provides excellent abstractions:

```python
from langchain.chains import LLMChain, SequentialChain
from langchain.prompts import PromptTemplate

# Step 1: Extract key points
extract_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["document"],
        template="Extract key points from: {document}"
    ),
    output_key="key_points"
)

# Step 2: Generate summary
summary_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["key_points"],
        template="Summarize these points: {key_points}"
    ),
    output_key="summary"
)

# Combine into pipeline
pipeline = SequentialChain(
    chains=[extract_chain, summary_chain],
    input_variables=["document"],
    output_variables=["summary"]
)

result = await pipeline.arun(document=doc)
```

## Agentic AI with LangGraph

For complex decision-making, we use LangGraph:

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class AgentState(TypedDict):
    task: str
    research: str
    plan: str
    result: str

def should_continue(state: AgentState) -> str:
    if state.get("result"):
        return END
    if state.get("plan"):
        return "execute"
    if state.get("research"):
        return "plan"
    return "research"

# Build the graph
workflow = StateGraph(AgentState)

workflow.add_node("research", research_node)
workflow.add_node("plan", planning_node)
workflow.add_node("execute", execution_node)

workflow.add_conditional_edges(
    "research",
    should_continue,
    {"plan": "plan", END: END}
)
workflow.add_conditional_edges(
    "plan",
    should_continue,
    {"execute": "execute", END: END}
)
workflow.add_conditional_edges(
    "execute",
    should_continue,
    {END: END}
)

workflow.set_entry_point("research")
agent = workflow.compile()
```

## Reliability Patterns

### Structured Outputs

Force consistent outputs with Pydantic:

```python
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel

class ExtractedData(BaseModel):
    names: list[str]
    dates: list[str]
    amounts: list[float]

parser = PydanticOutputParser(pydantic_object=ExtractedData)

prompt = f"""Extract data from this document:
{document}

{parser.get_format_instructions()}"""

response = await llm.complete(prompt)
data = parser.parse(response)  # Validated ExtractedData object
```

### Retry with Backoff

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=60)
)
async def robust_llm_call(prompt: str) -> str:
    return await llm.complete(prompt)
```

### Monitoring and Observability

```python
from prometheus_client import Counter, Histogram

llm_requests = Counter(
    'llm_requests_total',
    'Total LLM requests',
    ['provider', 'model', 'status']
)

llm_latency = Histogram(
    'llm_request_duration_seconds',
    'LLM request latency',
    ['provider', 'model']
)

llm_tokens = Counter(
    'llm_tokens_total',
    'Total tokens used',
    ['provider', 'model', 'type']  # type: prompt/completion
)
```

## Results

Our LLM integration strategy delivered:

- **85% task automation accuracy** in production
- **99.5% availability** with multi-provider fallbacks
- **40% cost reduction** through caching and tiered models
- **Sub-2s latency** for most requests
- **Zero vendor lock-in** with abstraction layers

## Key Takeaways

1. **Multi-provider is essential**: Don't depend on a single LLM provider
2. **Match model to task**: Use cheaper models for simple tasks
3. **Cache aggressively**: Many prompts repeat; cache the results
4. **Structure your outputs**: Pydantic parsers ensure consistency
5. **Monitor everything**: Track costs, latency, and success rates

LLMs are powerful tools, but production integration requires careful architecture. The patterns in this article have proven reliable across multiple enterprise deployments.

---

*Building with LLMs? Let's connect on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or explore my projects on [GitHub](https://github.com/anshumansp).*

---
title: "Building Production RAG Systems: Lessons from the Field"
excerpt: "What I learned designing RAG architectures for enterprise clients—from vector database optimization to achieving 40% better query accuracy."
category: "AI & Systems"
topics: ["agents-llms", "systems-i-build"]
readTime: "8 min read"
date: "December 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop"
---
## Introduction

Retrieval-Augmented Generation (RAG) has become the cornerstone of enterprise AI applications. After designing and deploying multiple RAG systems for enterprise clients at Sazag Infotech, I've learned that building a demo is easy—building a production system that delivers consistent, accurate results is an entirely different challenge.

In this article, I'll share the key lessons I learned while improving query accuracy by 40% and building systems that handle real enterprise workloads.

## The Gap Between Demo and Production

Most RAG tutorials show you how to:
1. Load documents into a vector database
2. Embed a query
3. Retrieve similar chunks
4. Pass them to an LLM

This works great for demos. But in production, you'll face:

- **Inconsistent retrieval quality**: Sometimes the most relevant chunks aren't the most semantically similar
- **Context window limitations**: Enterprise documents are long; you can't just stuff everything into the prompt
- **Latency requirements**: Users expect sub-second responses
- **Cost management**: GPT-4 calls add up quickly at scale

## Lesson 1: Chunking Strategy Matters More Than You Think

The default "split by 500 tokens" approach fails for structured documents. Here's what actually works:

### Semantic Chunking

Instead of fixed-size chunks, split documents at natural boundaries:

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Bad: Fixed size chunks
bad_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

# Better: Respect document structure
good_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n## ", "\n### ", "\n\n", "\n", " "]
)
```

### Document-Aware Chunking

For technical documentation, maintain context by including headers:

```python
def chunk_with_headers(document):
    chunks = []
    current_header = ""

    for section in document.sections:
        if section.is_header:
            current_header = section.text
        else:
            chunk_text = f"{current_header}\n\n{section.text}"
            chunks.append(chunk_text)

    return chunks
```

This simple change improved our retrieval accuracy by 15%.

## Lesson 2: Hybrid Search is Non-Negotiable

Pure vector similarity search has a critical flaw: it can miss exact matches. When a user searches for "error code E-4502", semantic search might return chunks about error handling in general, missing the specific error code documentation.

### Implementing Hybrid Search

We use a combination of:
1. **Dense retrieval** (vector similarity)
2. **Sparse retrieval** (BM25/keyword matching)
3. **Reciprocal Rank Fusion** to combine results

```python
from langchain.retrievers import EnsembleRetriever
from langchain.retrievers import BM25Retriever

# Create retrievers
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 10})
bm25_retriever = BM25Retriever.from_documents(documents)
bm25_retriever.k = 10

# Combine with ensemble
ensemble_retriever = EnsembleRetriever(
    retrievers=[vector_retriever, bm25_retriever],
    weights=[0.6, 0.4]
)
```

This hybrid approach improved our query accuracy by 25%.

## Lesson 3: Vector Database Choice Matters

We evaluated ChromaDB, Pinecone, and Weaviate for different use cases:

| Database | Best For | Trade-offs |
|----------|----------|------------|
| ChromaDB | Prototyping, small datasets | Limited scalability |
| Pinecone | Production, managed infrastructure | Cost at scale |
| Weaviate | Self-hosted, hybrid search | Operational overhead |

For most enterprise clients, we settled on **Pinecone** for managed deployments and **Weaviate** for on-premise requirements.

### Optimization: Metadata Filtering

Don't just rely on vector similarity. Use metadata to pre-filter:

```python
results = vectorstore.similarity_search(
    query,
    k=10,
    filter={
        "document_type": "technical_spec",
        "version": {"$gte": "2.0"},
        "department": user_department
    }
)
```

This reduces the search space and improves both accuracy and latency.

## Lesson 4: Query Understanding Changes Everything

Users don't always ask perfect questions. A production RAG system needs query preprocessing:

### Query Expansion

```python
def expand_query(original_query: str, llm) -> list[str]:
    prompt = f"""Given this search query, generate 3 alternative
    phrasings that might help find relevant information:

    Query: {original_query}

    Return only the alternative queries, one per line."""

    alternatives = llm.invoke(prompt).split("\n")
    return [original_query] + alternatives
```

### Intent Classification

Before retrieval, classify the query intent:

```python
intents = ["factual_lookup", "how_to", "troubleshooting", "comparison"]

def classify_intent(query: str) -> str:
    # Use a lightweight classifier or LLM
    # This helps select the right retrieval strategy
    pass
```

## Lesson 5: Evaluation is Continuous

You can't improve what you can't measure. We built a continuous evaluation pipeline:

### Metrics We Track

1. **Retrieval Precision@K**: Are the retrieved chunks relevant?
2. **Answer Correctness**: Does the final answer match ground truth?
3. **Faithfulness**: Is the answer grounded in retrieved context?
4. **Latency P95**: What's the worst-case response time?

### Automated Testing

```python
test_cases = [
    {
        "query": "What is the maximum file size for uploads?",
        "expected_answer": "50MB",
        "relevant_doc_ids": ["doc_123", "doc_456"]
    },
    # ... more test cases
]

def evaluate_rag_system(rag_chain, test_cases):
    results = []
    for case in test_cases:
        response = rag_chain.invoke(case["query"])
        results.append({
            "retrieval_hit": check_retrieval(response, case),
            "answer_correct": check_answer(response, case),
            "latency": response.latency
        })
    return aggregate_metrics(results)
```

## Results: 40% Improvement in Query Accuracy

By implementing these lessons, we achieved:

- **40% improvement** in query accuracy (measured by answer correctness)
- **60% reduction** in "I don't know" responses
- **Sub-500ms** P95 latency for most queries
- **30% cost reduction** through better caching and retrieval

## Key Takeaways

1. **Chunking is foundational**: Invest time in document-aware chunking strategies
2. **Hybrid search is essential**: Don't rely on vector similarity alone
3. **Preprocess queries**: Users ask imperfect questions; help them
4. **Measure everything**: Build evaluation into your pipeline from day one
5. **Iterate continuously**: RAG systems improve through constant refinement

Building production RAG systems is challenging, but the payoff—accurate, helpful AI assistants that actually work—is worth the investment.

---

*Have questions about building RAG systems? Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or [GitHub](https://github.com/anshumansp).*

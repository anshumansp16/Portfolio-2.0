---
title: "Why My RAG System Kept Giving Wrong Answers (Until I Fixed These 5 Things)"
excerpt: "I built a RAG system that worked great in the demo, then fell apart in production. Here's what was actually wrong, and how I fixed it."
category: "AI & Systems"
topics: ["agents-llms", "systems-i-build"]
readTime: "8 min read"
date: "December 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop"
faq:
  - question: "Why does my RAG system work in the demo but fail in production?"
    answer: "Usually it's the chunking. Fixed-size chunks that ignore document structure look fine on a small demo doc, then quietly break on real enterprise documents with headers and sections."
  - question: "Should I only use vector search for RAG?"
    answer: "No. Pure vector search misses exact matches like error codes or IDs. Combine it with keyword search (BM25) and merge the results. This alone can meaningfully improve accuracy."
  - question: "How do I know if my RAG system is actually getting better?"
    answer: "Build a small set of real test questions with known correct answers, and run them automatically every time you change something. Without this, you're just guessing."
---
I built my first "production" RAG system thinking it was basically done. Load documents, embed them, retrieve chunks, ask the LLM. Simple.

It worked great in the demo. Then real users started asking real questions, and it fell apart.

Here's what I actually had to fix, working with RAG systems for enterprise clients at Sazag Infotech.

## Chunking was the first problem

The default advice is "just split every 500 tokens." That breaks the moment your documents have real structure, like headers and sections.

Fixed size chunks cut sentences in half and lose all context.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

# What breaks: fixed size, no awareness of structure
bad_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

# What actually works: split at natural document boundaries
good_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n## ", "\n### ", "\n\n", "\n", " "]
)
```

I also started keeping the section header attached to every chunk from that section:

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

Small change. 15% better retrieval accuracy.

## Vector search alone was missing obvious answers

Here's a real failure. A user searches for "error code E-4502". Pure vector similarity search happily returns chunks about error handling in general, and completely misses the actual documentation for that specific code.

Because semantically, "error handling" and "E-4502" look kind of similar to an embedding model. But they are not the same thing at all.

The fix is combining dense retrieval (vector similarity) with sparse retrieval (plain keyword matching, BM25), and merging the results.

```python
from langchain.retrievers import EnsembleRetriever
from langchain.retrievers import BM25Retriever

vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 10})
bm25_retriever = BM25Retriever.from_documents(documents)
bm25_retriever.k = 10

ensemble_retriever = EnsembleRetriever(
    retrievers=[vector_retriever, bm25_retriever],
    weights=[0.6, 0.4]
)
```

This one change gave us a 25% jump in query accuracy.

## Picking the vector database mattered more than I expected

We tried ChromaDB, Pinecone, and Weaviate.

ChromaDB is nice for prototyping but doesn't hold up at scale. We ended up using Pinecone for managed deployments, and Weaviate when a client needed everything on their own servers.

One thing that helped a lot everywhere: don't rely on vector similarity alone, pre-filter with metadata first.

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

Smaller search space, better accuracy, faster too.

## People don't ask perfect questions

Real users type messy, half-formed questions. If your system only handles the clean version, it will disappoint people constantly.

Two things helped. First, generating a few alternate phrasings of the same query before searching:

```python
def expand_query(original_query: str, llm) -> list[str]:
    prompt = f"""Given this search query, generate 3 alternative
    phrasings that might help find relevant information:

    Query: {original_query}

    Return only the alternative queries, one per line."""

    alternatives = llm.invoke(prompt).split("\n")
    return [original_query] + alternatives
```

Second, figuring out what the user actually wants before searching (a lookup? a how-to? troubleshooting?), so you can pick the right retrieval strategy for that.

## You can't improve what you don't measure

This one sounds obvious but most teams skip it. We built a small evaluation pipeline with real test cases, and ran it every time we changed anything.

```python
test_cases = [
    {
        "query": "What is the maximum file size for uploads?",
        "expected_answer": "50MB",
        "relevant_doc_ids": ["doc_123", "doc_456"]
    },
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

We tracked retrieval precision, answer correctness, whether the answer was actually grounded in the retrieved text, and P95 latency.

## Where we ended up

After fixing all five of these: 40% better query accuracy, 60% fewer "I don't know" responses, most answers under 500ms, and 30% lower cost from better caching.

None of these fixes were fancy. Better chunking, hybrid search, smarter filtering, handling messy questions, and actually measuring results. Boring stuff, but it's what actually moves the needle.

## FAQ

**Why does my RAG system work in the demo but fail in production?**
Usually it's the chunking. Fixed-size chunks that ignore document structure look fine on a small demo doc, then quietly break on real enterprise documents with headers and sections.

**Should I only use vector search for RAG?**
No. Pure vector search misses exact matches like error codes or IDs. Combine it with keyword search (BM25) and merge the results.

**How do I know if my RAG system is actually getting better?**
Build a small set of real test questions with known correct answers, and run them automatically every time you change something.

---

*Have questions about building RAG systems? Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or [GitHub](https://github.com/anshumansp).*

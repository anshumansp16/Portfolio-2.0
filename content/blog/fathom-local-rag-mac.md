---
title: "Fathom: A Local-First RAG Assistant for Mac That Never Uploads Your Files"
excerpt: "I built a Mac desktop assistant that does RAG and agent tasks over folders you choose — running fully on Ollama, with SQLite FTS5 instead of a vector DB. Here's how it actually works."
category: "AI & Systems"
topics: ["local-llms", "apps-i-publish", "agents-llms"]
readTime: "8 min read"
date: "September 2026"
author: "Anshuman Parmar"
heroImage: "/images/blog/fathom-chat.png"
sourceUrl: "https://github.com/anshumansp16/Fathom-Local-first-Mac-Desktop-Assistant."
faq:
  - question: "What is Fathom?"
    answer: "Fathom is a local-first Mac desktop assistant that does retrieval-augmented generation (RAG) and supervised agent tasks over folders you explicitly add — not a silent crawl of your whole disk. It runs on Ollama for fully local inference, or on an API key you bring (Anthropic, OpenAI-compatible, Groq)."
  - question: "Does Fathom send my files to the cloud?"
    answer: "In local mode, no file bytes ever leave the machine — the model runs on Ollama or LM Studio at 127.0.0.1. In cloud mode, only the query, the retrieved chunks, recent conversation turns, this-turn attachment text, and a compact local profile are sent. Full libraries are never uploaded, in either mode."
  - question: "What tech stack does Fathom use?"
    answer: "Tauri 2 (Rust) for the native shell, React 19 with TypeScript and Vite for the UI, SQLite in WAL mode with FTS5 for the local search index, reqwest + rustls for HTTP, and bun as the package manager."
  - question: "Why SQLite FTS5 instead of a vector database?"
    answer: "At the scale a single user's folders actually reach (under ~50k chunks), FTS5 keyword search is fast, ships with zero extra infrastructure, and needs no embedding step. Fathom's own scale path only reaches for embeddings plus reciprocal rank fusion between 50k and 1M chunks, and a dedicated vector store like LanceDB past that."
  - question: "Can Fathom read my entire disk?"
    answer: "No. It only indexes folders you add, inside a path jail, with skip-lists for .env files, keys, PEMs, ~/Library, and /System. The project's own architecture notes are explicit that embedding an entire disk on day one is a product-killer, not a goal."
  - question: "Is Fathom open source?"
    answer: "Yes, MIT licensed, on GitHub."
---
## What Fathom actually does

Fathom is a Mac desktop app: chat and a supervised agent that work over folders you add — Desktop, Documents, a specific project — not your whole disk. It runs two ways. Local mode routes everything through [Ollama](https://ollama.com) on `127.0.0.1`, and no file byte leaves the machine. Cloud mode sends the query, the retrieved chunks, recent turns, and a compact local profile to Anthropic or an OpenAI-compatible endpoint — never the raw files, never the whole library.

The pitch I built it against: Spotlight finds filenames but not content. Cloud chat tools understand language but can't see your disk. Fathom sits in the middle — real conversation quality over files that never have to leave your machine if you don't want them to.

## Why not just index everything

The obvious version of this product indexes your whole home folder on first launch. I didn't build that, for three concrete reasons documented in the architecture notes:

- **The sandbox forces it anyway.** An App Store build only gets user-granted folders via security-scoped bookmarks — there's no whole-disk access to embed even if you wanted to.
- **Time and RAM make it a bad idea regardless.** Embedding 512 GB on day one is what kills a local-first product's first-run experience.
- **Secrets have to stay out categorically**, not by best effort — `~/Library`, keychains, `.env`, SSH keys.

So the product is a library manager with skip-lists, not a crawler. "Most of your home folder" is a direction you grow into by adding folders, not a default.

## The retrieval pipeline

No vector database. The index is SQLite in WAL mode with FTS5:

```
Fathom.app (Tauri 2)
  React UI  --invoke/events-->  Rust core
                                  ├─ SQLite WAL + FTS5
                                  ├─ Indexer (incremental walk → chunk → upsert)
                                  ├─ Retriever (FTS5 top-k)
                                  ├─ Tool loop (path jail + Allow)
                                  └─ LLM router (localhost or user key)
```

Indexing is incremental — a walk over the library root that upserts by `path`, `mtime`, and `size`, skipping anything on the deny-list. Files get chunked into roughly 1000-character paragraph-aware windows with overlap, not fixed-size slices that cut a sentence in half. Retrieval is plain FTS5 top-k against those chunks, and every answer carries citations back to the file it came from — click one and it reveals in Finder.

The prompt budget is fixed, not "however much fits": system + privacy mode + tool rules at roughly 400 tokens, 8 retrieved chunks at ~300 tokens each (~2.4k), and the last 12 conversation turns, trimmed. A whole file only gets attached to the prompt if the agent explicitly called `read_file` on it — nothing gets dumped in by default.

This is a deliberate bet: FTS5 keyword search covers a single user's folders (under ~50k chunks) without an embedding step or extra infrastructure. The scale path only adds embeddings + reciprocal rank fusion between 50k and 1M chunks, and moves to something like LanceDB past that. Don't build the expensive version before you need it.

## The agent loop

Chat is one mode; the other is a supervised agent with four tools — search, read, list, and write (markdown, CSV, HTML, PPTX). The loop is bounded, not open-ended:

```
user → save → retrieve → complete(tools)
                  ↑            │
                  │      tool_calls?
                  │       yes → jail + exec → append tool result
                  │       no  → stream leftover / final text
                  └──────────── max 6 rounds
```

Every tool call runs inside the same path jail as retrieval, and every write action stops for an explicit Allow/Don't Allow prompt — there's no silent file mutation. Computer-use is opt-in and allowlisted (`open -a`, Shortcuts); there's no Accessibility-level click/type automation and no model-authored AppleScript, which closes off a whole class of prompt-injection risk where a file's contents could otherwise get treated as instructions instead of data.

## The gotcha that actually cost me time

Release builds broke with a cryptic Tauri bundling failure that had nothing to do with my code. The cause: Homebrew's `xattr` shadows the system one, and Tauri's bundler needs the system version to sign and package the `.app` correctly. The fix ended up being one env var on every build command:

```bash
PATH="/usr/bin:$PATH" bun run tauri build
```

It's the kind of failure that eats an evening if you don't know to look for it — worth writing down for the next person who hits the same wall shipping a Tauri app through Homebrew-managed tooling.

## Local vs. cloud, precisely

| Mode | What leaves the device |
|---|---|
| Local | Nothing — Ollama / LM Studio on `127.0.0.1` |
| Cloud | Query + retrieved chunks + recent turns + this-turn attach text + a compact local profile |

API keys live in `~/Library/Application Support/com.macrag.app/secrets.json` at mode `0600`, and aren't part of the repo. Libraries — the actual folder contents — are never uploaded in either mode; cloud mode only ever sees the chunks retrieval already picked.

## FAQ

**What is Fathom?**
A local-first Mac desktop assistant that does RAG and supervised agent tasks over folders you explicitly add, running fully on-device via Ollama or with your own cloud API key.

**Does Fathom send my files to the cloud?**
In local mode, no bytes leave the device. In cloud mode, only the query, retrieved chunks, recent turns, and a compact local profile go out — never full files or whole libraries.

**What tech stack does Fathom use?**
Tauri 2 (Rust) for the shell, React 19 + TypeScript for the UI, SQLite WAL + FTS5 for the index, reqwest + rustls for HTTP, bun as the package manager.

**Why SQLite FTS5 instead of a vector database?**
It's enough for the scale a single user's folders actually reach, with zero extra infrastructure and no embedding step. Embeddings only get added once chunk counts pass ~50k.

**Can Fathom read my entire disk?**
No — only folders you add, inside a path jail, with skip-lists for secrets, `.env`, PEMs, `~/Library`, and `/System`.

**Is it open source?**
Yes, MIT licensed.

---

Source and docs: [Fathom on GitHub](https://github.com/anshumansp16/Fathom-Local-first-Mac-Desktop-Assistant.). It's an early build — MVP is libraries + FTS5 + local/cloud LLM + four tools, deliberately not more than that yet.

*Have questions about building local-first RAG apps? Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or [GitHub](https://github.com/anshumansp).*

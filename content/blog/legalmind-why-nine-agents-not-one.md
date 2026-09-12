---
title: "Why Does LegalMind Use 9 AI Agents Instead of Just One?"
excerpt: "A single AI agent can't cover Indian corporate law, tax, labour law, and IP at once. Here's why I built 9 specialists that argue it out instead."
category: "AI & Systems"
topics: ["agents-llms", "apps-i-publish", "systems-i-build"]
readTime: "7 min read"
date: "September 2026"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=900&fit=crop"
faq:
  - question: "What is LegalMind?"
    answer: "An AI platform built for India's legal and compliance professionals, company secretaries, chartered accountants, corporate legal teams, that reviews documents, flags compliance risk, and drafts filings. Live at legal.anshumansp.com."
  - question: "Why not just use ChatGPT for legal document review?"
    answer: "A single general-purpose agent has to be equally good at company law, tax, labour law, IP, and banking regulation at once. In practice it ends up shallow on most of them. Specialist agents that only handle one domain go deeper."
  - question: "What is Particle Swarm Optimization doing in a legal AI product?"
    answer: "It's borrowed from a classic optimization algorithm to decide which specialist agents get listened to. Each agent scores its own confidence on the document, and the synthesis step weighs their answers by that score instead of treating every agent equally."
---
Most "AI for lawyers" products are really just ChatGPT with a legal-sounding system prompt.

I didn't want to build that. A document that touches company law, tax, and labour law all at once needs someone who actually knows all three, not one generalist pretending to.

So LegalMind doesn't have one AI brain. It has 9.

## The problem with one big agent

Think about what a single loan agreement actually touches in India. Banking regulation (RBI guidelines), company law (board resolution requirements), maybe FEMA if there's a foreign lender involved, maybe insolvency law if there's a default clause.

Ask one general-purpose model to check all of that in one pass, and it'll give you a reasonable-sounding answer that's shallow on at least half of it.

So instead, LegalMind has 9 separate specialist agents, each one only responsible for its own domain: Corporate/CS, Tax/CA, Labour law, IP, Real Estate, Banking/Finance, Insolvency, Data Privacy, and general contract law.

Each one is narrow on purpose.

## How it decides which agents to actually trust

Here's the part that's genuinely a bit unusual. Instead of just running all 9 agents and averaging their answers, LegalMind borrows an idea from Particle Swarm Optimization, an algorithm originally built for numerical optimization problems, and repurposes it for deciding which agents' opinions matter most on a given document.

Every agent scores its own confidence on the document it's looking at. A banking agent looking at a loan agreement scores itself high. A labour law agent looking at the same document scores itself low, because there's nothing about POSH or PF in a loan agreement.

```
                    ┌──────────────────┐
                    │  Your Document   │
                    │  (e.g., Loan     │
                    │   Agreement)     │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  PSO Supervisor  │  ← scores + routes
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │ Banking │         │ Contract│         │ FEMA    │
   │ (0.8)   │         │ (0.95)  │         │ (0.6)   │
   └────┬────┘         └────┬────┘         └────┬────┘
        │              GLOBAL BEST                │
        └────────────────────┼────────────────────┘
                    ┌────────▼─────────┐
                    │  Weighted        │
                    │  Synthesis       │
                    └──────────────────┘
```

The agent with the highest confidence becomes the "global best" for that document, and the final answer gets weighted toward it, contract review at 45%, banking at 35%, FEMA at 20%, say, rather than every agent's opinion counting equally.

## What the math actually looks like

Each agent's confidence updates like a particle's velocity in the original PSO algorithm:

```
velocity = w * v + c1 * r1 * (personal_best - x) + c2 * r2 * (global_best - x)
```

`w` is how much an agent sticks with its own prior read of the document. `c1` pulls it toward its own best past analysis. `c2` pulls it toward whichever agent currently looks most relevant. Run this for a couple of iterations and the swarm converges on which 4 agents actually matter for this specific document, instead of wasting time and tokens running all 9 in full every single time.

In practice, this means 60% faster analysis than running every agent sequentially, and noticeably better coverage than picking just one.

## A real example

Feed LegalMind a loan agreement, and here's roughly what comes back:

```json
{
  "summary": "Loan agreement reviewed by 4 specialist agents",
  "key_issues": [
    "SARFAESI clause missing",
    "Interest rate exceeds RBI guidelines"
  ],
  "recommendations": [
    "Add Section 13(2) notice provision",
    "Revise interest to 12% p.a."
  ],
  "primary_domain": "banking",
  "contributing_agents": ["banking", "contract_review", "fema", "insolvency"]
}
```

Notice it's not just "banking" that answered. Contract review, FEMA, and insolvency all had something small to add, because a real loan agreement genuinely touches all four.

## Why this matters more than it sounds

This isn't really a legal-AI story. It's a "what do you do when one task needs several kinds of expertise at once" story, and I think it applies to more than just contract review.

Most multi-agent systems either pick one agent per query (fast, shallow) or run every agent every time (thorough, slow and expensive). Weighting by self-reported confidence, and letting that weighting decide compute allocation too, is a cheap way to get most of the benefit of "ask everyone" without the full cost of it.

## Try it

LegalMind is live at [legal.anshumansp.com](https://legal.anshumansp.com). Upload a document and see which agents actually respond to it.

## FAQ

**What is LegalMind?**
An AI platform for India's legal and compliance professionals that reviews documents, flags compliance risk, and drafts filings. Live at legal.anshumansp.com.

**Why not just use ChatGPT for legal document review?**
One general agent has to be equally good at company law, tax, labour law, IP, and banking at once. In practice it ends up shallow. Specialist agents go deeper.

**What is Particle Swarm Optimization doing in a legal AI product?**
It decides which specialist agents get listened to. Each agent scores its own confidence, and the final answer is weighted by that score instead of treating every agent equally.

---

*Building multi-agent systems? Let's connect on [LinkedIn](https://www.linkedin.com/in/anshumansp16) or check out my other work on [GitHub](https://github.com/anshumansp).*

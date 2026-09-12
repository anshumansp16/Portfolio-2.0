---
title: "Why Does AI Keep Inventing Fake Court Judgments? Here's How I Stopped It"
excerpt: "Lawyers have been sanctioned for citing fake AI-generated court cases. LegalMind's judgment search is built specifically so that can't happen."
category: "AI & Systems"
topics: ["agents-llms", "apps-i-publish"]
readTime: "8 min read"
date: "September 2026"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=900&fit=crop"
faq:
  - question: "Why does ChatGPT make up fake court cases?"
    answer: "General-purpose LLMs generate text that looks like a citation because it's statistically plausible, not because they looked anything up. Without a real search step against an actual database of judgments, there's nothing stopping a confident-sounding fake."
  - question: "How does LegalMind make sure a case citation is real?"
    answer: "It doesn't ask an LLM to recall case law from memory. It searches Indian Kanoon and eCourtsIndia directly, and only ever shows you judgments that search actually returned, with the source link attached."
  - question: "Can AI tell you if a judgment is still good law?"
    answer: "Not reliably, and LegalMind deliberately doesn't claim to. It shows how often and how recently a judgment has been cited, which is a proxy for prominence, not a verdict. A green 'still valid' badge on an overruled case is worse than no badge at all."
---
A lawyer in the US got sanctioned by a federal judge for citing court cases in a legal brief that didn't exist. ChatGPT had made them up, complete with fake quotes and fake citations, and nobody checked before filing.

That's not a one-off story anymore. It's the single biggest reason legal professionals don't trust general AI tools with real research, and it's the exact problem LegalMind's judgment search is built to not have.

## Why this happens in the first place

An LLM predicts the next plausible word. Ask it to recall a court case and it will generate something that reads exactly like a real citation, correct format, plausible court name, plausible year, because that's what citations statistically look like in its training data.

It's not looking anything up. There's no search step. So when it doesn't actually know the case, it doesn't say "I don't know", it fills the gap with something fluent and wrong.

## What LegalMind does differently

It never asks a model to recall a case from memory. Every judgment search actually queries real sources, Indian Kanoon and eCourtsIndia, and only shows you what comes back.

```
"""
Indian Judgment Search Service

Integrates with Indian Kanoon (indiankanoon.org) for searching Indian
court judgments. Provides keyword + semantic search, court/year/section
filtering, AI summarization, and related judgment discovery.
"""
```

If the search returns nothing, you get nothing. The AI's job is to summarize and organize real results, not to invent ones when the search comes up empty.

## Not every court judgment is even worth citing

Here's something a lot of people, and apparently a lot of AI tools, get wrong: not every court decision is legal precedent.

Only the Supreme Court and High Courts create binding precedent in India, under Articles 141 and 227. A district court or magistrate's decision doesn't bind any other court and can't be cited as authority, even though it's a real, searchable judgment.

LegalMind classifies every result by court tier before it ever reaches you:

```python
TIER_SUPREME = "supreme_court"
TIER_HIGH = "high_court"
TIER_DISTRICT = "district_court"
TIER_TRIBUNAL = "tribunal"

# Only these two tiers are binding precedent.
PRECEDENTIAL_TIERS = frozenset({TIER_SUPREME, TIER_HIGH})
```

A comment in that code sums up why this matters more than it sounds: getting court classification wrong "silently disables both the precedential filter and the citation court-guard on every eCourts row." One misclassified court name, and the system might let a non-precedential case slip through as if it were binding. So classification is deliberately conservative, an ambiguous court name stays unclassified rather than getting guessed at.

## The law itself changed in 2024, and most search tools didn't notice

On 1 July 2024, India replaced the IPC, CrPC, and Evidence Act with the BNS, BNSS, and BSA. Same underlying law in most sections, completely new numbering.

Search for "Section 302 IPC" the old-fashioned way, and you'll miss every judgment written after that date that cites "Section 103 BNS" instead, even though it's often the identical offence.

LegalMind rewrites the query both directions automatically:

```python
IPC_TO_BNS: dict[str, str] = {
    # old section -> new section
    ...
}
BNS_TO_IPC: dict[str, str] = {v: k for k, v in IPC_TO_BNS.items()}
```

Search for either the old or the new section number, and it searches both, so a query written before July 2024 doesn't silently go blind to everything decided after it.

## What it won't do: tell you a case is "safe"

This is the part I think matters most, and it's a deliberate limitation, not a missing feature.

A lot of legal research tools show a green "good law" badge, meaning nobody's overruled this case yet. LegalMind doesn't, and the reasoning is worth reading straight from the code comment:

```
Citation treatment: how often, and how recently, a judgment has
been cited.

Deliberately *not* called a "good law check". Cited-by frequency is
a proxy for prominence, not a verdict on validity: a judgment can be
cited hundreds of times and still have been overruled.

The one bug that would destroy trust in this product is a false
all-clear, a green "good law" badge on an overruled authority,
causing exactly the humiliation a lawyer is paying to avoid.
```

So instead of a verdict, it shows you citation counts, dates, and how recently it was cited by another case, real signals, with an explicit caveat attached every time, never a checkmark that could be wrong in the one way that actually hurts someone.

## A real gotcha I hit building this

Indian Kanoon's API has a query parameter for sorting citing cases by most recent. Pass it as a normal query parameter and the API silently ignores it, returning relevance order instead, which looks correct but quietly gives you a stale "most recent citation" date.

The fix was realizing `sortby` has to be passed inside the `formInput` string itself, not as a separate parameter. An easy one to miss, because the request doesn't fail, it just quietly returns the wrong order.

## Why this is the actual USP

Anyone can wrap an LLM around a text box and call it "legal AI." Making the search results real, correctly weighted by which court actually said it, aware that the underlying law changed in the middle of the dataset, and honest about what it doesn't know, that's the part that takes actual work, and it's the part that decides whether a lawyer can trust the output enough to use it.

## Try it

LegalMind is live at [legal.anshumansp.com](https://legal.anshumansp.com). Search a case and check the citation, it'll take you straight to the source.

## FAQ

**Why does ChatGPT make up fake court cases?**
It generates plausible-looking text, not verified lookups. Without an actual search step, there's nothing stopping a confident, fluent fake.

**How does LegalMind make sure a case citation is real?**
It searches Indian Kanoon and eCourtsIndia directly and only shows judgments that search actually returned, with the source attached.

**Can AI tell you if a judgment is still good law?**
Not reliably, and LegalMind doesn't claim to. It shows citation frequency and recency as a signal, never a verdict.

---

*Building trustworthy AI systems? I'd love to hear how you're approaching it. Reach out on [LinkedIn](https://www.linkedin.com/in/anshumansp16).*

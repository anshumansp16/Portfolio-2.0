---
title: "How Do You Make a Big Technical Decision When You Might Be Wrong?"
excerpt: "Most technical decisions are reversible. A few aren't. Knowing the difference changes how fast you should decide."
category: "Craft"
topics: []
readTime: "8 min read"
date: "August 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop"
faq:
  - question: "How do I know if a technical decision needs careful analysis or a quick call?"
    answer: "Ask how hard it would be to reverse. Core technology, database architecture, and public API contracts deserve real analysis. Internal tools and code organization should be decided fast."
  - question: "Is a fast decision better than a slow, perfect one?"
    answer: "Usually yes. A fast decision at 80% confidence tends to beat a slow one at 95% confidence, because you learn more from actually doing something than from analyzing it further."
---
Engineering leadership is mostly just decisions. Which technology, which architecture, which trade-off to accept.

Most of these decisions are reversible. A few genuinely aren't. Knowing which kind you're facing changes everything about how you should approach it.

## Two kinds of doors

Some decisions are one-way doors, hard or impossible to walk back. Core technology choices, database architecture, public API contracts, big vendor commitments. These deserve real analysis and broad input.

Others are two-way doors, easy to reverse. Internal tool choices, how you organize code, most feature implementations. These should get decided fast, with minimal ceremony.

## A simple way to work through it

First, classify it. Ask yourself: if this turns out wrong, how hard is it to change? Easy to change means decide quickly and learn from what happens. Hard to change means it's worth investing real time in analysis.

Then define what "good" actually looks like before you choose. What's a must-have, what's nice to have, what would be a dealbreaker.

Think past the first effect too. "This database is faster" is the first-order effect. "But we don't have anyone who knows how to run it" is the second-order effect that actually bites you later. Most bad decisions come from skipping this step.

Also ask what it costs to reverse if you need to. How long would it take, what would it cost, what would you lose.

Then just decide, write down why, and move on.

## Traps that get people every time

Spending more time analyzing a decision than the decision is actually worth. Overweighting whatever happened most recently, that technology that burned you once might genuinely still be right. Sticking with a bad call because you've already invested in it, when the investment is gone either way. Waiting for total consensus, sometimes the right call makes someone unhappy and that's fine. And picking a technology because it's interesting rather than because it's actually appropriate here.

## Making a decision actually stick

Write down what options you considered, why you picked this one, and what trade-offs you accepted knowingly. Future you, or whoever replaces you, needs this.

For anything significant, set a real review point. "In six months we'll check if this was right" stops both premature panic and decisions that quietly outlive their usefulness.

And stay willing to revisit. Decisions should guide you, not trap you, when new information shows up.

## Speed usually beats certainty

A fast decision at 80% confidence tends to beat a slow one chasing 95% confidence. The learning you get from actually doing something outweighs the learning from more analysis, delayed decisions have their own hidden cost, and conditions keep changing while you deliberate.

## Who actually decides

Clear ownership stops decisions from getting diffused into nothing. Some people should just be informed, some should be consulted, and exactly one person should actually decide.

Help your team make good calls without needing you in the room. Share the reasoning behind a decision, not just the answer, and celebrate good decision-making process even on the days the outcome disappoints.

## What years of decisions taught me

Speed matters, a good decision now beats a perfect one later. Reversibility matters more than being right, optimize for learning fast. Write down the why, not just the what. Decision fatigue is real, so protect your energy for the ones that actually matter. And honestly, most decisions don't matter that much.

## FAQ

**How do I know if a technical decision needs careful analysis or a quick call?**
Ask how hard it would be to reverse. Core technology and database choices deserve real analysis. Internal tools should be decided fast.

**Is a fast decision better than a slow, perfect one?**
Usually yes. You learn more from doing something than from analyzing it further, and conditions change while you deliberate.

---

*How do you approach technical decisions? Let's discuss on [LinkedIn](https://www.linkedin.com/in/anshumansp16).*

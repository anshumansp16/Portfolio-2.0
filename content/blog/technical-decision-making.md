---
title: "Technical Decision Making: A Framework for Engineering Leaders"
excerpt: "How to make better technical decisions faster—a framework for evaluating trade-offs, managing risk, and choosing wisely."
category: "Craft"
topics: []
readTime: "8 min read"
date: "August 2025"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop"
---
## The Decision Burden

Engineering leadership is largely about decisions. Which technology? Which architecture? Which trade-off?

Most decisions are reversible. A few are not. Knowing the difference is crucial.

## The Two Types of Decisions

### Type 1: One-Way Doors
Decisions that are difficult or impossible to reverse:
- Core technology choices
- Database architecture
- Public API contracts
- Major vendor commitments

These deserve careful analysis, broad input, and deliberate consideration.

### Type 2: Two-Way Doors
Decisions that can be easily reversed:
- Internal tool choices
- Code organization
- Most feature implementations
- Process experiments

These should be made quickly with minimal ceremony.

## The Decision Framework

### Step 1: Classify the Decision

Ask: "If this is wrong, how hard is it to change?"

- Easy to change → Decide quickly, learn from results
- Hard to change → Invest in analysis

### Step 2: Define Success Criteria

Before choosing, define what "good" looks like:
- What are the must-haves?
- What are the nice-to-haves?
- What are the deal-breakers?

### Step 3: Consider Second-Order Effects

First-order: "This database is faster"
Second-order: "But it requires specialized knowledge we don't have"

Most bad decisions come from ignoring second-order effects.

### Step 4: Identify the Reversibility Cost

If we need to change this decision:
- How long will it take?
- How much will it cost?
- What will we lose?

### Step 5: Decide and Document

Make the decision. Document the reasoning. Move on.

## Common Decision Traps

### Analysis Paralysis
Spending more time analyzing than the decision is worth. Set time limits for Type 2 decisions.

### Recency Bias
Overweighting recent experiences. That technology that burned you once might still be the right choice.

### Sunk Cost Fallacy
Continuing with a bad decision because you've already invested. The investment is gone either way.

### Consensus Seeking
Waiting for everyone to agree. Sometimes the right decision makes some people unhappy.

### Technology Worship
Choosing technology because it's interesting, not because it's appropriate.

## Making Decisions Stick

### Document the Context

Future you (or your replacement) needs to understand:
- What options were considered
- Why this option was chosen
- What trade-offs were accepted

### Set Review Points

For significant decisions, schedule a review:
- "In 6 months, we'll evaluate whether this was the right choice"
- Prevents both premature abandonment and zombie decisions

### Allow Adaptation

Decisions should guide, not constrain. When new information emerges, be willing to revisit.

## The Speed-Quality Trade-off

Fast decisions with 80% confidence usually beat slow decisions with 95% confidence.

Why:
- The learning from action exceeds the learning from analysis
- Delayed decisions have their own costs
- Conditions change while you deliberate

## Team Decision Making

### Who Decides?

Clear ownership prevents decision diffusion:
- **Inform**: These people should know
- **Consult**: These people should input
- **Decide**: This person chooses

### Building Decision Capability

Help your team make decisions without you:
- Share frameworks, not just answers
- Explain reasoning, not just conclusions
- Celebrate good decision-making process, even when outcomes disappoint

## Lessons from Many Decisions

1. **Speed matters** - A good decision now beats a perfect decision later
2. **Reversibility matters more than correctness** - Optimize for learning
3. **Context preservation matters** - Document the why, not just the what
4. **Decision fatigue is real** - Protect capacity for important choices
5. **Most decisions don't matter much** - Focus energy on the few that do

---

*How do you approach technical decisions? Let's discuss on [LinkedIn](https://www.linkedin.com/in/anshumansp16).*

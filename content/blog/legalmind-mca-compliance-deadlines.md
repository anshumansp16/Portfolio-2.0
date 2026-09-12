---
title: "How Many MCA Deadlines Is Your Company Actually Missing Right Now?"
excerpt: "One missed MGT-7 filing costs ₹100 a day, up to ₹50,000. Most companies track this on a spreadsheet. Here's a better way."
category: "AI & Systems"
topics: ["apps-i-publish"]
readTime: "6 min read"
date: "September 2026"
author: "Anshuman Parmar"
heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop"
faq:
  - question: "What happens if a company misses its MGT-7 annual return filing?"
    answer: "A penalty of ₹100 per day, with no upper cap in many cases, starting from the due date, which is 60 days after the AGM. A filing missed by a few months adds up fast."
  - question: "What compliance deadlines does a private company in India actually need to track?"
    answer: "MCA filings like MGT-7 and AOC-4, GST returns (GSTR-1, 3B, 9, 9C), TDS returns, advance tax by quarter, and if there are employees, PF by the 15th, ESIC by the 15th, and a POSH annual report by January 31."
  - question: "Can AI actually generate a compliance calendar automatically?"
    answer: "Yes, if it knows the company's type (private/public, listed/unlisted) and which filings apply. LegalMind generates one automatically instead of a CS building it by hand every year."
---
Ask any Company Secretary how they track filing deadlines, and a lot of them will say some version of "a spreadsheet, and I hope I remember to check it."

That's not a knock on them. MCA, GST, TDS, and labour law deadlines all live in different places, and none of them send you a friendly reminder.

The cost of missing one is real though, so I built a compliance calendar into LegalMind that generates itself instead of being maintained by hand.

## What actually happens when you miss one

MGT-7, the annual return filing, is due 60 days after the AGM. Miss it, and the penalty is ₹100 a day. That sounds small until you realise it can run up to ₹50,000, and it starts counting from day one, not from when someone notices.

That's just one form. A private company is also tracking AOC-4 for financial statements, board resolution filings, and if it's a listed company, SEBI LODR obligations on top of all of it.

None of these deadlines depend on each other, and none of them wait for you to be ready.

## Why a spreadsheet quietly fails

A spreadsheet only works if someone updates it every time a rule changes, every time the company's status changes (say it crosses into "listed" territory), and every time a new employee triggers a labour law obligation that wasn't there before.

In practice, spreadsheets go stale. Someone leaves, a new CS inherits it, and half the context about why a row exists is gone.

## What LegalMind generates instead

You tell it the basics, company type, whether it's listed, whether you want GST and labour law included, and it builds the calendar from that.

```bash
curl -X POST https://legal.anshumansp.com/api/india/compliance-calendar \
  -H "Content-Type: application/json" \
  -d '{
    "company_type": "private",
    "is_listed": false,
    "include_gst": true,
    "include_labour": true,
    "include_income_tax": true
  }'
```

For a private, unlisted company with employees, that alone pulls in MCA deadlines (MGT-7, AOC-4), GST returns with their state-specific due dates, quarterly advance tax, TDS returns, and labour deadlines: PF by the 15th, ESIC by the 15th, and the POSH annual report by January 31.

Every deadline comes with the penalty attached, not just the date, so it's obvious which ones are actually expensive to miss.

## It checks documents against the rules too, not just dates

Deadlines are one half of it. The other half is catching mistakes before they become notices.

Upload a document and ask for a compliance review, and it comes back with something like this:

```json
{
  "applicable_forms": [
    {
      "form": "MGT-7",
      "reason": "Annual return filing required",
      "deadline": "60 days from AGM",
      "penalty": "₹100/day up to ₹50,000"
    }
  ],
  "compliance_status": "ISSUES_FOUND",
  "risks": [
    {
      "title": "Late filing risk",
      "section": "Section 92, Companies Act 2013",
      "severity": "HIGH"
    }
  ]
}
```

It names the actual section of the Companies Act, not just "this might be a problem", so whoever's reviewing it can go verify it themselves. It's a starting point for a professional to check, not a replacement for one.

## Where this actually helps

If you're a CS juggling several client companies, or an in-house legal team without a dedicated compliance hire, this is the part that saves the most time, not the AI writing clever prose, just never losing track of a date that costs money the moment it passes.

## Try it

LegalMind is live at [legal.anshumansp.com](https://legal.anshumansp.com). It's built specifically for Indian compliance work, not a general-purpose legal assistant with India bolted on.

## FAQ

**What happens if a company misses its MGT-7 annual return filing?**
A penalty of ₹100 per day, up to ₹50,000, starting from 60 days after the AGM.

**What compliance deadlines does a private company in India actually need to track?**
MCA filings (MGT-7, AOC-4), GST returns, TDS returns, advance tax, and if there are employees, PF, ESIC, and POSH annual reporting.

**Can AI actually generate a compliance calendar automatically?**
Yes, once it knows the company type and which filings apply. LegalMind generates one instead of a CS building it by hand every year.

---

*Working in compliance or corporate legal? I'd love to hear what's actually painful about it. Reach out on [LinkedIn](https://www.linkedin.com/in/anshumansp16).*

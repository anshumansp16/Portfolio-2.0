# How Anshuman's blog posts get written

This is the standing style for every post from here on. Not a one-off request —
follow this for every new post in `content/blog/*.md` unless told otherwise.

## The voice

Talking to a friend who's a developer, over chai, not writing a technical
manual. Professional, not sloppy, but never corporate and never a textbook.

Simple English. If a college student or a first-year developer can't follow
a sentence, rewrite it. Indian English rhythm is fine and preferred, direct
sentences, not flowery American marketing copy.

## Paragraph length

**1-2 lines max, then a line break.** No wall-of-text paragraphs, ever. If a
thought needs 4 lines, that's 3 paragraphs, not one.

## Titles

Every title is a question or a hook about a problem/story, never a generic
label. Someone should read it and think "wait, what happened?" or "yeah I
have that exact problem."

- Bad: "Building Production RAG Systems: Lessons from the Field"
- Good: "Why My RAG System Kept Giving Wrong Answers (And the 15-Minute Fix)"
- Bad: "The Philosophy of Building"
- Good: "Why I Stopped Adding Features and Started Deleting Them"

## Structure: tell it like a story, not a manual

Every post walks through, in this rough order:
1. What gave me the idea (a reel, a problem, a moment)
2. What was broken / what I actually needed
3. What I decided to build, and why this way
4. How I actually built it (explain the tech in plain words, like you're
   telling a friend, not documenting an API)
5. A real problem I hit and how I solved it (a bug, a wrong decision, a
   number that surprised me)
6. Where it's going next
7. How someone else can try it

Headings (`##`) stay — they help both readers scanning and search engines/AI
answering a specific question. What changes is the tone underneath each one.

## Never do this (the AI tells)

- No em dashes (—). Use a comma, a period, or just start a new sentence.
- No "Furthermore", "Moreover", "In conclusion", "It's worth noting",
  "Let's dive in", "In today's fast-paced world".
- No perfectly symmetric three-item lists that sound generated.
- No corporate CTA blocks ("Ready to get started?"). End like you're
  signing off to a friend.
- Tables only when the data genuinely needs a table (like a comparison).
  Default to plain bullet points or just a sentence.

## Still keep (this is what actually makes it rank)

- Real specific details only the author would know: a bug, an exact number,
  a decision reversed, a screenshot that's actually real.
- One clear H1-level idea per post, answered directly in the first couple
  of lines, before going deep.
- Article/BreadcrumbList/FAQPage JSON-LD stays wired automatically through
  the frontmatter (`faq:` field) and page templates. Keep FAQ answers in
  the same plain, short-sentence voice as the rest of the post, not a
  formal restatement.

## Quick before/after

Before (explanatory, AI-sounding):
> Fathom is a local-first Mac desktop assistant that does retrieval-augmented
> generation (RAG) and supervised agent tasks over folders you choose —
> running fully on-device via Ollama, with SQLite FTS5 instead of a vector
> database for retrieval.

After (this voice):
> I built Fathom for myself first.
>
> It's a Mac app. You point it at a folder, it reads your files, and you can
> just chat with it about them.
>
> Everything runs on your machine. Nothing gets uploaded unless you turn on
> cloud mode yourself.

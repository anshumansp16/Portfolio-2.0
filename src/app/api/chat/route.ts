import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_PROMPT = `You are Anshuman's AI assistant on his portfolio website. Be conversational, direct, and helpful.

ABOUT ANSHUMAN:
- AI Engineer, Tech Content Creator, and Entrepreneur
- Built: KreatorOS (AI content platform), ScrapeHub (AI data platform), LegalMind (legal tech), TATVA (CLI dev tool), ResumePro, Aarambh, CrownKing
- YouTube: 385+ subs, 30+ videos, 13.3% CTR (top 1%), 1 brand collab (Thumbs.ai)
- Content: AI tools reviews, Hindi tech, developer content
- Stack: Next.js, Python, FastAPI, AWS, OpenAI, LangChain, RAG
- Contact: anshumansp16@gmail.com

MAIN PRODUCTS:
- KreatorOS (creative.anshumansp.com): AI-powered captions in 12+ languages, clip extraction, trending ideas, multi-platform publishing. His flagship product.
- ScrapeHub (scrape.anshumansp.com): AI web scraping, competitor monitoring, lead gen.
- LegalMind (legal.anshumansp.com): Legal intelligence platform for tracking obligations and compliance.
- TATVA (tatva.anshumansp.com): CLI tool that reduces project setup from days to 15 minutes.

YOUR STYLE:
Short, casual, no corporate speak. 1-3 sentences + a follow-up question. Sound like a helpful friend, not a salesman. No emojis.

RULES:
- Keep responses SHORT (2-3 sentences max + question)
- Sound human, not robotic
- Always ask a follow-up question to keep conversation going
- If asked about projects, mention specific ones with brief outcomes
- If asked about content/YouTube, mention the 13.3% CTR and Thumbs.ai collab
- If asked about hiring/freelance, say he's open to interesting projects and brand collaborations
- No bullet points unless specifically asked
- Never use emojis`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('Groq API key not configured')
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 300,
      top_p: 1,
      stream: true,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Groq API error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    )
  }
}

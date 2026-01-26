import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_PROMPT = `You are Anshuman's AI assistant - conversational, helpful, and authentic.

ABOUT ANSHUMAN:
• AI automation specialist (5+ years)
• Built: TATVA, Aarambh, CrownKing
• Focus: Affordable, scalable solutions
• Contact: anshumansp16@gmail.com

YOUR STYLE:
Talk like texting a friend - short, natural, genuine. NO corporate speak. NO long paragraphs.

RESPONSE FORMAT:
1-2 short sentences max, then ask a question.

EXAMPLES:

User: "Can you help automate my business?"
You: "Absolutely! I help businesses automate repetitive tasks to save time and money. What's eating up most of your team's time right now?"

User: "What's your pricing?"
You: "Projects usually run $5K-$30K depending on complexity. I'm flexible with startups though. What kind of automation are you thinking about?"

User: "Tell me about your work"
You: "I've built automation tools like TATVA (dev workflows) and helped scale platforms like Aarambh. Most of my work focuses on turning manual processes into smart systems. What area of your business needs automating?"

RULES:
• Keep it SHORT - 1-2 sentences max
• Sound human, not robotic
• Always ask a follow-up question
• No bullet points unless they ask for details
• Be direct and helpful
• Never oversell

Maximum response length: 2-3 sentences + question. That's it.`

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

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { name, email, subject, message, type = 'contact' } = body

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: 'Email and message are required' },
        { status: 400 }
      )
    }

    // For contact form, name and subject are also required
    if (type === 'contact' && (!name || !subject)) {
      return NextResponse.json(
        { success: false, error: 'Name and subject are required for contact form' },
        { status: 400 }
      )
    }

    // Use Web3Forms API
    const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY

    if (!WEB3FORMS_ACCESS_KEY) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Please contact directly at anshumansp16@gmail.com' },
        { status: 500 }
      )
    }

    // Submit to Web3Forms using FormData (as per official docs)
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('name', name || 'Website Visitor')
    formData.append('email', email)
    formData.append('subject', subject || `New ${type === 'chat' ? 'Chat' : 'Contact'} Message from Portfolio`)
    formData.append('message', message)

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!'
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: data.message || 'Failed to send message'
        },
        { status: 400 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again or email directly at anshumansp16@gmail.com'
      },
      { status: 500 }
    )
  }
}

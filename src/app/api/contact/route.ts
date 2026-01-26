import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log('=== Contact Form API Called ===')
    const body = await req.json()
    console.log('Request body:', body)

    const { name, email, subject, message, type = 'contact' } = body

    // Validate required fields
    if (!email || !message) {
      console.error('Validation failed: missing email or message')
      return NextResponse.json(
        { success: false, error: 'Email and message are required' },
        { status: 400 }
      )
    }

    // For contact form, name and subject are also required
    if (type === 'contact' && (!name || !subject)) {
      console.error('Validation failed: missing name or subject')
      return NextResponse.json(
        { success: false, error: 'Name and subject are required for contact form' },
        { status: 400 }
      )
    }

    // Use Web3Forms API
    const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY

    if (!WEB3FORMS_ACCESS_KEY) {
      console.error('Web3Forms access key not configured!')
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Please contact directly at anshumansp16@gmail.com' },
        { status: 500 }
      )
    }

    console.log('Web3Forms key found:', WEB3FORMS_ACCESS_KEY.substring(0, 8) + '...')

    // Submit to Web3Forms using FormData (as per official docs)
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('name', name || 'Website Visitor')
    formData.append('email', email)
    formData.append('subject', subject || `New ${type === 'chat' ? 'Chat' : 'Contact'} Message from Portfolio`)
    formData.append('message', message)

    console.log('Submitting to Web3Forms...')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    console.log('Web3Forms response status:', response.status)
    console.log('Web3Forms response headers:', Object.fromEntries(response.headers.entries()))

    const data = await response.json()
    console.log('Web3Forms response data:', data)

    if (data.success) {
      console.log('✅ Email sent successfully!')
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!'
      })
    } else {
      console.error('❌ Web3Forms error:', data)
      return NextResponse.json(
        {
          success: false,
          error: data.message || 'Failed to send message'
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('❌ Contact form error (catch block):', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again or email directly at anshumansp16@gmail.com'
      },
      { status: 500 }
    )
  }
}

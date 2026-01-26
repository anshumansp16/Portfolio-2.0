# Email Setup Guide

This portfolio uses [Web3Forms](https://web3forms.com/) for handling contact form and chat popup submissions.

## Setup Instructions

1. **Get your Web3Forms Access Key**
   - Visit [https://web3forms.com/](https://web3forms.com/)
   - Click "Get Started" or "Create Access Key"
   - Enter your email address (anshumansp16@gmail.com recommended)
   - You'll receive your access key instantly (no verification required)

2. **Add the Access Key to your project**
   - Create a `.env.local` file in the root directory
   - Add the following line:
     ```
     NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
     ```
   - Replace `your_access_key_here` with your actual access key

3. **Restart the development server**
   ```bash
   npm run dev
   ```

## Features

- **Contact Form**: Full contact form on `/connect` page
- **Chat Popup**: Quick message popup on all pages (bottom right corner)
- **Email Notifications**: All submissions sent to your configured email
- **Free Plan**: Web3Forms free plan includes 250 submissions/month

## Development Mode

In development mode, if the access key is not configured, form submissions will be logged to the console instead of sending emails.

## Alternative Email Services

If you prefer a different email service, you can modify `/src/app/api/contact/route.ts` to use:
- **Resend**: Modern email API with generous free tier
- **SendGrid**: Popular email service with good deliverability
- **Nodemailer**: Self-hosted solution using SMTP
- **EmailJS**: Client-side email service (no backend needed)

## Testing

1. Fill out the contact form or use the chat popup
2. Check your configured email for the submission
3. Verify that the form clears and shows success message

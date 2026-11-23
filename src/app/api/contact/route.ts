import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_APP_PASSWORD

    if (!emailUser || !emailPass) {
      console.warn('EMAIL_USER or EMAIL_APP_PASSWORD not set in environment.')
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been recorded. Our team will get back to you shortly.',
      })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    const inquiryCategory = subject || 'General Customer Support'

    // 1. Send notification to Soltikz Admin / Support inbox
    const adminMailOptions = {
      from: `"ResumeBuilderOne Inquiries" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `[Support Inquiry] ${inquiryCategory} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #151E2B; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Customer Support Inquiry</h2>
            <p style="margin: 6px 0 0; color: #9DAABB; font-size: 13px;">ResumeBuilderOne / Soltkiz IT Services</p>
          </div>
          <div style="padding: 24px; color: #16202E; font-size: 14px; line-height: 1.6;">
            <p style="margin-top: 0;"><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #0A6E4E;">${email}</a></p>
            <p><strong>Category:</strong> ${inquiryCategory}</p>
            <div style="margin-top: 16px; padding: 16px; background: #F4F6F9; border-radius: 8px; border-left: 4px solid #0A6E4E;">
              <strong>Message:</strong>
              <p style="margin: 8px 0 0; white-space: pre-wrap; color: #4B5768;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #7B8698;">
              You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    }

    // 2. Send confirmation receipt to user
    const userMailOptions = {
      from: `"Soltikz Support" <${emailUser}>`,
      to: email,
      subject: `We have received your message: ${inquiryCategory}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #151E2B; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Support Request Received</h2>
            <p style="margin: 6px 0 0; color: #9DAABB; font-size: 13px;">Soltkiz IT Services</p>
          </div>
          <div style="padding: 24px; color: #16202E; font-size: 14px; line-height: 1.6;">
            <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to us. We have successfully received your inquiry regarding <strong>${inquiryCategory}</strong>.</p>
            <p>Our dedicated support team typically reviews and replies within <strong>24 business hours</strong>.</p>
            <div style="margin-top: 16px; padding: 14px; background: #F4F6F9; border-radius: 8px;">
              <span style="font-size: 12px; color: #7B8698; text-transform: uppercase; font-weight: 700;">Summary of your message:</span>
              <p style="margin: 6px 0 0; font-size: 13px; color: #4B5768; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 13px; color: #7B8698;">
              Best regards,<br />
              <strong>Soltikz Support Team</strong><br />
              <a href="mailto:${emailUser}" style="color: #0A6E4E;">${emailUser}</a>
            </p>
          </div>
        </div>
      `,
    }

    await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ])

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! Our team will respond within 24 hours.',
    })
  } catch (error: any) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again or email info.soltikz@gmail.com directly.' },
      { status: 500 }
    )
  }
}

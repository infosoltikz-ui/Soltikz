import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

// Service Role Client — bypasses RLS, has access to auth.users
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  // 1. Authenticate the Cron request
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 2. Setup Nodemailer Transporter using Gmail App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,         // info.soltikz@gmail.com
        pass: process.env.EMAIL_APP_PASSWORD, // the 16-digit app password
      },
    })

    // 3. Define target window: plans expiring in exactly 5 days
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 5)
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    // 4. Find all subscriptions expiring in that window
    const { data: expiringSubscriptions, error: subError } = await supabase
      .from('payments_and_subscriptions')
      .select('user_id, valid_until')
      .gte('valid_until', startOfDay.toISOString())
      .lte('valid_until', endOfDay.toISOString())
      .eq('status', 'SUCCESS')

    if (subError) throw subError
    if (!expiringSubscriptions || expiringSubscriptions.length === 0) {
      return NextResponse.json({ success: true, message: 'No expiring subscriptions today.', emailsSent: 0 })
    }

    let emailsSent = 0

    for (const sub of expiringSubscriptions) {
      try {
        // 5. Get the user's login email directly from auth.users (most reliable source)
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(sub.user_id)
        if (authError || !authUser?.user?.email) {
          console.warn(`Could not find auth email for user_id: ${sub.user_id}`)
          continue
        }

        // 6. Also get their display name from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', sub.user_id)
          .single()

        // Use the login email (from auth.users) as the "to" address
        const userEmail = authUser.user.email
        const userName = profile?.full_name || authUser.user.user_metadata?.full_name || 'Valued User'
        const expiryFormatted = new Date(sub.valid_until).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })

        const mailOptions = {
          from: `"Soltikz Team" <${process.env.EMAIL_USER}>`,
          to: userEmail,  // ← the same email the user registered/logged in with
          subject: '⚠️ Your Soltikz Pro Plan expires in 5 days!',
          html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
                <div style="display: inline-block; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 8px 20px; margin-bottom: 12px;">
                  <span style="color: #94a3b8; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Soltikz Resume Builder</span>
                </div>
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800;">Plan Expiring Soon</h1>
                <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Action required to keep your Pro access</p>
              </div>

              <!-- Body -->
              <div style="background: #ffffff; padding: 36px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                <p style="font-size: 16px; color: #334155; margin: 0 0 16px;">Hi <strong>${userName}</strong>,</p>

                <!-- Warning Box -->
                <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                  <p style="margin: 0; font-size: 15px; color: #991b1b; font-weight: 700;">
                    ⚠️ Your Pro Plan expires on <span style="color: #ef4444;">${expiryFormatted}</span> (5 days left)
                  </p>
                </div>

                <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 16px;">
                  Once your plan expires, you'll lose access to:
                </p>
                <ul style="color: #475569; font-size: 15px; line-height: 1.9; padding-left: 20px; margin: 0 0 24px;">
                  <li>Unlimited AI resume generations</li>
                  <li>Premium resume templates</li>
                  <li>Advanced ATS score matching</li>
                  <li>AI cover letter generation</li>
                </ul>

                <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 28px;">
                  Renew now to continue building career-winning resumes without interruption.
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 32px 0;">
                  <a href="https://soltikz.com/dashboard/pricing" 
                     style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 10px; font-weight: 800; font-size: 16px; display: inline-block; letter-spacing: 0.3px;">
                    🔄 Renew My Plan Now
                  </a>
                </div>

                <p style="font-size: 13px; color: #94a3b8; margin: 0;">
                  If you have any questions, just reply to this email — we're happy to help!
                </p>
              </div>

              <!-- Footer -->
              <div style="background: #f1f5f9; border-radius: 0 0 16px 16px; padding: 20px; text-align: center; border: 1px solid #e2e8f0; border-top: none;">
                <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #334155;">The Soltikz Team</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                  This email was sent to <strong>${userEmail}</strong> because you have an active Pro subscription.
                </p>
              </div>

            </div>
          `,
        }

        await transporter.sendMail(mailOptions)
        emailsSent++
        console.log(`✅ Renewal reminder sent to: ${userEmail}`)

      } catch (err) {
        console.error(`❌ Failed to send email for user_id ${sub.user_id}:`, err)
      }
    }

    return NextResponse.json({
      success: true,
      totalExpiring: expiringSubscriptions.length,
      emailsSent,
    })

  } catch (error: any) {
    console.error('Cron job fatal error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

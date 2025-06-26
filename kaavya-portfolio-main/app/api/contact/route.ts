import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials not configured")
      return NextResponse.json(
        {
          error: "Email service not configured. Please contact the administrator.",
        },
        { status: 500 },
      )
    }

    console.log("Setting up Gmail transporter...")

    // Create Gmail transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log("Gmail transporter verified successfully")
    } catch (verifyError) {
      console.error("Gmail transporter verification failed:", verifyError)
      return NextResponse.json(
        {
          error: "Email service configuration error",
        },
        { status: 500 },
      )
    }

    // Email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Contact</title>
      </head>
      <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #9333ea 0%, #2563eb 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              💜 New Portfolio Contact
            </h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
              Someone reached out through your website!
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">
            
            <!-- Contact Info -->
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #9333ea;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">Contact Information</h2>
              <div style="margin-bottom: 10px;">
                <strong style="color: #475569;">Name:</strong>
                <span style="color: #1e293b; margin-left: 10px;">${name}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <strong style="color: #475569;">Email:</strong>
                <span style="color: #1e293b; margin-left: 10px;">
                  <a href="mailto:${email}" style="color: #9333ea; text-decoration: none;">${email}</a>
                </span>
              </div>
              <div>
                <strong style="color: #475569;">Subject:</strong>
                <span style="color: #1e293b; margin-left: 10px;">${subject}</span>
              </div>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">Message</h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; border: 2px solid #e2e8f0; line-height: 1.6;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
                 style="display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #2563eb 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">
                Reply to ${name}
              </a>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                📧 This message was sent from your portfolio contact form<br>
                🕒 Received on ${new Date().toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </p>
            </div>

          </div>
        </div>
      </body>
      </html>
    `

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "kaavyakri@gmail.com",
      subject: `🌟 Portfolio Contact: ${subject}`,
      html: htmlContent,
      replyTo: email,
    }

    console.log("Sending email...")

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)

    return NextResponse.json(
      {
        message: "Message sent successfully! I'll get back to you soon. 💜",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: `Failed to send message: ${error.message || "Please try again later"}`,
      },
      { status: 500 },
    )
  }
}

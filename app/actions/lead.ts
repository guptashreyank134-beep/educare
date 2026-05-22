'use server'

import { client } from '@/sanity/lib/client'
import nodemailer from 'nodemailer'

export async function createLead(formData: FormData) {
  const firstName = formData.get('firstName') as string || ''
  const lastName = formData.get('lastName') as string || ''
  const email = formData.get('email') as string || ''
  const phone = formData.get('phone') as string || ''
  const subject = formData.get('subject') as string || 'Website Contact Form'
  const message = formData.get('message') as string || ''

  try {
    // Note: We use a write-enabled client for server actions
    // Since sanity/lib/client.ts uses useCdn: true, we need a fresh one with token for writing
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    })

    await writeClient.create({
      _type: 'lead',
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      message: `Subject: ${subject}\n\n${message}`,
      submittedAt: new Date().toISOString(),
    })

    // Setup Nodemailer transport with Brevo SMTP
    if (process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.BREVO_SMTP_USER,
          pass: process.env.BREVO_SMTP_PASS,
        },
      })

      const mailOptions = {
        from: '"Dr. Shreyank Educare" <info@drshreyankeducare.com>',
        to: 'info@drshreyankeducare.com',
        subject: `New Lead: ${subject}`,
        text: `You have received a new message from the website contact form.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      }

      // Await email sending to guarantee it succeeds in serverless environments
      try {
        await transporter.sendMail(mailOptions);
      } catch (err: unknown) {
        console.error('Failed to send email notification:', err);
      }
    } else {
      console.warn('Brevo SMTP credentials not found. Skipping email notification.')
    }

    return { success: true, message: 'Thank you for your message! We will get back to you soon.' }
  } catch (error: unknown) {
    console.error('Error creating lead:', error)
    return { success: false, message: 'Something went wrong. Please try again later.' }
  }
}

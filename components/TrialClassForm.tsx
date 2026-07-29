'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createLead } from '@/app/actions/lead'

// On success we redirect here (a distinct URL + dataLayer event) so bookings can
// be measured as a conversion in GTM/GA4/Google Ads. Pass redirectTo={null} to
// keep the old inline-confirmation behaviour instead.
const TrialClassForm = ({ redirectTo = '/thank-you' }: { redirectTo?: string | null }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    const formElement = e.currentTarget
    const rawData = new FormData(formElement)

    // Construct a specialized FormData to fit into our Sanity Lead schema smoothly
    const formData = new FormData()
    formData.append('firstName', rawData.get('parentName') as string)
    formData.append('lastName', '') // Optional in backend
    formData.append('email', rawData.get('email') as string)
    formData.append('phone', rawData.get('phone') as string)
    formData.append('subject', 'Consultation Request - ' + (rawData.get('subject') as string))
    formData.append('vertical', 'local-k12')

    const messageBody = `
Parent's Name: ${rawData.get('parentName')}
Student's Grade: ${rawData.get('grade')}
Subject Required: ${rawData.get('subject')}
Phone Number: ${rawData.get('phone')}
Email ID: ${rawData.get('email')}
Preferred Mode Of Classes: ${rawData.get('mode')}
Consent to contact: ${rawData.get('consent') ? 'Yes' : 'No'}
    `.trim()

    formData.append('message', messageBody)

    const result = await createLead(formData)

    setIsSubmitting(false)

    if (result.success) {
      formElement.reset()
      // Fire a conversion signal for GTM (create a Custom Event trigger on
      // "generate_lead" and attach your GA4 / Google Ads conversion tag).
      if (typeof window !== 'undefined') {
        const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
        w.dataLayer = w.dataLayer || []
        w.dataLayer.push({ event: 'generate_lead', form: 'consultation' })
      }
      if (redirectTo) {
        router.push(redirectTo)
        return
      }
    }

    setFeedback(result)
  }

  return (
    <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 border border-[#F1F5F9]">

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="Parent or Student Name" placeholder="e.g. Priya Sharma" id="parentName" name="parentName" autoComplete="name" required />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Student's Grade or Course" placeholder="e.g. Grade 11 or UBC MATH 100" id="grade" name="grade" required />
          <Input label="Subject Required" placeholder="e.g. Pre-Calculus 12" id="subject" name="subject" required />
        </div>

        <Input label="Phone Number" type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. (604) 123-4567" id="phone" name="phone" required />
        <Input label="Email" type="email" inputMode="email" autoComplete="email" placeholder="e.g. you@example.com" id="email" name="email" required />
        <Input label="Preferred Format" placeholder="Online, in person, or not sure" id="mode" name="mode" required />

        <label htmlFor="consent" className="flex items-start gap-2 text-[13px] font-montserrat text-slate/70 leading-snug">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span>
            I agree to be contacted by Dr. Shreyank Educare about my enquiry by phone, email or
            WhatsApp. See our{" "}
            <a href="/privacy" className="text-primary underline">privacy policy</a>.
          </span>
        </label>

        {feedback && (
          <div className={`p-4 rounded-xl text-center text-sm font-medium ${feedback.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {feedback.message}
          </div>
        )}

        <div className="pt-2 flex flex-col items-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            iconRight={isSubmitting ? undefined : ArrowRight}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </span>
            ) : 'Book Free Consultation'}
          </Button>
        </div>
      </form>
    </div>

  )
}

export default TrialClassForm

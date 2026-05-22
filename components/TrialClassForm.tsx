'use client'

import React, { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createLead } from '@/app/actions/lead'

const TrialClassForm = () => {
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
    formData.append('subject', 'Trial Class Request - ' + (rawData.get('subject') as string))

    const messageBody = `
Parent's Name: ${rawData.get('parentName')}
Student's Grade: ${rawData.get('grade')}
Subject Required: ${rawData.get('subject')}
Phone Number: ${rawData.get('phone')}
Email ID: ${rawData.get('email')}
Preferred Mode Of Classes: ${rawData.get('mode')}
    `.trim()

    formData.append('message', messageBody)

    const result = await createLead(formData)

    setIsSubmitting(false)
    setFeedback(result)

    if (result.success) {
      formElement.reset()
    }
  }

  return (
    <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 border border-[#F1F5F9]">

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="Parent's Name" placeholder="enter first name" id="parentName" name="parentName" required />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Students' Grade" placeholder="enter last name" id="grade" name="grade" required />
          <Input label="Subject Required" placeholder="enter subject" id="subject" name="subject" required />
        </div>

        <Input label="Phone Number" type="tel" placeholder="enter subject" id="phone" name="phone" required />
        <Input label="Email ID" type="email" placeholder="enter email ID" id="email" name="email" required />
        <Input label="Preferred Mode Of Classes" placeholder="mention online/offline/not sure" id="mode" name="mode" required />

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
            ) : 'Get My Free Trial Class'}
          </Button>
        </div>
      </form>
    </div>

  )
}

export default TrialClassForm

'use client'

import React, { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/TextArea'
import { Button } from '@/components/ui/Button'
import { createLead } from '@/app/actions/lead'

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    const formData = new FormData(e.currentTarget)
    const result = await createLead(formData)

    setIsSubmitting(false)
    setFeedback(result)

    if (result.success) {
      (e.target as HTMLFormElement).reset()
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[24px] sm:rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.06)] p-6 sm:p-10 md:p-16 border border-[#F1F5F9] mb-16 sm:mb-32">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input label="First Name" placeholder="enter first name" id="firstName" name="firstName" required />
          <Input label="Last Name" placeholder="enter last name" id="lastName" name="lastName" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input label="Email ID" type="email" placeholder="enter email ID" id="email" name="email" required />
          <Input label="Phone Number" type="tel" placeholder="enter phone number" id="phone" name="phone" required />
        </div>
        
        <Input label="Subject" placeholder="enter subject" id="subject" name="subject" required />

        <Textarea label="Message/Feedback" placeholder="enter message here" rows={6} id="message" name="message" required />

        {feedback && (
          <div className={`p-4 rounded-xl text-center font-medium ${feedback.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {feedback.message}
          </div>
        )}

        <div className="pt-6 flex justify-center">
          <Button 
            type="submit"
            disabled={isSubmitting}
            iconRight={isSubmitting ? undefined : Send}
            className="bg-[#44619B] hover:bg-[#364d7c] text-white px-12 py-7 rounded-2xl text-lg font-semibold shadow-lg shadow-[#44619B]/20 h-auto disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </span>
            ) : 'Submit Form'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm

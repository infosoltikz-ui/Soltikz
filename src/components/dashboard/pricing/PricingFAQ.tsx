'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { FREE_TIER_CREDITS } from '@/utils/pricingPlans'

const FAQS = [
  {
    question: 'What happens after I use my free credits?',
    answer: `Your Free Plan includes ${FREE_TIER_CREDITS} AI tailored resume credits and never expires. Saved resumes stay in your library forever, and you can upgrade to Pro anytime for unlimited resume creation, Word (.docx) exports, Cover Letter Studio, and Interview Prep.`,
  },
  {
    question: 'Can I cancel or switch plans anytime?',
    answer:
      'Yes. You can manage your subscription from Settings at any time. Your Pro tools remain active through the end of your current monthly or annual billing period.',
  },
  {
    question: 'Does Pro unlock both Full-Time and C2C templates?',
    answer:
      'Yes. Every template across both Full-Time Corporate and C2C / Contract tracks is included, along with editable Word (.docx) and vector PDF exports.',
  },
  {
    question: 'How are payments processed securely?',
    answer:
      'All upgrades are processed via Razorpay encrypted checkout supporting UPI, credit/debit cards, and netbanking. Resume Builder One does not store card numbers on its servers.',
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="mb-14 max-w-3xl mx-auto">
      <div className="text-center mb-7">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Common Questions
        </span>
        <h2 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx

          return (
            <div
              key={idx}
              className={cn(
                'bg-white rounded-2xl border transition-all duration-200 overflow-hidden',
                isOpen
                  ? 'border-[#0F2744]/30 shadow-sm'
                  : 'border-slate-200/90 hover:border-slate-300'
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <span className="text-[14.5px] font-extrabold text-slate-900">
                  {faq.question}
                </span>
                <div
                  className={cn(
                    'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200',
                    isOpen
                      ? 'bg-[#0F2744] text-white rotate-180'
                      : 'bg-slate-100 text-slate-500'
                  )}
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </button>

              <div
                className={cn(
                  'grid transition-all duration-200 ease-in-out',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0 text-[13.5px] font-medium text-slate-600 leading-relaxed border-t border-slate-100/80 mt-0 pt-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

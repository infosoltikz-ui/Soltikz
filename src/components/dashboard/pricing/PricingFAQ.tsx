'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const FAQS = [
  {
    question: 'What happens when Free expires?',
    answer: 'The Free plan does not expire, but it is limited to 10 resume creations and basic ATS scoring. Once you reach those limits, you can upgrade to Pro to unlock unlimited usage.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! You can cancel your subscription at any time from your account settings. Your premium features will remain active until the end of your current billing cycle.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. If you upgrade, the prorated difference will be applied to your account.'
  },
  {
    question: 'Is my payment secure?',
    answer: 'We use Stripe, an industry-leading payment processor, to securely handle all transactions. We do not store any of your credit card information on our servers.'
  }
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mb-24 max-w-3xl mx-auto">
      <h2 className="text-2xl font-black text-slate-900 mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx
          
          return (
            <div 
              key={idx}
              className={cn(
                "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                isOpen ? "border-primary/30 shadow-md" : "border-slate-200 shadow-sm hover:border-slate-300"
              )}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <span className="text-[15px] font-black text-slate-900">{faq.question}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                  isOpen ? "bg-primary/10 text-primary rotate-180" : "bg-slate-50 text-slate-400"
                )}>
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </button>
              
              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-5 pt-0 text-[14px] font-medium text-slate-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client";
import { FileText, UserPlus, Mail, ShieldCheck, ChevronDown } from 'lucide-react'

const faqs = [
  {
    icon: <FileText className="w-5 h-5 text-primary" />,
    question: 'Can I upgrade or downgrade my plan anytime?',
    answer: 'Yes, you can change your plan at any time. Your changes will reflect in the next billing cycle.'
  },
  {
    icon: <UserPlus className="w-5 h-5 text-primary" />,
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes! You can try our Pro plan free for 7 days. No credit card required.'
  },
  {
    icon: <Mail className="w-5 h-5 text-primary" />,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, PayPal, and other secure payment methods.'
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    question: 'Is my data secure with Soltikz?',
    answer: 'Absolutely. We use industry-standard encryption to keep your data safe and private.'
  }
]

export function PricingFAQ() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-slate-900">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center">
                  {faq.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-[14px] font-bold text-slate-900 leading-tight">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  </div>
                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

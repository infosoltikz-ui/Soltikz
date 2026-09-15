'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'How does the ATS Score Checker and optimization work?',
    a: 'Our AI engine compares your resume against your target job description across 3 distinct scoring layers: Hard Skill Keywords, Title & Seniority Alignment, and Experience Impact Metrics. It identifies exact keyword gaps and rewrites your bullet points using recruiter-tested action verbs and measurable results to ensure high ATS match rates.'
  },
  {
    q: 'How many resumes can I create on the Free Plan?',
    a: 'Every new user receives 20 Free Tailored Resumes. You can input job descriptions, run real-time ATS keyword matching scans, and download your recruiter-ready resumes without needing to enter a credit card.'
  },
  {
    q: 'What is the difference between Full-Time (1-Page) and Contract/C2C (2-Page) resumes?',
    a: 'Full-Time corporate roles require a concise, punchy 1-page resume focusing on career progression and leadership. In contrast, Contract (C2C) and Staffing submissions demand a detailed 2-page format featuring an Executive Skills Matrix, vendor clearance details, and comprehensive technical environment bullets for rate negotiations.'
  },
  {
    q: 'Will my generated resume pass enterprise ATS systems like Workday and Taleo?',
    a: 'Yes. All our templates follow strict ATS parsing guidelines: single-column semantic hierarchy, ATS-safe typography (Inter, Calibri, Arial), standard section headers, and clean margin spacing. We avoid complex multi-column tables, graphics, and text boxes that commonly cause parsing failures in enterprise software.'
  },
  {
    q: 'Can I download my resumes in both PDF and DOCX formats?',
    a: 'Yes. You can instantly export pixel-perfect, recruiter-ready PDFs with embedded searchable text, as well as editable DOCX files for staffing agencies that require Word submissions.'
  },
  {
    q: 'Is my personal career information and contact data kept private?',
    a: 'Absolutely. We enforce 256-bit SSL encryption across all stored data. Your profile, work history, and contact details are strictly confidential and are never sold, rented, or shared with third-party recruiters or job boards.'
  },
  {
    q: 'Can I edit and customize individual resume sections after AI generation?',
    a: 'Yes. Once AI generates your tailored resume, you have full granular control in the interactive workspace editor. You can edit bullet points, add custom achievements, lock specific sections, and re-run keyword checks at any time.'
  },
  {
    q: 'What is included in the Pro Subscription?',
    a: 'Pro unlocks Unlimited AI Resume Generations, unlimited ATS keyword scans, full access to Contract (C2C) and Full-Time template libraries, and priority AI model processing for ₹499/month (or ₹4,790/year).'
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium mt-2 leading-relaxed">
            Clear answers about ATS scoring, resume formatting, free allowances, and privacy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.q}
                className={`border rounded-xl transition-all duration-200 ${
                  isOpen 
                    ? 'border-slate-300 bg-slate-50/50 shadow-2xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 text-[14px] sm:text-[15px]"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-primary/10 text-primary rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[13.5px] sm:text-[14px] text-slate-600 leading-relaxed border-t border-slate-100/80">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Support Link */}
        <div className="mt-10 text-center text-[13px] text-slate-500 font-medium">
          Have another question?{' '}
          <Link href="/contact" className="text-primary hover:text-primary-dark font-bold underline transition-colors">
            Contact our 24/7 support team
          </Link>
        </div>

      </div>
    </section>
  )
}

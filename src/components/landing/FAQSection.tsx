'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  q: string
  a: string
}

const faqs: FAQItem[] = [
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
  // Allow independent open states so reading on one side doesn't collapse the other
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  // Split FAQs evenly into 2 columns for compact side-by-side display
  const midPoint = Math.ceil(faqs.length / 2)
  const leftCol = faqs.slice(0, midPoint)
  const rightCol = faqs.slice(midPoint)

  const renderFaqCard = (faq: FAQItem, index: number) => {
    const isOpen = openIndices.includes(index)

    return (
      <div
        key={faq.q}
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          isOpen
            ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm'
            : 'border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(index)}
          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100 text-[14px] sm:text-[15px] cursor-pointer"
        >
          <span className="leading-snug">{faq.q}</span>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
              isOpen
                ? 'bg-[#0F2744]/10 dark:bg-amber-400/20 text-[#0F2744] dark:text-amber-300 rotate-180'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        {isOpen && (
          <div className="px-5 pb-5 pt-1 text-[13.5px] sm:text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
            <p className="pt-2">{faq.a}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="bg-[#FBFBF9] dark:bg-[#0B132B] border-t border-slate-200/80 dark:border-slate-800 py-10 sm:py-12 transition-colors duration-300" id="faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#0F2744] dark:text-amber-400" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
            Clear answers about ATS scoring, resume formatting, free allowances, and privacy.
          </p>
        </div>

        {/* 2-COLUMN ACCORDION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Column 1 */}
          <div className="space-y-4">
            {leftCol.map((faq, i) => renderFaqCard(faq, i))}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {rightCol.map((faq, i) => renderFaqCard(faq, i + midPoint))}
          </div>
        </div>

        {/* Bottom Support Link */}
        <div className="mt-7 sm:mt-8 text-center text-[13px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1.5 flex-wrap">
          <span>Still have questions?</span>
          <Link
            href="/contact"
            className="text-[#0F2744] dark:text-amber-400 hover:underline font-bold inline-flex items-center gap-1 transition-colors"
          >
            <span>Contact our 24/7 support team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}

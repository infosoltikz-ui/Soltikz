"use client";
import React from 'react';
import { 
  UserCheck, 
  FileText, 
  Sparkles, 
  Download, 
  ArrowRight, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    title: 'Enter Career History Once',
    description: 'Add your employment history, technical tools, and achievements once — or import directly from LinkedIn. Soltkiz securely stores your Master Profile as the single source of truth.',
    highlight: 'No more repetitive typing'
  },
  {
    step: '02',
    title: 'Paste Any Target Job Posting',
    description: 'Paste the job requirements and select Full-Time (1-page) or C2C / Contract (2-page skills matrix). Our engine analyzes the keywords, seniority, and required metrics in seconds.',
    highlight: 'Workday & Taleo algorithm mapping'
  },
  {
    step: '03',
    title: 'Export in Word (.docx) or PDF',
    description: 'Download your recruiter-ready resume with strict 2-line bullets and bolded keywords. Plus, get an auto-generated matching Cover Letter and STAR interview talking points.',
    highlight: '95%+ Guaranteed ATS Score'
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0F2744]" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.12] mb-4">
            How Soltkiz lands you more interviews.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From generic career history to targeted, recruiter-ready resume in under 60 seconds.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div 
              key={step.step}
              className="relative bg-slate-50/70 border border-slate-200/80 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#0F2744] transition-colors font-mono">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                    {step.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-[#0F2744]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Automated &amp; Instant</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="text-center mt-12">
          <Link 
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0F2744] hover:bg-[#1A3A5F] text-white font-bold text-sm tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Try It Free — 20 Generations Included</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}

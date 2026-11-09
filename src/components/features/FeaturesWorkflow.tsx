"use client";
import React from 'react';
import { UploadCloud, ScanLine, FileCheck2, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Input Career History Once',
    desc: 'Sync directly from LinkedIn or import your existing PDF resume. Soltkiz organizes your career into your Master Profile.',
    icon: UploadCloud,
    badge: '1-Click Import',
  },
  {
    step: '02',
    title: 'Paste Target Job Posting',
    desc: 'Paste the job requirements from Workday, LinkedIn, or Greenhouse. Our engine extracts hard skills, seniority, and tooling.',
    icon: ScanLine,
    badge: 'Instant AST Scan',
  },
  {
    step: '03',
    title: 'AI Tailors 2-Line Bullets',
    desc: 'Our engine rewrites and ranks your achievements into the strict 2-line cadence with bolded employer keywords and measured metrics.',
    icon: FileCheck2,
    badge: '96+ ATS Score',
  },
  {
    step: '04',
    title: 'Export in Word or PDF',
    desc: 'Download your recruiter-ready resume in native .docx or vector PDF. Plus, grab your auto-generated matching cover letter.',
    icon: Download,
    badge: 'Ready in 60s',
  },
];

export function FeaturesWorkflow() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            Simple 4-Step Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 mb-3 tracking-tight">
            From raw career notes to shortlisted resume in 60 seconds.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            No repetitive typing. No guessing which keywords to use. A transparent, automated workflow.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORKFLOW_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 group-hover:text-emerald-600 transition-colors">
                      {s.step}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {s.badge}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-slate-900 group-hover:text-emerald-700 transition-colors" />
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-2">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated & Instant</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
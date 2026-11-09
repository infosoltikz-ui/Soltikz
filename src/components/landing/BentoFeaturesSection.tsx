"use client";
import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Layers, 
  Cpu, 
  MessageSquare,
  Check,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export function BentoFeaturesSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 border-t border-slate-100 relative overflow-hidden" id="features">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0F2744]" />
            Purpose-Built For Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.12] mb-4">
            Everything you need to turn job postings into interviews.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            No generic templates or arbitrary numbers. Soltkiz extracts employer vocabulary and reformats your career achievements with recruiter-approved precision.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: Strict 2-Line Bullets & Bold Keywords (Span 2) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#0F2744] bg-slate-100 px-3 py-1 rounded-full">
                Recruiter Gold Standard
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-3 mb-2">
                Strict 2-Line Bullets with Bolded Keywords
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Recruiters spend 6 seconds skimming. Our engine enforces exactly two full printed lines per bullet with bolded keywords so your top achievements are instantly seen.
              </p>
            </div>

            {/* Visual Example Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 font-sans">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2 border-b border-slate-200/60 pb-2">
                <span>Senior Software Engineer • TechFlow Inc.</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ideal 2-Line Quota
                </span>
              </div>
              <div className="space-y-2.5 text-xs text-slate-800 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2744] mt-1.5 shrink-0" />
                  <p>
                    Architected distributed <strong className="font-extrabold text-slate-950">Next.js 16</strong> &amp; <strong className="font-extrabold text-slate-950">TypeScript</strong> microservices reducing p99 latency by <strong className="font-extrabold text-slate-950">42%</strong> across 2.4M monthly transactions.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2744] mt-1.5 shrink-0" />
                  <p>
                    Streamlined automated <strong className="font-extrabold text-slate-950">CI/CD Pipelines</strong> on AWS ECS, slashing deployment failure rates from <strong className="font-extrabold text-slate-950">14% down to 0.4%</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Word (.docx) & Vector PDF Export (Span 1) */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#0F2744] bg-slate-100 px-3 py-1 rounded-full">
                Multi-Format
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-3 mb-2">
                Clean Word (.docx) &amp; Vector PDF
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Some portals require .docx while others prefer PDF. Export in either format with exact template styling, right-aligned dates, and custom colors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 mx-auto flex items-center justify-center font-black text-xs mb-1.5">
                  W
                </div>
                <div className="text-xs font-bold text-slate-900">Word (.docx)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Native Styles</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 mx-auto flex items-center justify-center font-black text-xs mb-1.5">
                  PDF
                </div>
                <div className="text-xs font-bold text-slate-900">Vector PDF</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Pixel Perfect</div>
              </div>
            </div>
          </div>

          {/* CARD 3: Corporate Full-Time & C2C / Contract Modes (Span 1) */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#0F2744] bg-slate-100 px-3 py-1 rounded-full">
                Universal Modes
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-3 mb-2">
                Full-Time &amp; C2C Modes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Switch effortlessly between 1-page corporate applications and 2-page vendor staffing submissions with dedicated skills tables and rate information.
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800">
                <span>Corporate Full-Time</span>
                <span className="text-[10px] text-slate-500 font-semibold">1-Page Concise</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800">
                <span>C2C / Contractor</span>
                <span className="text-[10px] text-slate-500 font-semibold">Skills Matrix + Projects</span>
              </div>
            </div>
          </div>

          {/* CARD 4: ATS Verification & Parsing Algorithms (Span 2) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F2744] bg-slate-100 px-3 py-1 rounded-full">
                  Parser Guaranteed
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  99.8% Average Clearance
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-3 mb-2">
                Tested Against Workday, Taleo, Greenhouse &amp; Lever
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Every template utilizes single-column linear hierarchy and standard standard font encodings so automated HR parsers can read every line without scrambling data.
              </p>
            </div>

            {/* ATS Systems Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { name: 'Workday', category: 'Enterprise HR', rate: '99.8% Pass' },
                { name: 'Greenhouse', category: 'Tech Scale-Ups', rate: '99.9% Pass' },
                { name: 'Taleo (Oracle)', category: 'Fortune 500', rate: '99.4% Pass' },
                { name: 'Lever', category: 'Modern ATS', rate: '99.8% Pass' },
              ].map((sys) => (
                <div key={sys.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                  <div className="text-xs font-black text-slate-900">{sys.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{sys.category}</div>
                  <div className="text-[10.5px] font-bold text-emerald-700 mt-1">{sys.rate}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


"use client";
import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, AlertCircle, Wrench, FileSearch } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
            <FileSearch className="w-3.5 h-3.5 text-secondary" />
            Actionable Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 mb-4 leading-[1.1] tracking-tight max-w-3xl">
            A score on its own is useless.<br />
            <span className="text-primary">Soltkiz tells you exactly what to fix.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
            Plenty of tools hand you an arbitrary percentage. The real value is the sentence underneath it — identifying the missing keyword and offering a one-click approved rewrite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Score Card Replica */}
          <div className="lg:col-span-7 bg-[#FBFBF9] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            
            {/* Top Score Summary */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/80">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-white border-2 border-primary shadow-xs">
                  <span className="text-2xl font-black text-slate-900">91</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[17px] font-black text-slate-900">Strong Match Score</h4>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full">Passes Screen</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Up from 74. Above 85 clears most automated HR screens for this role.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bars Breakdown */}
            <div className="space-y-4 mb-8 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Keywords from the Target Posting</span>
                  <span className="text-slate-900 font-black">88%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Title &amp; Seniority Level Fit</span>
                  <span className="text-slate-900 font-black">95%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Quantified Impact &amp; Metrics</span>
                  <span className="text-secondary font-black">72%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Machine Readability &amp; Typography</span>
                  <span className="text-emerald-700 font-black">99%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>

            {/* Actionable Missing Terms Card */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 border-l-4 border-l-amber-500 shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <h4 className="text-[14.5px] font-black text-slate-900">4 Required Terms Missing from Resume</h4>
              </div>
              <p className="text-[12px] text-slate-500 font-medium mb-3.5">
                The employer posting requires these specific technologies. None appear in your current draft:
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold rounded-lg font-mono">Microsoft Sentinel</span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold rounded-lg font-mono">KQL Queries</span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold rounded-lg font-mono">Defender XDR</span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold rounded-lg font-mono">Purview DLP</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button className="px-4 py-2 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary-hover shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  Auto-Rewrite Bullets to Include
                </button>
                <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer">
                  Dismiss
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Key Value Drivers */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-[#FBFBF9] p-5 rounded-2xl border border-slate-200/80">
              <h3 className="text-[16px] font-black text-slate-900 mb-1.5 tracking-tight">
                Reads the Posting, Not a Generic Template
              </h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Keywords come strictly from the job posting you pasted — not a generic stock list for "analyst roles". Two postings for the same title produce two completely tailored reports.
              </p>
            </div>
            
            <div className="bg-[#FBFBF9] p-5 rounded-2xl border border-slate-200/80">
              <h3 className="text-[16px] font-black text-slate-900 mb-1.5 tracking-tight">
                Every Flagged Problem Has a 1-Click Fix
              </h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Missing terms, weak passive verbs, bullets without metric outcomes. Each identified gap has a button that rewrites it, and you approve the draft before it lands on the page.
              </p>
            </div>
            
            <div className="bg-[#FBFBF9] p-5 rounded-2xl border border-slate-200/80">
              <h3 className="text-[16px] font-black text-slate-900 mb-1.5 tracking-tight">
                Complete Transparency (Diff Viewer)
              </h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Flip between the original and the tailored version anytime. Nothing is silently edited behind your back, and nothing is hallucinated — we only build from your master record.
              </p>
            </div>
            
            <div className="bg-[#FBFBF9] p-5 rounded-2xl border border-slate-200/80">
              <h3 className="text-[16px] font-black text-slate-900 mb-1.5 tracking-tight">
                Tests File Readability, Not Just Text
              </h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                Tests whether a machine parser can reliably extract your name, dates, and job titles. A fancy graphic template that comes out scrambled in Workday is worse than a plain text file.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

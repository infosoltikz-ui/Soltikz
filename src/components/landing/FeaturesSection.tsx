"use client";
import React from 'react';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-5 leading-[1.2] max-w-3xl">
            A score on its own is useless.<br />
            This tells you what to do.
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl leading-relaxed">
            Plenty of tools hand you a number. The part worth paying for is the sentence underneath it - the one that names the problem and offers to fix it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: UI Mockup */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
            
            {/* Top Score */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-full border-[4px] border-[#12734C]">
                <span className="text-xl font-bold text-slate-900">91</span>
              </div>
              <div>
                <h4 className="text-[17px] font-bold text-slate-900 mb-1">Strong match</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Up from 74. Above 85 clears most automated screens for this role.
                </p>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-[13px] font-medium mb-1.5">
                  <span className="text-slate-500">Keywords from the posting</span>
                  <span className="text-slate-900 font-bold">88%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#12734C] rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[13px] font-medium mb-1.5">
                  <span className="text-slate-500">Title and seniority fit</span>
                  <span className="text-slate-900 font-bold">95%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#12734C] rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[13px] font-medium mb-1.5">
                  <span className="text-slate-500">Results with numbers in them</span>
                  <span className="text-slate-900 font-bold">72%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D97706] rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[13px] font-medium mb-1.5">
                  <span className="text-slate-500">Machine readability</span>
                  <span className="text-slate-900 font-bold">98%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#12734C] rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100 mb-6" />

            {/* Action Block */}
            <div className="pl-4 border-l-[3px] border-[#DC2626]">
              <h4 className="text-[15px] font-bold text-slate-900 mb-1">Four required terms are missing</h4>
              <p className="text-[13px] text-slate-500 mb-3">
                The posting names these. None appear on your page.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold rounded-full">Microsoft Sentinel</span>
                <span className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold rounded-full">KQL</span>
                <span className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold rounded-full">Defender XDR</span>
                <span className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold rounded-full">Purview DLP</span>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#12734C] text-white text-[13px] font-bold rounded-md hover:bg-[#0f603f] transition-colors">
                  Add the ones I've used
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-[13px] font-bold rounded-md hover:bg-slate-50 transition-colors">
                  Ignore
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Text Blocks */}
          <div className="flex flex-col divide-y divide-slate-200/60">
            <div className="pb-5">
              <h3 className="text-[17px] font-bold text-slate-900 mb-1.5">It reads the posting, not a generic template</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                The keywords come from the job you pasted - not a stock list for "security roles". Two postings for the same title produce two different reports.
              </p>
            </div>
            
            <div className="py-5">
              <h3 className="text-[17px] font-bold text-slate-900 mb-1.5">Every problem comes with a fix</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Missing terms, bullets with no outcome, a summary that repeats your first job. Each one has a button that rewrites it, and you approve the change before it lands.
              </p>
            </div>
            
            <div className="py-5">
              <h3 className="text-[17px] font-bold text-slate-900 mb-1.5">You can see what changed</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Flip between the original and the tailored version. Nothing is edited behind your back, and nothing gets invented - we only work with what's in your profile.
              </p>
            </div>
            
            <div className="pt-5">
              <h3 className="text-[17px] font-bold text-slate-900 mb-1.5">It checks the file, not just the words</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Machine readability tests whether a parser can actually extract your name, dates and job titles. A beautiful résumé that comes out scrambled is worse than a plain one.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

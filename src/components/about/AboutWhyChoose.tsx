"use client";
import React from 'react';
import { Check, X, ShieldAlert, Sparkles, Trophy } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'ATS Screening Compatibility',
    others: '42% pass rate (Breaks in Workday/Taleo tables)',
    soltkiz: '99.4% verified single-column text AST parse',
  },
  {
    feature: 'Bullet Point Formatting',
    others: 'Irregular 1 to 4 line run-on walls of text',
    soltkiz: 'Strict 2-line recruiter standard with bolded keywords',
  },
  {
    feature: 'Contract / C2C Format',
    others: 'Unsupported (Only basic 1-page templates)',
    soltkiz: 'Dedicated 2-page vendor & client skills matrix',
  },
  {
    feature: 'Export Quality',
    others: 'Raster PDFs with non-selectable unparsable text',
    soltkiz: 'Clean native Microsoft Word (.docx) & Vector PDF',
  },
  {
    feature: 'Content Generation',
    others: 'Generic hallucinated filler phrases',
    soltkiz: 'Authentic career metrics + measured percentage gains',
  },
];

export function AboutWhyChoose() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Competitive Difference
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 mb-3 tracking-tight">
            Why serious job seekers choose Soltkiz AI.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            A side-by-side comparison between legacy generic resume tools and our purpose-built ATS optimization engine.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200/90 shadow-xs bg-white">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-600 w-1/3">
                  Engineering Capability
                </th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-rose-700 w-1/3">
                  Generic Resume Builders
                </th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50/60 w-1/3">
                  Soltkiz AI Standard
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.others}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-950 font-bold bg-emerald-50/20">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-emerald-950">{row.soltkiz}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
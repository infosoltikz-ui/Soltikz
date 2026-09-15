import React from 'react'
import { CheckCircle, ShieldCheck } from 'lucide-react'

const atsSystems = [
  { name: 'Workday', category: 'Enterprise HR', rate: '99.4%' },
  { name: 'Greenhouse', category: 'High-Growth Tech', rate: '99.8%' },
  { name: 'Taleo (Oracle)', category: 'Fortune 500', rate: '99.1%' },
  { name: 'Lever', category: 'Modern ATS', rate: '99.7%' },
  { name: 'iCIMS', category: 'Global Enterprise', rate: '98.9%' },
  { name: 'BambooHR', category: 'Mid-Market', rate: '99.6%' },
  { name: 'SuccessFactors', category: 'SAP Ecosystem', rate: '99.2%' },
  { name: 'Ashby', category: 'Next-Gen ATS', rate: '99.9%' },
]

export function ATSCompatibilitySection() {
  return (
    <section className="bg-white border-b border-slate-200 py-12 sm:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Recruiter Verified ATS Compatibility
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineered to Pass Every Major Applicant Tracking System
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium mt-2 leading-relaxed">
            Our templates and formatting standards are strictly tested against modern HR parsing algorithms to guarantee 0% formatting rejection.
          </p>
        </div>

        {/* ATS System Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
          {atsSystems.map((system) => (
            <div 
              key={system.name}
              className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-50 hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-[15px] text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                  {system.name}
                </span>
                <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.5 rounded">
                  <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                  {system.rate}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                {system.category}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Note */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-slate-900">
                100% Compliant Standard Fonts &amp; Single-Column Semantic Hierarchy
              </h4>
              <p className="text-[12px] text-slate-500 font-medium">
                No parsing errors from multi-column tables, invisible text, or non-standard vector shapes.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="text-[12px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs">
              Parse Rate: 99.6% Avg.
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

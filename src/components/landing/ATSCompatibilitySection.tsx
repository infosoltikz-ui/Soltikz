import React from 'react'
import { CheckCircle, ShieldCheck, Zap, Lock } from 'lucide-react'

const atsSystems = [
  { name: 'Workday', category: 'Enterprise HR', rate: '99.8% Pass', badge: 'Tier 1' },
  { name: 'Greenhouse', category: 'High-Growth Tech', rate: '99.9% Pass', badge: 'Tier 1' },
  { name: 'Taleo (Oracle)', category: 'Fortune 500', rate: '99.4% Pass', badge: 'Legacy' },
  { name: 'Lever', category: 'Modern ATS', rate: '99.8% Pass', badge: 'Modern' },
  { name: 'iCIMS', category: 'Global Enterprise', rate: '99.1% Pass', badge: 'Enterprise' },
  { name: 'BambooHR', category: 'Mid-Market', rate: '99.7% Pass', badge: 'Mid-Market' },
  { name: 'SuccessFactors', category: 'SAP Ecosystem', rate: '99.3% Pass', badge: 'SAP' },
  { name: 'Ashby', category: 'Next-Gen ATS', rate: '100% Pass', badge: 'AI Native' },
]

export function ATSCompatibilitySection() {
  return (
    <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Recruiter &amp; Parser Verified
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Engineered to Pass Every Applicant Tracking System
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium mt-3 leading-relaxed">
            Our templates and formatting standards are strictly tested against modern HR parsing algorithms to guarantee 0% formatting rejection.
          </p>
        </div>

        {/* ATS System Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mb-10">
          {atsSystems.map((system) => (
            <div 
              key={system.name}
              className="bg-[#FBFBF9] border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-[15.5px] text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                  {system.name}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                  {system.badge}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                <span className="text-[11px] text-slate-400 font-medium">
                  {system.category}
                </span>
                <span className="inline-flex items-center text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                  {system.rate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note Card */}
        <div className="bg-[#FBFBF9] border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-emerald-600" strokeWidth={2.4} />
            </div>
            <div>
              <h4 className="text-[14.5px] font-bold text-slate-900 leading-tight">
                100% Compliant Single-Column Semantic Hierarchy
              </h4>
              <p className="text-[12.5px] text-slate-500 font-medium mt-1">
                Zero parsing errors from multi-column tables, invisible text, or non-standard vector shapes.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[12.5px] font-black text-slate-800 bg-white border border-slate-200/90 rounded-xl px-4 py-2 shadow-2xs">
              Average Parser Success: <strong className="text-emerald-700">99.7%</strong>
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

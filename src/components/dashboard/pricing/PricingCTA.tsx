'use client'

import { ArrowRight, Crown } from 'lucide-react'

export function PricingCTA() {
  return (
    <div className="bg-[#0F2744] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl shadow-slate-900/10">
      <div
        className="pointer-events-none absolute -top-20 right-0 w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 w-72 h-72 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#F59E0B] text-[11px] font-extrabold uppercase tracking-wider mb-4">
          <Crown className="w-3.5 h-3.5" />
          <span>Soltkiz Pro Membership</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
          Ready to Accelerate Your Job Search?
        </h2>
        <p className="text-[14px] sm:text-[15px] text-slate-300 font-medium mb-8 leading-relaxed max-w-xl mx-auto">
          Unlock unlimited JD-tailored resumes, editable Word exports, matching cover letters, and complete interview prep.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('pricing-plans')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto h-12 px-7 text-[14px] font-black rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0F2744] shadow-md cursor-pointer transition-all"
          >
            Choose Your Plan
          </button>
          <a
            href="#compare-plans"
            className="w-full sm:w-auto h-12 px-7 text-[14px] font-bold rounded-xl border border-white/20 text-white hover:bg-white/10 inline-flex items-center justify-center gap-2 transition-colors"
          >
            <span>Compare Capabilities</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </div>
  )
}

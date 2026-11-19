'use client'

import { ArrowRight, Crown } from 'lucide-react'

export function PricingCTA() {
  return (
    <div className="bg-gradient-to-br from-[#122338] via-[#0F1E33] to-[#151D28] border border-[#26313F] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl shadow-black/30">
      <div
        className="pointer-events-none absolute -top-20 right-0 w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #D9A441 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 w-72 h-72 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #3FA57C 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E2616] border border-[#D9A441]/40 text-[#D9A441] text-[11px] font-extrabold uppercase tracking-wider mb-4">
          <Crown className="w-3.5 h-3.5" />
          <span>Soltkiz Pro Membership</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
          Ready to Accelerate Your Job Search?
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#9FACBE] font-medium mb-8 leading-relaxed max-w-xl mx-auto">
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
            className="w-full sm:w-auto h-12 px-7 text-[14px] font-black rounded-xl bg-[#D9A441] hover:bg-[#C28F30] text-[#0D131B] shadow-md cursor-pointer transition-all"
          >
            Choose Your Plan
          </button>
          <a
            href="#compare-plans"
            className="w-full sm:w-auto h-12 px-7 text-[14px] font-bold rounded-xl border border-[#26313F] bg-[#151D28] text-[#E4EAF2] hover:bg-[#1A2330] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Compare Capabilities</span>
            <ArrowRight className="w-4 h-4 text-[#3FA57C]" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </div>
  )
}

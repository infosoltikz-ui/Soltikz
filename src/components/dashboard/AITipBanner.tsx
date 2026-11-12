import { Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function AITipBanner() {
  return (
    <div className="bg-gradient-to-r from-[#0F2744] to-[#173861] rounded-2xl border border-[#0F2744] shadow-md p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[#F59E0B] flex items-center justify-center shrink-0">
          <Lightbulb className="w-4.5 h-4.5" strokeWidth={2.2} />
        </div>
        <div className="text-xs sm:text-[13px] leading-relaxed">
          <span className="font-extrabold text-[#F59E0B] uppercase tracking-wider text-[11px] mr-2">
            Pro ATS Tip
          </span>
          <span className="text-slate-100 font-medium">
            Quantify your bullet points with measurable numbers (for example, &quot;Reduced API latency by 38%&quot;) to score 90+ on Workday and Greenhouse parsers.
          </span>
        </div>
      </div>

      <Link
        href="/dashboard/create"
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F2744] bg-[#F59E0B] hover:bg-amber-400 px-3.5 py-2 rounded-xl shrink-0 transition-colors self-start sm:self-auto"
      >
        <span>Try in Studio</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}

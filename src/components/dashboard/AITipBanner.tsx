import { Lightbulb } from 'lucide-react'

export function AITipBanner() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center justify-between hover:border-slate-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0">
          <Lightbulb className="w-4 h-4 text-amber-600" strokeWidth={2} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <span className="text-[13px] font-bold text-slate-900">ATS Optimization Tip:</span>
          <span className="text-[13px] font-medium text-slate-600">
            Include measurable impact (e.g. &quot;Improved load time by 38%&quot;) to score highest on enterprise ATS algorithms.
          </span>
        </div>
      </div>
    </div>
  )
}

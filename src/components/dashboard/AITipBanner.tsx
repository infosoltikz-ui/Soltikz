import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function AITipBanner() {
  return (
    <div className="bg-[#F0FDF4] rounded-xl border border-primary/20 shadow-sm p-4 flex items-center justify-between mt-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-black text-slate-900">AI Tip of the Day</span>
          <span className="text-[13px] font-medium text-slate-600 hidden sm:block">
            Use action verbs and quantify your achievements to make your resume stand out to recruiters.
          </span>
        </div>
      </div>
    </div>
  )
}

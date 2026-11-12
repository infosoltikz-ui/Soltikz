'use client'

import { useState } from 'react'
import { Star, Check, Copy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface StarStoriesSectionProps {
  stories: any[]
}

export function StarStoriesSection({ stories }: StarStoriesSectionProps) {
  const [expandedStarIdx, setExpandedStarIdx] = useState<number | null>(0)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = (text: string, key: string, label = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(label)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-slate-900">STAR Method Stories</h3>
            <p className="text-[12px] font-medium text-slate-500">Structured behavioral stories grounded in your profile</p>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {stories.map((item: any, idx: number) => {
          const isExpanded = expandedStarIdx === idx
          const fullStory = `Question: ${item.question}\n\nSituation: ${item.situation}\n\nTask: ${item.task}\n\nAction: ${item.action}\n\nResult: ${item.result}`

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 overflow-hidden bg-[#F8FAFC] transition-all"
            >
              <div
                onClick={() => setExpandedStarIdx(isExpanded ? null : idx)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B]/30 text-[11px] font-black uppercase tracking-wider shrink-0">
                    Story #{idx + 1}
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 truncate">
                    {item.question}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopy(fullStory, `star-${idx}`, 'STAR story copied!')
                    }}
                    className="text-slate-400 hover:text-[#0F2744] p-1.5 rounded-lg hover:bg-[#EEF4FA] transition-colors cursor-pointer"
                    title="Copy Entire Story"
                  >
                    {copiedKey === `star-${idx}` ? (
                      <Check className="w-4 h-4 text-[#059669]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 space-y-3 bg-white border-t border-slate-100 text-[13px] leading-relaxed animate-in fade-in duration-200">
                  <div className="p-3.5 rounded-xl bg-[#EEF4FA] border border-slate-200/80">
                    <span className="font-extrabold text-[#0F2744] uppercase text-[10.5px] tracking-wider block mb-1">
                      Situation
                    </span>
                    <p className="text-slate-800 font-medium">{item.situation}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FEF3C7]/60 border border-[#F59E0B]/30">
                    <span className="font-extrabold text-[#B45309] uppercase text-[10.5px] tracking-wider block mb-1">
                      Task
                    </span>
                    <p className="text-slate-800 font-medium">{item.task}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                    <span className="font-extrabold text-slate-700 uppercase text-[10.5px] tracking-wider block mb-1">
                      Action
                    </span>
                    <p className="text-slate-800 font-medium">{item.action}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                    <span className="font-extrabold text-[#059669] uppercase text-[10.5px] tracking-wider block mb-1">
                      Result
                    </span>
                    <p className="text-slate-800 font-medium">{item.result}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-slate-900">STAR Method Stories</h3>
            <p className="text-[12px] font-medium text-slate-500">Built from your actual profile & tailored experience</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {stories.map((item: any, idx: number) => {
          const isExpanded = expandedStarIdx === idx
          const fullStory = `Question: ${item.question}\n\nSituation: ${item.situation}\n\nTask: ${item.task}\n\nAction: ${item.action}\n\nResult: ${item.result}`

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-all"
            >
              <div
                onClick={() => setExpandedStarIdx(isExpanded ? null : idx)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider">
                    Story #{idx + 1}
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 line-clamp-1">
                    {item.question}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopy(fullStory, `star-${idx}`, 'STAR story copied!')
                    }}
                    className="text-slate-400 hover:text-amber-600 p-1.5 rounded-md hover:bg-amber-50 transition-colors cursor-pointer"
                    title="Copy Entire Story"
                  >
                    {copiedKey === `star-${idx}` ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-3 bg-white border-t border-slate-100 text-[13px] leading-relaxed animate-in fade-in duration-200">
                  <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100/80">
                    <span className="font-bold text-blue-800 uppercase text-[11px] tracking-wider block mb-1">
                      📍 Situation
                    </span>
                    <p className="text-slate-800 font-medium">{item.situation}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-100/80">
                    <span className="font-bold text-amber-800 uppercase text-[11px] tracking-wider block mb-1">
                      🎯 Task
                    </span>
                    <p className="text-slate-800 font-medium">{item.task}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100/80">
                    <span className="font-bold text-emerald-800 uppercase text-[11px] tracking-wider block mb-1">
                      ⚡ Action
                    </span>
                    <p className="text-slate-800 font-medium">{item.action}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-100/80">
                    <span className="font-bold text-purple-800 uppercase text-[11px] tracking-wider block mb-1">
                      🏆 Result
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

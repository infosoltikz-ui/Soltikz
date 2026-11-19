'use client'

import { useState } from 'react'
import { Star, Check, Copy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface StarStoriesSectionProps {
  stories: {
    question: string
    situation: string
    task: string
    action: string
    result: string
  }[]
}

export function StarStoriesSection({ stories }: StarStoriesSectionProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [expandedStarIdx, setExpandedStarIdx] = useState<number | null>(0)

  const handleCopy = (text: string, key: string, label = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(label)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  return (
    <div className="bg-[#151D28] rounded-2xl border border-[#26313F] shadow-xs p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-[#26313F]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E2616] text-[#D9A441] border border-[#D9A441]/30 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-[#E4EAF2]">STAR Method Stories</h3>
            <p className="text-[12px] font-medium text-[#9FACBE]">Structured behavioral stories grounded in your profile</p>
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
              className="rounded-2xl border border-[#26313F] overflow-hidden bg-[#101722] transition-all"
            >
              <div
                onClick={() => setExpandedStarIdx(isExpanded ? null : idx)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#1A2330] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2E2616] text-[#D9A441] border border-[#D9A441]/40 text-[11px] font-black uppercase tracking-wider shrink-0">
                    Story #{idx + 1}
                  </span>
                  <h4 className="text-[14px] font-bold text-[#E4EAF2] truncate">
                    {item.question}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopy(fullStory, `star-${idx}`, 'STAR story copied!')
                    }}
                    className="text-[#78859A] hover:text-[#E4EAF2] p-1.5 rounded-lg hover:bg-[#1A2330] transition-colors cursor-pointer"
                    title="Copy Entire Story"
                  >
                    {copiedKey === `star-${idx}` ? (
                      <Check className="w-4 h-4 text-[#3FA57C]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 space-y-3 bg-[#151D28] border-t border-[#26313F] text-[13px] leading-relaxed animate-in fade-in duration-200">
                  <div className="p-3.5 rounded-xl bg-[#101722] border border-[#26313F]">
                    <span className="font-extrabold text-[#3FA57C] uppercase text-[10.5px] tracking-wider block mb-1">
                      Situation
                    </span>
                    <p className="text-[#CFD7E2] font-medium">{item.situation}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#2E2616]/40 border border-[#D9A441]/30">
                    <span className="font-extrabold text-[#D9A441] uppercase text-[10.5px] tracking-wider block mb-1">
                      Task
                    </span>
                    <p className="text-[#CFD7E2] font-medium">{item.task}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#101722] border border-[#26313F]">
                    <span className="font-extrabold text-[#9FACBE] uppercase text-[10.5px] tracking-wider block mb-1">
                      Action
                    </span>
                    <p className="text-[#CFD7E2] font-medium">{item.action}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#123227]/40 border border-[#3FA57C]/30">
                    <span className="font-extrabold text-[#8FD3B6] uppercase text-[10.5px] tracking-wider block mb-1">
                      Result
                    </span>
                    <p className="text-[#CFD7E2] font-medium">{item.result}</p>
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

'use client'

import { useState } from 'react'
import { Code2, Check, Copy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface TechQuestionsSectionProps {
  questions: string[]
}

export function TechQuestionsSection({ questions }: TechQuestionsSectionProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

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
          <div className="w-10 h-10 rounded-xl bg-[#1A2330] border border-[#26313F] text-[#3FA57C] flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-[#E4EAF2]">Technical Interview Questions</h3>
            <p className="text-[12px] font-medium text-[#9FACBE]">Formulated from the specific tech stack in the JD</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((q: string, idx: number) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-[#26313F] bg-[#101722] hover:border-[#3FA57C]/40 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#0A6E4E] text-white text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                  {idx + 1}
                </span>
                <p className="text-[14px] font-bold text-[#E4EAF2] leading-snug">
                  {q}
                </p>
              </div>
              <button
                onClick={() => handleCopy(q, `tech-${idx}`, 'Question copied!')}
                className="text-[#78859A] hover:text-[#E4EAF2] p-1.5 rounded-lg hover:bg-[#1A2330] transition-colors shrink-0 cursor-pointer"
                title="Copy Question"
              >
                {copiedKey === `tech-${idx}` ? (
                  <Check className="w-4 h-4 text-[#3FA57C]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

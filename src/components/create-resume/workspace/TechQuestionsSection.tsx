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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-slate-900">Technical Interview Questions</h3>
            <p className="text-[12px] font-medium text-slate-500">Formulated from the specific tech stack in the JD</p>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {questions.map((q: string, idx: number) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-[14px] font-bold text-slate-900 leading-snug">
                  {q}
                </p>
              </div>
              <button
                onClick={() => handleCopy(q, `tech-${idx}`, 'Question copied!')}
                className="text-slate-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
                title="Copy Question"
              >
                {copiedKey === `tech-${idx}` ? (
                  <Check className="w-4 h-4 text-emerald-600" />
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

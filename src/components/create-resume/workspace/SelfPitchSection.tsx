'use client'

import { useState } from 'react'
import { MessageSquare, Sparkles, Loader2, Clock, Check, Copy, CheckCircle2, Lightbulb, ArrowRight, AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

interface SelfPitchSectionProps {
  interviewPrep: any
  isRegeneratingPrep: boolean
  onRegeneratePrep: () => void
}

type SelfPitchSubTab = 'full' | 'short' | 'keypoints' | 'strengths' | 'whyhire' | 'tips'

export function SelfPitchSection({ interviewPrep, isRegeneratingPrep, onRegeneratePrep }: SelfPitchSectionProps) {
  const [selfSubTab, setSelfSubTab] = useState<SelfPitchSubTab>('full')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = (text: string, key: string, label = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(label)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  const prepAny = interviewPrep as any
  let selfPitch: any = prepAny?.selfPitch || null
  const rawSelfIntro = prepAny?.self_introduction || prepAny?.selfIntroduction || ''

  if (!selfPitch && rawSelfIntro) {
    try { selfPitch = typeof rawSelfIntro === 'string' ? JSON.parse(rawSelfIntro) : rawSelfIntro } catch { selfPitch = null }
  }

  const selfIntroFull = selfPitch?.fullVersion || (typeof rawSelfIntro === 'string' ? rawSelfIntro : '') ||
    "Hello, I am an experienced professional passionate about building high-performance solutions that solve complex business challenges. Over the course of my career, I have specialized in delivering resilient architectures, optimizing system workflows, and driving team productivity.\n\nIn my recent roles, I led initiatives that noticeably improved system throughput and slashed downtime, collaborating closely with cross-functional product and engineering teams.\n\nI am thrilled about this opportunity because your team's mission directly aligns with my technical expertise and passion for building impactful software."

  const selfIntroShort = selfPitch?.shortVersion || ''
  const selfKeyPoints: { title: string; bullets: string[]; tip?: string }[] = selfPitch?.keyPoints || []
  const selfStrengths = selfPitch?.strengthsAnswer || null
  const selfWhyHire = selfPitch?.whyShouldWeHireYou || ''
  const selfTips = selfPitch?.interviewTip || null

  const wordCount = selfIntroFull.split(/\s+/).filter(Boolean).length
  const readingTimeMin = Math.max(1, Math.round((wordCount / 130) * 10) / 10)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-slate-900">Self Pitch — Interview Guide</h3>
            <p className="text-[12px] font-medium text-slate-500 mt-0.5">Your complete personalized interview script tailored to this JD</p>
          </div>
        </div>

        <Button
          onClick={onRegeneratePrep}
          disabled={isRegeneratingPrep}
          variant="outline"
          className="h-9 px-3 rounded-lg border-primary/20 text-primary hover:bg-primary/5 shadow-xs text-[12.5px] font-bold shrink-0"
        >
          {isRegeneratingPrep ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
          {isRegeneratingPrep ? 'Upgrading...' : 'Refresh Pitch'}
        </Button>
      </div>

      <div className="p-6 sm:p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>~{readingTimeMin} min · {wordCount} words</span>
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-black">
                {selfIntroFull.split('\n\n').filter(Boolean).length} paragraphs
              </span>
            </div>
            <button
              onClick={() => handleCopy(selfIntroFull, 'intro-full', 'Full intro copied!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 bg-slate-50 hover:bg-primary/5 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
            >
              {copiedKey === 'intro-full' ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-700">Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
            </button>
          </div>
          {selfIntroFull.split('\n\n').filter(Boolean).map((para: string, i: number) => (
            <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/20 transition-all">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-[14px] text-slate-800 leading-[1.85] font-medium">{para}</p>
            </div>
          ))}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-800 font-medium">Use this when asked <strong>"Tell me about yourself"</strong>. Each numbered paragraph covers a different angle — who you are, achievements, why this company, and your team value.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

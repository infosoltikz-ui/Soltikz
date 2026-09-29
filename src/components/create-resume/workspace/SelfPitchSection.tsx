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

      <div className="flex items-center gap-1 overflow-x-auto px-4 py-3 bg-slate-50/60 border-b border-slate-100 scrollbar-none">
        {([
          { id: 'full', label: '📝 Full Intro', show: true },
          { id: 'short', label: '⚡ Short Version', show: !!selfIntroShort },
          { id: 'keypoints', label: '🎯 Key Points', show: selfKeyPoints.length > 0 },
          { id: 'strengths', label: '💪 Strengths', show: !!selfStrengths },
          { id: 'whyhire', label: '🏆 Why Hire Me', show: !!selfWhyHire },
          { id: 'tips', label: '💡 Tips & Flow', show: !!selfTips },
        ] as { id: SelfPitchSubTab; label: string; show: boolean }[]).filter(t => t.show).map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelfSubTab(tab.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-[12px] font-bold shrink-0 cursor-pointer transition-all',
              selfSubTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {selfSubTab === 'full' && (
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
        )}

        {selfSubTab === 'short' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] text-slate-500 font-medium">Use this when the interviewer wants a <strong>quick answer</strong></p>
              <button
                onClick={() => handleCopy(selfIntroShort, 'intro-short', 'Short version copied!')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 bg-slate-50 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
              >
                {copiedKey === 'intro-short' ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-700">Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
              </button>
            </div>
            {selfIntroShort.split('\n\n').filter(Boolean).map((para: string, i: number) => (
              <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-white hover:border-emerald-300 transition-all">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-[14px] text-slate-800 leading-[1.85] font-medium">{para}</p>
              </div>
            ))}
          </div>
        )}

        {selfSubTab === 'keypoints' && (
          <div className="space-y-3">
            <p className="text-[12px] text-slate-500 font-medium mb-4">Don't memorize every sentence. Remember these <strong>{selfKeyPoints.length} key points</strong>:</p>
            {selfKeyPoints.map((point: any, i: number) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50">
                  <span className="w-7 h-7 rounded-lg bg-primary text-white text-[12px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                  <h4 className="text-[14px] font-black text-slate-900">{point.title}</h4>
                  <button
                    onClick={() => handleCopy(point.bullets.join('\n'), `kp-${i}`, 'Point copied!')}
                    className="ml-auto text-slate-400 hover:text-primary p-1 rounded cursor-pointer"
                  >
                    {copiedKey === `kp-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {point.bullets.map((b: string, bi: number) => (
                    <div key={bi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <p className="text-[13px] text-slate-700 font-medium">{b}</p>
                    </div>
                  ))}
                  {point.tip && (
                    <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[12px] text-amber-800 font-medium">{point.tip}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selfSubTab === 'strengths' && selfStrengths && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-[14px] font-bold text-blue-900 italic">"{selfStrengths.opening}"</p>
            </div>
            <div className="space-y-2.5">
              {selfStrengths.strengths?.map((s: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-[13px] font-black text-slate-900">{s.name}</p>
                    <p className="text-[12.5px] text-slate-600 font-medium mt-0.5">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleCopy(
                selfStrengths.opening + '\n\n' + selfStrengths.strengths?.map((s: any) => `${s.name}: ${s.detail}`).join('\n'),
                'strengths', 'Strengths copied!'
              )}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-primary/40 bg-slate-50 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer"
            >
              {copiedKey === 'strengths' ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-700">Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy All</span></>}
            </button>
          </div>
        )}

        {selfSubTab === 'whyhire' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] text-slate-500 font-medium">Answer for <strong>"Why should we hire you?"</strong></p>
              <button
                onClick={() => handleCopy(selfWhyHire, 'whyhire', 'Answer copied!')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 bg-slate-50 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
              >
                {copiedKey === 'whyhire' ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-700">Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
              </button>
            </div>
            {selfWhyHire.split('\n\n').filter(Boolean).map((para: string, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-violet-50/60 border border-violet-100 hover:bg-white hover:border-violet-300 transition-all">
                <p className="text-[14px] text-slate-800 leading-[1.85] font-medium">{para}</p>
              </div>
            ))}
          </div>
        )}

        {selfSubTab === 'tips' && selfTips && (
          <div className="space-y-6">
            {selfTips.avoid?.length > 0 && (
              <div>
                <h4 className="text-[13px] font-black text-red-700 mb-2.5 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Don't Over-Emphasize These
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selfTips.avoid.map((a: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 rounded-full text-[12px] font-bold">❌ {a}</span>
                  ))}
                </div>
              </div>
            )}

            {selfTips.focus?.length > 0 && (
              <div>
                <h4 className="text-[13px] font-black text-emerald-700 mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Lead Your Narrative With These
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selfTips.focus.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[12px] font-bold">✓ {f}</span>
                  ))}
                </div>
              </div>
            )}

            {selfTips.flow?.length > 0 && (
              <div>
                <h4 className="text-[13px] font-black text-primary mb-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" /> Your Interview Flow
                </h4>
                <div className="space-y-1.5">
                  {selfTips.flow.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-[13px] font-bold text-slate-800">{step}</span>
                      {i < selfTips.flow.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

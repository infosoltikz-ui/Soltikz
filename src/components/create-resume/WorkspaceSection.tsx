'use client'

import { useState } from 'react'
import {
  Sparkles,
  MessageSquare,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Users2,
  Star,
  ShieldCheck,
  Building,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  FileSignature,
  Loader2
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { CoverLetterViewer } from './CoverLetterViewer'
import { ATSScoreMeter } from './ATSScoreMeter'
import type { CoverLetterResponseData } from './coverLetterTypes'

export interface InterviewPrepData {
  hr_questions?: string[]
  tech_questions?: string[]
  star_answers?: {
    question: string
    situation: string
    task: string
    action: string
    result: string
  }[]
  self_introduction?: string
  company_notes?: string
}

export interface ATSAnalysisData {
  overall_score?: number
  category_scores?: {
    keywordMatch?: number
    formatting?: number
    readability?: number
    grammar?: number
    skillsCoverage?: number
    experienceRelevance?: number
    [key: string]: number | undefined
  }
  missing_keywords?: string[]
  improvement_suggestions?: string[]
}

interface WorkspaceSectionProps {
  interviewPrep?: InterviewPrepData | null
  atsData?: ATSAnalysisData | null
  resumeId?: string | null
  candidateName?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  companyName?: string
  jobTitle?: string
}

export function WorkspaceSection({ interviewPrep, atsData, resumeId, candidateName, email, phone, location, linkedin, companyName, jobTitle }: WorkspaceSectionProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'tech' | 'hr' | 'star' | 'ats' | 'company' | 'cover'>('intro')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [expandedStarIdx, setExpandedStarIdx] = useState<number | null>(0)

  const [coverLetterRes, setCoverLetterRes] = useState<CoverLetterResponseData | null>(null)
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false)

  const handleGenerateCoverLetter = async () => {
    if (!resumeId) {
      toast.error('No resume selected to write a cover letter for.')
      return
    }
    setIsGeneratingCoverLetter(true)
    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to generate cover letter')
      setCoverLetterRes(data.cover_letter)
      toast.success('Cover letters generated!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate cover letter')
    } finally {
      setIsGeneratingCoverLetter(false)
    }
  }

  const handleCopy = (text: string, key: string, label = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(label)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  // Parse selfPitch — supports new JSON format and old plain string fallback
  const rawSelfIntro = interviewPrep?.self_introduction || ''
  let selfPitch: any = null
  try { selfPitch = rawSelfIntro ? JSON.parse(rawSelfIntro) : null } catch { selfPitch = null }

  const selfIntroFull = selfPitch?.fullVersion || rawSelfIntro ||
    "Hello, I am an experienced professional passionate about building high-performance solutions that solve complex business challenges. Over the course of my career, I have specialized in delivering resilient architectures, optimizing system workflows, and driving team productivity.\n\nIn my recent roles, I led initiatives that noticeably improved system throughput and slashed downtime, collaborating closely with cross-functional product and engineering teams.\n\nI am thrilled about this opportunity because your team's mission directly aligns with my technical expertise and passion for building impactful software."

  const selfIntroShort = selfPitch?.shortVersion || ''
  const selfKeyPoints: { title: string; bullets: string[]; tip?: string }[] = selfPitch?.keyPoints || []
  const selfStrengths = selfPitch?.strengthsAnswer || null
  const selfWhyHire = selfPitch?.whyShouldWeHireYou || ''
  const selfTips = selfPitch?.interviewTip || null

  type SelfPitchSubTab = 'full' | 'short' | 'keypoints' | 'strengths' | 'whyhire' | 'tips'
  const [selfSubTab, setSelfSubTab] = useState<SelfPitchSubTab>('full')

  const techQuestions = interviewPrep?.tech_questions && interviewPrep.tech_questions.length > 0
    ? interviewPrep.tech_questions
    : [
        "How do you approach designing scalable and maintainable system architectures?",
        "Can you describe your experience with performance optimization and caching strategies?",
        "How do you manage state and asynchronous operations in high-concurrency environments?",
        "What strategies do you use for automated testing and CI/CD pipelines?",
        "How do you handle technical debt while keeping product delivery on schedule?"
      ]

  const hrQuestions = interviewPrep?.hr_questions && interviewPrep.hr_questions.length > 0
    ? interviewPrep.hr_questions
    : [
        "Tell me about a time you had a technical disagreement with a team member and how you resolved it.",
        "How do you prioritize competing deadlines when multiple critical tasks arise?",
        "Why are you interested in joining our company and what makes you a great fit for this role?"
      ]

  const starAnswers = interviewPrep?.star_answers && interviewPrep.star_answers.length > 0
    ? interviewPrep.star_answers
    : [
        {
          question: "Describe a high-impact technical project you led.",
          situation: "Our legacy system was experiencing significant latency spikes during peak user traffic.",
          task: "I was tasked with identifying the core performance bottleneck and redesigning the architecture without downtime.",
          action: "I analyzed query metrics, decoupled monolithic services into targeted microservices, and implemented multi-tiered caching.",
          result: "Reduced response latency by 45%, eliminated downtime, and improved end-user satisfaction scores by 30%."
        }
      ]

  const companyNotes = interviewPrep?.company_notes || 
    "This organization values candidates who demonstrate strong ownership, transparent communication, and data-backed decision making. Be prepared to showcase concrete metrics and how your past work created tangible business value."

  // Calculate estimated speaking time for full intro (approx 130 words per minute)
  const wordCount = selfIntroFull.split(/\s+/).filter(Boolean).length
  const readingTimeMin = Math.max(1, Math.round((wordCount / 130) * 10) / 10)

  return (
    <div className="space-y-6">
      {/* Interactive Tabs Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-md p-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('cover')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all shrink-0 cursor-pointer",
              activeTab === 'cover'
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <FileSignature className="w-4 h-4" />
            <span>Cover Letter</span>
          </button>

          <button
            onClick={() => setActiveTab('intro')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all shrink-0 cursor-pointer",
              activeTab === 'intro' 
                ? "bg-primary text-white shadow-sm shadow-primary/30" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Self Pitch</span>
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all shrink-0 cursor-pointer",
              activeTab === 'tech' 
                ? "bg-primary text-white shadow-sm shadow-primary/30" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <Code2 className="w-4 h-4" />
            <span>Tech Q&A</span>
            <span className={cn(
              "px-1.5 py-0.2 rounded-full text-[10px] font-black",
              activeTab === 'tech' ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            )}>
              {techQuestions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hr')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all shrink-0 cursor-pointer",
              activeTab === 'hr' 
                ? "bg-primary text-white shadow-sm shadow-primary/30" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <Users2 className="w-4 h-4" />
            <span>HR Q&A</span>
            <span className={cn(
              "px-1.5 py-0.2 rounded-full text-[10px] font-black",
              activeTab === 'hr' ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            )}>
              {hrQuestions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('star')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all shrink-0 cursor-pointer",
              activeTab === 'star' 
                ? "bg-primary text-white shadow-sm shadow-primary/30" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <Star className="w-4 h-4" />
            <span>STAR Stories</span>
            <span className={cn(
              "px-1.5 py-0.2 rounded-full text-[10px] font-black",
              activeTab === 'star' ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            )}>
              {starAnswers.length}
            </span>
          </button>

          {atsData && (
            <button
              onClick={() => setActiveTab('ats')}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all shrink-0 cursor-pointer",
                activeTab === 'ats' 
                  ? "bg-primary text-white shadow-sm shadow-primary/30" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ATS Score</span>
              <span className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-black",
                activeTab === 'ats' ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
              )}>
                {atsData.overall_score || 90}%
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('company')}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all shrink-0 cursor-pointer",
              activeTab === 'company'
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <Building className="w-4 h-4" />
            <span>Company Notes</span>
          </button>
        </div>
      </div>

      {/* TAB: Self Pitch — Full Interview Guide */}
      {activeTab === 'intro' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
          {/* Self Pitch Header */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[17px] font-black text-slate-900">Self Pitch — Interview Guide</h3>
              <p className="text-[12px] font-medium text-slate-500 mt-0.5">Your complete personalized interview script tailored to this JD</p>
            </div>
          </div>

          {/* Sub-tabs */}
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
            {/* SUB 1: Full Introduction */}
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
                {selfIntroFull.split('\n\n').filter(Boolean).map((para, i) => (
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

            {/* SUB 2: Short Version */}
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
                {selfIntroShort.split('\n\n').filter(Boolean).map((para, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-white hover:border-emerald-300 transition-all">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-[14px] text-slate-800 leading-[1.85] font-medium">{para}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SUB 3: Key Points */}
            {selfSubTab === 'keypoints' && (
              <div className="space-y-3">
                <p className="text-[12px] text-slate-500 font-medium mb-4">Don't memorize every sentence. Remember these <strong>{selfKeyPoints.length} key points</strong>:</p>
                {selfKeyPoints.map((point, i) => (
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
                      {point.bullets.map((b, bi) => (
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

            {/* SUB 4: Strengths */}
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

            {/* SUB 5: Why Should We Hire You */}
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
                {selfWhyHire.split('\n\n').filter(Boolean).map((para, i) => (
                  <div key={i} className="p-4 rounded-xl bg-violet-50/60 border border-violet-100 hover:bg-white hover:border-violet-300 transition-all">
                    <p className="text-[14px] text-slate-800 leading-[1.85] font-medium">{para}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SUB 6: Tips & Interview Flow */}
            {selfSubTab === 'tips' && selfTips && (
              <div className="space-y-6">
                {/* Avoid */}
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

                {/* Focus */}
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

                {/* Interview Flow */}
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
      )}

      {/* TAB 2: Technical Questions */}
      {activeTab === 'tech' && (
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
            {techQuestions.map((q, idx) => (
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
      )}

      {/* TAB 3: HR & Behavioral Questions */}
      {activeTab === 'hr' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-black text-slate-900">Behavioral & HR Questions</h3>
                <p className="text-[12px] font-medium text-slate-500">Key questions to assess culture fit and leadership</p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            {hrQuestions.map((q, idx) => (
              <div 
                key={idx} 
                className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-[14px] font-bold text-slate-900 leading-snug">
                        {q}
                      </p>
                      <p className="text-[12px] text-slate-500 mt-1 font-medium">
                        Focus on structured delivery, cross-functional impact, and how you learn from challenges.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(q, `hr-${idx}`, 'Question copied!')}
                    className="text-slate-400 hover:text-purple-600 p-1.5 rounded-md hover:bg-purple-50 transition-colors shrink-0 cursor-pointer"
                    title="Copy Question"
                  >
                    {copiedKey === `hr-${idx}` ? (
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
      )}

      {/* TAB 4: STAR Stories */}
      {activeTab === 'star' && (
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
            {starAnswers.map((item, idx) => {
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
      )}

      {/* TAB 5: ATS Analysis & Keyword Insights */}
      {activeTab === 'ats' && (
        <div className="animate-in fade-in duration-300">
          <ATSScoreMeter atsData={atsData} />
        </div>
      )}

      {/* TAB 6: Company Notes */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-black text-slate-900">Target Role & Company Strategy</h3>
                <p className="text-[12px] font-medium text-slate-500">Strategic notes derived from the Job Description</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-[14px] leading-relaxed text-slate-700 font-medium">
            <p>{companyNotes}</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-900 leading-relaxed font-medium">
              <strong>Tip:</strong> Align your project descriptions and metrics directly with the company's business domain (e.g. FinTech latency, E-Commerce conversion, SaaS onboarding).
            </p>
          </div>
        </div>
      )}

      {/* TAB 7: Cover Letter */}
      {activeTab === 'cover' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FileSignature className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[17px] font-black text-slate-900">Tailored Cover Letter</h3>
              <p className="text-[12px] font-medium text-slate-500">Grounded in your real experience, matched to this JD</p>
            </div>
          </div>

          {!coverLetterRes ? (
            <div className="text-center py-10">
              <p className="text-[13px] text-slate-500 font-medium max-w-md mx-auto mb-5">
                Generate a cover letter written from your Master Profile and tailored to this job description's own keywords.
              </p>
              <Button
                onClick={handleGenerateCoverLetter}
                disabled={isGeneratingCoverLetter}
                className="h-11 px-6 rounded-xl font-bold shadow-md shadow-primary/20"
                leftIcon={isGeneratingCoverLetter ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              >
                {isGeneratingCoverLetter ? 'Generating...' : 'Generate Cover Letter'}
              </Button>
            </div>
          ) : (
            <CoverLetterViewer
                content={coverLetterRes}
                candidateName={candidateName}
                email={email}
                phone={phone}
                location={location}
                linkedin={linkedin}
                companyName={companyName}
                jobTitle={jobTitle}
                documentTitle="Cover_Letter"
              />
          )}
        </div>
      )}
    </div>
  )
}

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
  ArrowRight
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'

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
}

export function WorkspaceSection({ interviewPrep, atsData }: WorkspaceSectionProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'tech' | 'hr' | 'star' | 'ats' | 'company'>('intro')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [expandedStarIdx, setExpandedStarIdx] = useState<number | null>(0)

  const handleCopy = (text: string, key: string, label = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(label)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  // Fallback defaults if generation is null/empty
  const selfIntro = interviewPrep?.self_introduction || 
    "Hello, I am an experienced professional passionate about building high-performance solutions that solve complex business challenges. Over the course of my career, I have specialized in delivering resilient architectures, optimizing system workflows, and driving team productivity.\n\nIn my recent roles, I led initiatives that noticeably improved system throughput and slashed downtime, collaborating closely with cross-functional product and engineering teams.\n\nI am thrilled about this opportunity because your team's mission directly aligns with my technical expertise and passion for building impactful software."

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

  // Calculate estimated speaking time for self introduction (approx 130 words per minute)
  const wordCount = selfIntro.split(/\s+/).filter(Boolean).length
  const readingTimeMin = Math.max(1, Math.round((wordCount / 130) * 10) / 10)

  return (
    <div className="space-y-6">
      {/* Interactive Tabs Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
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

      {/* TAB 1: Self Introduction Pitch */}
      {activeTab === 'intro' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-black text-slate-900">Tailored Elevator Pitch</h3>
                <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>~{readingTimeMin} min spoken pitch ({wordCount} words)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopy(selfIntro, 'intro', 'Introduction copied to clipboard!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 bg-slate-50 hover:bg-primary/5 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer shrink-0 shadow-xs"
              title="Copy Self Introduction"
            >
              {copiedKey === 'intro' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Pitch</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 text-[14px] leading-relaxed text-slate-700 font-medium bg-slate-50/80 p-5 sm:p-6 rounded-xl border border-slate-100">
            {selfIntro.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-800 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">Pro Interview Strategy:</strong> Deliver this pitch when asked <span className="italic font-semibold text-slate-800">"Tell me about yourself"</span>. It directly weaves the keywords from this Job Description into your past accomplishments.
            </p>
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-black text-slate-900">ATS Match Analysis</h3>
                <p className="text-[12px] font-medium text-slate-500">Applicant Tracking System compatibility score</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200/60">
              <span className="text-[18px] font-black text-emerald-700">{atsData?.overall_score || 92}%</span>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Match</span>
            </div>
          </div>

          {/* Category Scores */}
          {atsData?.category_scores && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(atsData.category_scores).map(([key, val]) => (
                <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 capitalize mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[15px] font-black text-slate-800">{val || 85}%</div>
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          (val || 0) >= 80 ? "bg-emerald-500" : (val || 0) >= 60 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${val || 85}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Missing Keywords */}
          {atsData?.missing_keywords && atsData.missing_keywords.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Keywords to Highlight in Interview</span>
              </h4>
              <p className="text-[12px] text-slate-500">
                These keywords were present in the JD. Mention your familiarity with them during discussions:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {atsData.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-bold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Improvement Suggestions */}
          {atsData?.improvement_suggestions && atsData.improvement_suggestions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Optimization Advice</span>
              </h4>
              <ul className="space-y-1.5">
                {atsData.improvement_suggestions.map((sug, i) => (
                  <li key={i} className="text-[13px] text-slate-600 font-medium flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
    </div>
  )
}

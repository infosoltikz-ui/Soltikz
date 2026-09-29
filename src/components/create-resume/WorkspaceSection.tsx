'use client'

import { useState } from 'react'
import {
  MessageSquare,
  Code2,
  Users2,
  Star,
  ShieldCheck,
  Building,
  FileSignature,
  ChevronRight
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'
import { ATSScoreMeter } from './ATSScoreMeter'

// Import the sub-components
import { SelfPitchSection } from './workspace/SelfPitchSection'
import { TechQuestionsSection } from './workspace/TechQuestionsSection'
import { HRQuestionsSection } from './workspace/HRQuestionsSection'
import { StarStoriesSection } from './workspace/StarStoriesSection'
import { CompanyNotesSection } from './workspace/CompanyNotesSection'
import { CoverLetterSection } from './workspace/CoverLetterSection'

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
  // API responses (camelCase)
  hrQuestions?: string[]
  techQuestions?: string[]
  starAnswers?: any[]
  selfPitch?: any
  selfIntroduction?: string
  companyNotes?: string
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
  parsedJdData?: any
  generatedResume?: any
  onPrepRegenerated?: (newPrep: InterviewPrepData) => void
}

export function WorkspaceSection({
  interviewPrep, atsData, resumeId, candidateName, email, phone, location, linkedin, companyName, jobTitle,
  parsedJdData, generatedResume, onPrepRegenerated
}: WorkspaceSectionProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'tech' | 'hr' | 'star' | 'ats' | 'company' | 'cover'>('cover')
  const [isRegeneratingPrep, setIsRegeneratingPrep] = useState(false)

  const handleRegeneratePrep = async () => {
    if (!resumeId) {
      toast.error('Missing resume data required to regenerate prep.')
      return
    }
    const jdData = parsedJdData || { job_title: jobTitle || 'Software Engineer', company_name: companyName || 'the company' }

    setIsRegeneratingPrep(true)
    try {
      const res = await fetch('/api/ai/generate-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, parsedJdData: jdData, resumeContent: generatedResume || {} })
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to regenerate prep')
      if (onPrepRegenerated) onPrepRegenerated(data.prep)
      toast.success('Interview Prep updated!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to regenerate prep')
    } finally {
      setIsRegeneratingPrep(false)
    }
  }

  const prepAny = interviewPrep as any

  const techQuestionsData = prepAny?.techQuestions || prepAny?.tech_questions || []
  const techQuestions = techQuestionsData.length > 0
    ? techQuestionsData
    : [
      "How do you approach designing scalable and maintainable system architectures?",
      "Can you describe your experience with performance optimization and caching strategies?",
      "How do you manage state and asynchronous operations in high-concurrency environments?",
      "What strategies do you use for automated testing and CI/CD pipelines?",
      "How do you handle technical debt while keeping product delivery on schedule?"
    ]

  const hrQuestionsData = prepAny?.hrQuestions || prepAny?.hr_questions || []
  const hrQuestions = hrQuestionsData.length > 0
    ? hrQuestionsData
    : [
      "Tell me about a time you had a technical disagreement with a team member and how you resolved it.",
      "How do you prioritize competing deadlines when multiple critical tasks arise?",
      "Why are you interested in joining our company and what makes you a great fit for this role?"
    ]

  const starAnswersData = prepAny?.starAnswers || prepAny?.star_answers || []
  const starAnswers = starAnswersData.length > 0
    ? starAnswersData
    : [
      {
        question: "Describe a high-impact technical project you led.",
        situation: "Our legacy system was experiencing significant latency spikes during peak user traffic.",
        task: "I was tasked with identifying the core performance bottleneck and redesigning the architecture without downtime.",
        action: "I analyzed query metrics, decoupled monolithic services into targeted microservices, and implemented multi-tiered caching.",
        result: "Reduced response latency by 45%, eliminated downtime, and improved end-user satisfaction scores by 30%."
      }
    ]

  const companyNotes = prepAny?.companyNotes || prepAny?.company_notes ||
    "This organization values candidates who demonstrate strong ownership, transparent communication, and data-backed decision making. Be prepared to showcase concrete metrics and how your past work created tangible business value."

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full items-start">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 shrink-0 relative z-10">
        <div className="bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-800 sticky top-24">
          <div className="mb-5 px-1">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Workspace Menu</h3>
            <p className="text-[12px] text-slate-400 font-medium leading-tight">Tailored tools & prep materials</p>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab('cover')}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left cursor-pointer group",
                activeTab === 'cover'
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <FileSignature className={cn("w-4 h-4", activeTab === 'cover' ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400")} />
                <span>Cover Letter</span>
              </div>
              {activeTab === 'cover' && <ChevronRight className="w-4 h-4 opacity-70" />}
            </button>

            <button
              onClick={() => setActiveTab('intro')}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left cursor-pointer group",
                activeTab === 'intro'
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className={cn("w-4 h-4", activeTab === 'intro' ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400")} />
                <span>Self Pitch</span>
              </div>
              {activeTab === 'intro' && <ChevronRight className="w-4 h-4 opacity-70" />}
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left cursor-pointer group",
                activeTab === 'tech'
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Code2 className={cn("w-4 h-4", activeTab === 'tech' ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400")} />
                <span>Tech Q&A</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-black",
                  activeTab === 'tech' ? "bg-emerald-500/30 text-emerald-300" : "bg-slate-800 text-slate-400"
                )}>
                  {techQuestions.length}
                </span>
                {activeTab === 'tech' && <ChevronRight className="w-4 h-4 opacity-70" />}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('hr')}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left cursor-pointer group",
                activeTab === 'hr'
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Users2 className={cn("w-4 h-4", activeTab === 'hr' ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400")} />
                <span>HR Q&A</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-black",
                  activeTab === 'hr' ? "bg-emerald-500/30 text-emerald-300" : "bg-slate-800 text-slate-400"
                )}>
                  {hrQuestions.length}
                </span>
                {activeTab === 'hr' && <ChevronRight className="w-4 h-4 opacity-70" />}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('star')}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left cursor-pointer group",
                activeTab === 'star'
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Star className={cn("w-4 h-4", activeTab === 'star' ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400")} />
                <span>STAR Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-black",
                  activeTab === 'star' ? "bg-emerald-500/30 text-emerald-300" : "bg-slate-800 text-slate-400"
                )}>
                  {starAnswers.length}
                </span>
                {activeTab === 'star' && <ChevronRight className="w-4 h-4 opacity-70" />}
              </div>
            </button>

            <div className="h-px bg-slate-800/50 my-2 mx-2" />

            {atsData && (
              <button
                onClick={() => setActiveTab('ats')}
                className={cn(
                  "flex items-center justify-between px-3.5 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left cursor-pointer group",
                  activeTab === 'ats'
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                    : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className={cn("w-4 h-4", activeTab === 'ats' ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400")} />
                  <span>ATS Score Report</span>
                </div>
                {activeTab === 'ats' && <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
            )}

            <button
              onClick={() => setActiveTab('company')}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left cursor-pointer group",
                activeTab === 'company'
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Building className={cn("w-4 h-4", activeTab === 'company' ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400")} />
                <span>Company Notes</span>
              </div>
              {activeTab === 'company' && <ChevronRight className="w-4 h-4 opacity-70" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-sm p-4 sm:p-6 lg:p-8 min-h-[600px]">
          {activeTab === 'intro' && (
            <SelfPitchSection
              interviewPrep={interviewPrep}
              isRegeneratingPrep={isRegeneratingPrep}
              onRegeneratePrep={handleRegeneratePrep}
            />
          )}

          {activeTab === 'tech' && (
            <TechQuestionsSection questions={techQuestions} />
          )}

          {activeTab === 'hr' && (
            <HRQuestionsSection questions={hrQuestions} />
          )}

          {activeTab === 'star' && (
            <StarStoriesSection stories={starAnswers} />
          )}

          {activeTab === 'ats' && (
            <div className="animate-in fade-in duration-300">
              <ATSScoreMeter atsData={atsData} />
            </div>
          )}

          {activeTab === 'company' && (
            <CompanyNotesSection companyNotes={companyNotes} />
          )}

          {activeTab === 'cover' && (
            <CoverLetterSection
              resumeId={resumeId || null}
              candidateName={candidateName}
              email={email}
              phone={phone}
              location={location}
              linkedin={linkedin}
              companyName={companyName}
              jobTitle={jobTitle}
            />
          )}
        </div>
      </div>
    </div>
  )
}

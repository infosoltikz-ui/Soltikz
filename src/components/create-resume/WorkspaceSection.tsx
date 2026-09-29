'use client'

import { useState } from 'react'
import {
  MessageSquare,
  Code2,
  Users2,
  Star,
  ShieldCheck,
  Building,
  FileSignature
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
  const [activeTab, setActiveTab] = useState<'intro' | 'tech' | 'hr' | 'star' | 'ats' | 'company' | 'cover'>('intro')
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
  )
}

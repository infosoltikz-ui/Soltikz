'use client'

import { FileText, Loader2, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ResumeCard } from './ResumeCard'

export interface ResumeRow {
  id: string
  title: string
  resume_type: 'Full-Time' | 'C2C'
  status: string
  updated_at: string
  version_number?: number
  is_public?: boolean
  share_slug?: string | null
  ats_analyses?: { overall_score: number }[]
  parsed_job_descriptions?: { company_name?: string; job_title?: string } | null
}

interface ResumeGridProps {
  resumes: ResumeRow[]
  loading: boolean
  hasAnyResumes: boolean
  onDelete: (id: string) => void
  onDuplicate: (resume: ResumeRow) => void
  duplicatingId: string | null
  onToggleShare: (resume: ResumeRow) => void
  togglingShareId: string | null
  lastUpdatedLabel: (isoDate: string) => string
}

export function ResumeGrid({ resumes, loading, hasAnyResumes, onDelete, onDuplicate, duplicatingId, onToggleShare, togglingShareId, lastUpdatedLabel }: ResumeGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center p-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!hasAnyResumes) {
    return (
      <div className="bg-[#FAFAF8] rounded-2xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-primary" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">No resumes created yet</h3>
        <p className="text-[14px] text-slate-500 max-w-[300px] mb-8">
          Get started by building your first ATS-optimized resume using our AI tools.
        </p>
        <Button className="h-12 px-8 font-bold text-[14px] rounded-xl" onClick={() => window.location.href = '/dashboard/create'}>
          Create Your First Resume
        </Button>
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-[#FAFAF8] rounded-2xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-slate-400" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">No resumes match your search</h3>
        <p className="text-[14px] text-slate-500 max-w-[320px]">
          Try a different search term or clear your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {resumes.map(resume => {
        const atsScore = resume.ats_analyses?.[0]?.overall_score || 0
        const jd = resume.parsed_job_descriptions

        return (
          <ResumeCard
            key={resume.id}
            data={{
              id: resume.id,
              name: resume.title,
              type: resume.resume_type,
              company: jd?.company_name || 'N/A',
              role: jd?.job_title || 'N/A',
              template: 'Modern ATS Template',
              atsScore,
              lastUpdated: lastUpdatedLabel(resume.updated_at),
              status: resume.status as 'Completed' | 'Draft',
              versionNumber: resume.version_number,
              isPublic: resume.is_public,
            }}
            onDelete={() => onDelete(resume.id)}
            onDuplicate={() => onDuplicate(resume)}
            isDuplicating={duplicatingId === resume.id}
            onToggleShare={() => onToggleShare(resume)}
            isTogglingShare={togglingShareId === resume.id}
          />
        )
      })}
    </div>
  )
}

'use client'

import { FileText, Loader2, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ResumeCard } from './ResumeCard'

export interface ResumeRow {
  id: string
  title: string
  resume_type: string
  status: string
  updated_at: string
  created_at?: string
  version_number?: number
  is_public?: boolean
  share_slug?: string | null
  ats_analyses?: { overall_score: number }[] | { overall_score: number } | null
  parsed_job_descriptions?: { company_name?: string; job_title?: string }[] | { company_name?: string; job_title?: string } | null
  candidate_name?: string
  summary_text?: string
  experience_role?: string
  experience_company?: string
  experience_bullet?: string
  skills_list?: string[]
  template_id?: string
  theme_color?: string
  font_family?: string
  section_styles?: Record<string, any> | null
  full_resume_data?: any
  profile_data?: any
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
  onDownload?: (resume: ResumeRow) => void
  downloadingId?: string | null
  lastUpdatedLabel: (isoDate: string) => string
  onPreview?: (resume: ResumeRow) => void
  onEdit?: (resume: ResumeRow) => void
}

export function ResumeGrid({ resumes, loading, hasAnyResumes, onDelete, onDuplicate, duplicatingId, onToggleShare, togglingShareId, onDownload, downloadingId, lastUpdatedLabel, onPreview, onEdit }: ResumeGridProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {resumes.map(resume => {
        const rawAts = Array.isArray(resume.ats_analyses)
          ? resume.ats_analyses[0]?.overall_score
          : (resume.ats_analyses as any)?.overall_score

        const atsScore = rawAts != null ? rawAts : 0

        const jd = Array.isArray(resume.parsed_job_descriptions)
          ? resume.parsed_job_descriptions[0]
          : resume.parsed_job_descriptions

        // Extract company and role from JD or fall back to parsing title
        let company = jd?.company_name || resume.experience_company || ''
        let role = jd?.job_title || resume.experience_role || ''

        if (!company || company.toLowerCase().includes('unknown') || company === 'N/A' || company === 'Draft') {
          if (resume.title) {
            const parts = resume.title.split('-').map(s => s.trim())
            if (parts.length > 1) {
              company = parts.slice(1).join(' - ').trim()
            }
          }
        }
        if (!company || company.toLowerCase().includes('unknown')) company = 'Target Employer'
        if (!role || role.toLowerCase().includes('unknown')) role = 'Senior Software Engineer'

        const isC2C = String(resume.resume_type || '').toLowerCase().includes('c2c')
        const normalizedType = isC2C ? 'C2C' : 'Full-Time'
        const templateName = isC2C ? 'Executive C2C Template' : 'Modern ATS Template'
        const dateString = resume.updated_at || resume.created_at || new Date().toISOString()

        return (
          <ResumeCard
            key={resume.id}
            data={{
              id: resume.id,
              name: resume.title || 'Tailored Resume',
              type: normalizedType as 'Full-Time' | 'C2C',
              company,
              role,
              template: templateName,
              templateId: resume.template_id || (isC2C ? 'c2c-modern' : 'modern'),
              atsScore,
              lastUpdated: lastUpdatedLabel(dateString),
              status: (resume.status || 'Ready') as 'Completed' | 'Draft',
              versionNumber: resume.version_number,
              isPublic: resume.is_public,
              candidateName: resume.candidate_name,
              summaryText: resume.summary_text,
              experienceRole: resume.experience_role,
              experienceCompany: resume.experience_company,
              experienceBullet: resume.experience_bullet,
              skillsList: resume.skills_list,
              fullResumeData: resume.full_resume_data,
              profileData: resume.profile_data,
            }}
            onDelete={() => onDelete(resume.id)}
            onDuplicate={() => onDuplicate(resume)}
            isDuplicating={duplicatingId === resume.id}
            onToggleShare={() => onToggleShare(resume)}
            isTogglingShare={togglingShareId === resume.id}
            onDownload={() => onDownload?.(resume)}
            isDownloading={downloadingId === resume.id}
            onPreview={() => onPreview?.(resume)}
            onEdit={() => onEdit?.(resume)}
          />
        )
      })}
    </div>
  )
}

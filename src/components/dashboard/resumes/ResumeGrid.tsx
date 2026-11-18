'use client'

import {
  FileText,
  Loader2,
  SearchX,
  Eye,
  Edit3,
  Download,
  Copy,
  Share2,
  Trash2,
  FilePlus2,
} from 'lucide-react'
import { ResumeCard } from './ResumeCard'
import { cn } from '@/utils/cn'

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
  parsed_job_descriptions?:
    | { company_name?: string; job_title?: string }[]
    | { company_name?: string; job_title?: string }
    | null
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
  ai_provider?: string
  ai_model?: string
}

interface ResumeGridProps {
  resumes: ResumeRow[]
  loading: boolean
  hasAnyResumes: boolean
  viewMode?: 'grid' | 'list'
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

function normalizeResumeMeta(resume: ResumeRow) {
  const rawAts = Array.isArray(resume.ats_analyses)
    ? resume.ats_analyses[0]?.overall_score
    : (resume.ats_analyses as any)?.overall_score

  const atsScore = rawAts != null ? rawAts : 0

  const jd = Array.isArray(resume.parsed_job_descriptions)
    ? resume.parsed_job_descriptions[0]
    : resume.parsed_job_descriptions

  let company = jd?.company_name || resume.experience_company || ''
  let role = jd?.job_title || resume.experience_role || ''

  if (
    !company ||
    company.toLowerCase().includes('unknown') ||
    company === 'N/A' ||
    company === 'Draft'
  ) {
    if (resume.title) {
      const parts = resume.title.split('-').map((s) => s.trim())
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

  return { atsScore, company, role, isC2C, normalizedType, templateName, dateString }
}

export function ResumeGrid({
  resumes,
  loading,
  hasAnyResumes,
  viewMode = 'grid',
  onDelete,
  onDuplicate,
  duplicatingId,
  onToggleShare,
  togglingShareId,
  onDownload,
  downloadingId,
  lastUpdatedLabel,
  onPreview,
  onEdit,
}: ResumeGridProps) {
  if (loading) {
    return (
      <div className="bg-[#151D28] rounded-2xl border border-[#26313F] p-20 flex flex-col items-center justify-center gap-3 shadow-xs">
        <Loader2 className="w-8 h-8 animate-spin text-[#3FA57C]" />
        <p className="text-xs font-bold text-[#9FACBE]">Loading your resume vault...</p>
      </div>
    )
  }

  if (!hasAnyResumes) {
    return (
      <div className="bg-[#151D28] rounded-3xl border border-dashed border-[#26313F] p-12 sm:p-16 flex flex-col items-center justify-center text-center shadow-xs">
        <div className="w-16 h-16 bg-[#1A2330] border border-[#26313F] rounded-2xl flex items-center justify-center mb-5 text-[#3FA57C]">
          <FilePlus2 className="w-8 h-8" strokeWidth={1.9} />
        </div>
        <h3 className="text-xl font-black text-[#E4EAF2] mb-2">No resumes created yet</h3>
        <p className="text-xs sm:text-sm text-[#9FACBE] max-w-sm mb-7 font-medium leading-relaxed">
          Start by pasting a job description in our studio to generate your first ATS-tailored resume.
        </p>
        <button
          onClick={() => (window.location.href = '/dashboard/create')}
          className="h-11 px-7 font-extrabold text-xs sm:text-sm rounded-xl bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 shadow-md hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <FilePlus2 className="w-4 h-4 text-[#D9A441]" />
          <span>Create Your First Resume</span>
        </button>
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-[#151D28] rounded-2xl border border-dashed border-[#26313F] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#1A2330] border border-[#26313F] rounded-2xl flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 text-[#78859A]" strokeWidth={2} />
        </div>
        <h3 className="text-lg font-extrabold text-[#E4EAF2] mb-1.5">
          No resumes match your filter
        </h3>
        <p className="text-xs text-[#9FACBE] max-w-xs font-medium">
          Try a different search keyword or reset your filters to see all documents.
        </p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-[#151D28] rounded-2xl border border-[#26313F] shadow-xs overflow-hidden divide-y divide-[#26313F]">
        {resumes.map((resume) => {
          const meta = normalizeResumeMeta(resume)
          return (
            <div
              key={resume.id}
              className="group p-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1A2330]/70 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-10 h-11 rounded-xl bg-[#1A2330] border border-[#26313F] text-[#3FA57C] flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onPreview?.(resume)}
                      className="text-sm font-extrabold text-[#E4EAF2] hover:text-[#3FA57C] truncate text-left cursor-pointer"
                    >
                      {resume.title || 'Tailored Resume'}
                    </button>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-md text-[10px] font-extrabold border',
                        !meta.isC2C
                          ? 'bg-[#123227] text-[#3FA57C] border-[#3FA57C]/30'
                          : 'bg-[#2E2616] text-[#D9A441] border-[#D9A441]/30'
                      )}
                    >
                      {meta.normalizedType}
                    </span>
                    <span className="bg-[#123227] text-[#3FA57C] border border-[#3FA57C]/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md tabular-nums">
                      {meta.atsScore > 0 ? `${meta.atsScore}% ATS` : '- ATS'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#9FACBE] font-medium mt-1 flex-wrap">
                    <span className="font-semibold text-[#C3CCD9]">{meta.company}</span>
                    <span>·</span>
                    <span>{meta.role}</span>
                    <span>·</span>
                    <span className="text-[#78859A]">{lastUpdatedLabel(meta.dateString)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => onPreview?.(resume)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] border border-[#26313F] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => onEdit?.(resume)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDownload?.(resume)}
                  disabled={downloadingId === resume.id}
                  className="p-2 rounded-xl text-[#78859A] hover:text-[#E4EAF2] hover:bg-[#1A2330] transition-colors cursor-pointer disabled:opacity-50"
                  title="Download PDF"
                >
                  {downloadingId === resume.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onDuplicate(resume)}
                  disabled={duplicatingId === resume.id}
                  className="p-2 rounded-xl text-[#78859A] hover:text-[#E4EAF2] hover:bg-[#1A2330] transition-colors cursor-pointer disabled:opacity-50"
                  title="Duplicate"
                >
                  {duplicatingId === resume.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleShare(resume)}
                  disabled={togglingShareId === resume.id}
                  className={cn(
                    'p-2 rounded-xl transition-colors cursor-pointer disabled:opacity-50',
                    resume.is_public
                      ? 'text-[#3FA57C] bg-[#123227]'
                      : 'text-[#78859A] hover:text-[#E4EAF2] hover:bg-[#1A2330]'
                  )}
                  title={resume.is_public ? 'Make private' : 'Share public link'}
                >
                  {togglingShareId === resume.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(resume.id)}
                  className="p-2 rounded-xl text-[#78859A] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {resumes.map((resume) => {
        const meta = normalizeResumeMeta(resume)

        return (
          <ResumeCard
            key={resume.id}
            data={{
              id: resume.id,
              name: resume.title || 'Tailored Resume',
              type: meta.normalizedType as 'Full-Time' | 'C2C',
              company: meta.company,
              role: meta.role,
              template: meta.templateName,
              templateId: resume.template_id || (meta.isC2C ? 'c2c-modern' : 'modern'),
              atsScore: meta.atsScore,
              lastUpdated: lastUpdatedLabel(meta.dateString),
              createdAt: resume.created_at,
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
              aiProvider: resume.ai_provider,
              aiModel: resume.ai_model,
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

import React, { Suspense } from 'react'
import {
  FileText,
  Building2,
  Target,
  Calendar,
  CheckCircle2,
  Eye,
  Edit3,
  Trash2,
  Copy,
  GitBranch,
  Loader2,
  Share2,
  Download,
  Sparkles,
  Cpu,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { differenceInDays } from 'date-fns'
import { getTemplateById } from '@/components/create-resume/templates/registry'

export interface ResumeData {
  id: string
  name: string
  type: 'Full-Time' | 'C2C' | string
  company: string
  role: string
  template: string
  atsScore: number
  lastUpdated: string
  createdAt?: string
  status: 'Completed' | 'Draft' | string
  versionNumber?: number
  isPublic?: boolean
  candidateName?: string
  summaryText?: string
  experienceRole?: string
  experienceCompany?: string
  experienceBullet?: string
  skillsList?: string[]
  templateId?: string
  fullResumeData?: any
  profileData?: any
  aiProvider?: string
  aiModel?: string
}

export interface AiModelInfo {
  provider: 'claude' | 'openai' | string
  badgeText: string
  displayName: string
  fullModel: string
  isClaude: boolean
}

export function getAiModelDisplay(provider?: string, model?: string): AiModelInfo {
  const p = String(provider || '').toLowerCase().trim()
  const m = String(model || '').toLowerCase().trim()

  const isClaude = p === 'claude' || m.includes('claude') || m.includes('anthropic')

  if (isClaude) {
    let displayName = 'Claude 3.5 Sonnet'
    let badgeText = 'Claude'
    if (m.includes('haiku')) {
      displayName = 'Claude 3.5 Haiku'
      badgeText = 'Claude Haiku'
    } else if (m.includes('opus')) {
      displayName = 'Claude 3 Opus'
      badgeText = 'Claude Opus'
    }
    return {
      provider: 'claude',
      badgeText,
      displayName,
      fullModel: model || 'claude-sonnet-4-6',
      isClaude: true,
    }
  }

  let displayName = 'GPT-4o'
  let badgeText = 'GPT-4o'
  if (m.includes('mini')) {
    displayName = 'GPT-4o Mini'
    badgeText = 'GPT-4o Mini'
  } else if (m.includes('o1')) {
    displayName = 'OpenAI o1'
    badgeText = 'GPT-o1'
  }

  return {
    provider: 'openai',
    badgeText,
    displayName,
    fullModel: model || 'gpt-4o',
    isClaude: false,
  }
}

interface ResumeCardProps {
  data: ResumeData
  onDelete?: () => void
  onDuplicate?: () => void
  isDuplicating?: boolean
  onToggleShare?: () => void
  isTogglingShare?: boolean
  onPreview?: () => void
  onEdit?: () => void
  onDownload?: () => void
  isDownloading?: boolean
}

export function ResumeCard({
  data,
  onDelete,
  onDuplicate,
  isDuplicating,
  onToggleShare,
  isTogglingShare,
  onPreview,
  onEdit,
  onDownload,
  isDownloading,
}: ResumeCardProps) {
  const isFullTime = !String(data.type || '').toLowerCase().includes('c2c')
  const aiInfo = getAiModelDisplay(data.aiProvider, data.aiModel)

  const daysOld = data.createdAt
    ? differenceInDays(new Date(), new Date(data.createdAt))
    : 0
  const daysRemaining = 20 - daysOld

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-slate-900/[0.06] hover:border-[#0F2744]/25 hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Top Preview Canvas */}
      <div
        onClick={() => onPreview?.()}
        className="relative h-52 bg-slate-50 border-b border-slate-200/80 overflow-hidden cursor-pointer select-none"
      >
        <div className="absolute inset-0 transform scale-[0.3] origin-top-left w-[333.33%] h-[333.33%] pointer-events-none bg-white">
          {(() => {
            const TemplateComponent = getTemplateById(
              data.templateId || data.template
            )?.component
            if (TemplateComponent) {
              const rData = data.fullResumeData || {
                summary: [],
                skills: [],
                experience: [],
                education: [],
                certifications: [],
              }

              if (!Array.isArray(rData.summary)) {
                rData.summary = typeof rData.summary === 'string' ? [rData.summary] : []
              }
              if (!Array.isArray(rData.skills)) rData.skills = []
              if (!Array.isArray(rData.experience)) rData.experience = []
              if (!Array.isArray(rData.education)) rData.education = []
              if (!Array.isArray(rData.certifications)) rData.certifications = []

              const pData = data.profileData || {
                full_name: data.candidateName || data.name || 'Candidate',
                email: 'candidate@example.com',
                phone: '+1 234 567 8900',
                linkedin: 'linkedin.com/in/candidate',
                location: 'Remote',
                firstName: '',
                lastName: '',
              }

              const normalizedProfileData = {
                ...pData,
                full_name:
                  pData.full_name ||
                  pData.fullName ||
                  `${pData.firstName || ''} ${pData.lastName || ''}`.trim() ||
                  data.candidateName ||
                  'Candidate',
              }

              return (
                <div style={{ pointerEvents: 'none' }}>
                  <Suspense
                    fallback={<div className="w-full h-full bg-slate-100 animate-pulse rounded" />}
                  >
                    <TemplateComponent
                      resumeData={rData}
                      profileData={normalizedProfileData}
                    />
                  </Suspense>
                </div>
              )
            }
            return <div className="p-8 text-xs font-bold">Template preview unavailable</div>
          })()}
        </div>

        {/* AI Model Badge */}
        <div
          className={cn(
            'absolute top-3 left-3 px-2.5 py-1 rounded-lg border shadow-xs flex items-center gap-1 z-10 backdrop-blur-xs font-extrabold text-[10.5px]',
            aiInfo.isClaude
              ? 'bg-amber-50/95 border-amber-300/80 text-amber-800'
              : 'bg-emerald-50/95 border-emerald-300/80 text-emerald-800'
          )}
          title={`Generated using ${aiInfo.displayName} (${aiInfo.fullModel})`}
        >
          <Sparkles
            className={cn('w-3 h-3', aiInfo.isClaude ? 'text-amber-600' : 'text-emerald-600')}
          />
          <span>{aiInfo.badgeText}</span>
        </div>

        {/* ATS Score Pill */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200/90 shadow-xs flex items-center gap-1.5 z-10">
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              data.atsScore >= 90
                ? 'bg-emerald-500'
                : data.atsScore >= 70
                ? 'bg-amber-500'
                : data.atsScore > 0
                ? 'bg-rose-500'
                : 'bg-slate-300'
            )}
          />
          <span className="text-[11px] font-black text-slate-900 tabular-nums">
            {data.atsScore > 0 ? `${data.atsScore}% ATS` : '- ATS'}
          </span>
        </div>

        {/* Hover Studio Overlay */}
        <div className="absolute inset-0 bg-[#0F2744]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 backdrop-blur-[2px] z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPreview?.()
            }}
            className="w-10 h-10 bg-white text-[#0F2744] rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-md cursor-pointer"
            title="Preview Resume"
          >
            <Eye className="w-4 h-4" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.()
            }}
            className="w-10 h-10 bg-[#F59E0B] text-slate-950 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-md cursor-pointer"
            title="Edit Resume"
          >
            <Edit3 className="w-4 h-4" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDownload?.()
            }}
            disabled={isDownloading}
            className="w-10 h-10 bg-slate-900 border border-white/20 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-md cursor-pointer disabled:opacity-50"
            title="Download PDF"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" strokeWidth={2.4} />
            )}
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-[15px] font-extrabold text-slate-900 line-clamp-1 group-hover:text-[#0F2744] transition-colors"
            title={data.name}
          >
            {data.name}
          </h3>
          <div className="shrink-0 flex items-center gap-1">
            {data.isPublic && (
              <span
                className="flex items-center gap-0.5 text-[10px] font-extrabold text-[#0F2744] bg-[#EEF4FA] border border-[#0F2744]/15 px-2 py-0.5 rounded-md"
                title="Public share link enabled"
              >
                <Share2 className="w-2.5 h-2.5" />
                Public
              </span>
            )}
            {data.versionNumber != null && data.versionNumber > 1 && (
              <span
                className="flex items-center gap-0.5 text-[10px] font-extrabold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md tabular-nums"
                title="Version"
              >
                <GitBranch className="w-2.5 h-2.5" />
                v{data.versionNumber}
              </span>
            )}
          </div>
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-1.5 mb-3.5 flex-wrap">
          <span
            className={cn(
              'px-2 py-0.5 rounded-md text-[10.5px] font-extrabold border',
              isFullTime
                ? 'bg-[#EEF4FA] text-[#0F2744] border-[#0F2744]/15'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            )}
          >
            {data.type}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
            {data.status}
          </span>
        </div>

        {/* Metadata List */}
        <div className="space-y-1.5 mb-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold truncate">{data.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold truncate">{data.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-500 truncate">{data.template}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-500 truncate">{aiInfo.displayName}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 truncate">
              <Calendar className="w-3 h-3 shrink-0" />
              <span className="truncate">{data.lastUpdated}</span>
            </div>
            {data.createdAt && daysRemaining <= 5 && daysRemaining > 0 && (
              <span className="text-[10px] font-bold text-amber-600 mt-0.5">
                Expires in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
              </span>
            )}
            {data.createdAt && daysRemaining <= 0 && (
              <span className="text-[10px] font-bold text-rose-600 mt-0.5">
                Pending cleanup
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onDownload?.()
              }}
              disabled={isDownloading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F2744] hover:bg-[#EEF4FA] transition-colors cursor-pointer disabled:opacity-50"
              title="Download PDF"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onEdit?.()
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F2744] hover:bg-[#EEF4FA] transition-colors cursor-pointer"
              title="Edit Resume"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onDuplicate}
              disabled={isDuplicating}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F2744] hover:bg-[#EEF4FA] transition-colors cursor-pointer disabled:opacity-50"
              title="Duplicate"
            >
              {isDuplicating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={onToggleShare}
              disabled={isTogglingShare}
              className={cn(
                'p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50',
                data.isPublic
                  ? 'text-[#0F2744] bg-[#EEF4FA]'
                  : 'text-slate-400 hover:text-[#0F2744] hover:bg-[#EEF4FA]'
              )}
              title={data.isPublic ? 'Make private' : 'Share public link'}
            >
              {isTogglingShare ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

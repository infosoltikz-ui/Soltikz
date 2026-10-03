'use client'

import { ShieldCheck, Sparkles, UploadCloud, Eye, CheckCircle2, User, FileText } from 'lucide-react'
import { UserMenu } from '@/components/dashboard/UserMenu'

interface ProfileHeaderProps {
  profile?: any
  viewMode?: boolean
  onToggleViewMode?: () => void
  onOpenImport?: () => void
  onPreviewModal?: () => void
}

export function ProfileHeader({
  profile,
  viewMode,
  onToggleViewMode,
  onOpenImport,
  onPreviewModal
}: ProfileHeaderProps) {
  const masterData = profile?.master_resume_data || {}
  const pi = masterData?.personal_info || {}
  const fullName = [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ') || profile?.full_name || 'Candidate Master Profile'
  const email = profile?.email || pi.email || ''

  // Generate initials for avatar
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'CV'

  const jobCount = masterData?.employment?.length || 0
  const skillCount = Array.isArray(masterData?.skills) ? masterData.skills.length : 0

  return (
    <div className="mb-4">

      {/* Compact Profile Hero Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-2.5 overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          {/* Avatar & Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight">{fullName}</span>
                <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-none mt-0.5">
                {pi.location ? `${pi.location} • ` : ''}{email || 'Primary Candidate Record'}
              </p>
              <div className="flex flex-wrap items-center gap-1 mt-1">
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-px rounded">
                  {jobCount} Experiences
                </span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-px rounded">
                  {skillCount} Skills
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-px rounded flex items-center gap-0.5">
                  <Sparkles className="w-2 h-2 text-emerald-600" />
                  ATS 90+
                </span>
              </div>
            </div>
          </div>
          {/* Action */}
          {onPreviewModal && (
            <button
              onClick={onPreviewModal}
              className="h-7 px-3 text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-md shadow-sm inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <FileText className="w-3 h-3" />
              Preview CV
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

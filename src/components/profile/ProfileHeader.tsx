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
    <div className="mb-6 space-y-4">

      {/* Compact Profile Hero Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 sm:p-4 overflow-hidden relative">
        <div className="flex items-center justify-between gap-4">
          {/* Avatar & Candidate Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">
                  {fullName}
                </h2>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              </div>

              <p className="text-[12px] font-medium text-slate-500">
                {pi.location ? `${pi.location} • ` : ''}{email || 'Primary Candidate Record'}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                  {jobCount} {jobCount === 1 ? 'Work Experience' : 'Work Experiences'}
                </span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                  {skillCount} {skillCount === 1 ? 'Skill Category' : 'Skill Categories'}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  ATS 90+ Ready
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="flex items-center gap-2 shrink-0">
            {onPreviewModal && (
              <button
                onClick={onPreviewModal}
                className="h-8 px-3.5 text-[12px] font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                Preview Master CV
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

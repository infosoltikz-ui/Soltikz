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
      {/* Top Bar with Title & User Menu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight leading-tight">
              Master Career Profile
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified &amp; Encrypted
            </span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">
            Your centralized master career repository powering 90+ ATS AI resume generation.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {onOpenImport && (
            <button
              onClick={onOpenImport}
              className="h-9 px-3.5 text-[12.5px] font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5 text-primary" />
              Import LinkedIn
            </button>
          )}

          {onToggleViewMode && (
            <button
              onClick={onToggleViewMode}
              className="h-9 px-3.5 text-[12.5px] font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              {viewMode ? 'Switch to Edit Forms' : 'View Full Dossier'}
            </button>
          )}

          <UserMenu />
        </div>
      </div>

      {/* Executive Candidate Profile Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 overflow-hidden relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          {/* Avatar & Candidate Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-md border-2 border-white ring-2 ring-slate-100">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 tracking-tight">
                  {fullName}
                </h2>
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              </div>

              <p className="text-[13px] font-medium text-slate-500 mt-0.5">
                {pi.location ? `${pi.location} • ` : ''}{email || 'Primary Candidate Record'}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                  {jobCount} {jobCount === 1 ? 'Work Experience' : 'Work Experiences'}
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                  {skillCount} {skillCount === 1 ? 'Skill Category' : 'Skill Categories'}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  ATS 90+ Ready
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            {onPreviewModal && (
              <button
                onClick={onPreviewModal}
                className="h-9 px-4 text-[12.5px] font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Preview Master CV
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

'use client'

import { ShieldCheck, Sparkles, UploadCloud, Eye, CheckCircle2, User, FileText, FileSpreadsheet, Download } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ExcelTemplateModal } from './ExcelTemplateModal'

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
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)

  const handleDownloadExcel = () => {
    const headers = "First Name,Last Name,Email,Phone,Summary,Job Title,Company,Start Date,End Date,Responsibilities\n"
    const blob = new Blob([headers], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = "Soltikz_Profile_Template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success('Template downloaded successfully!')
  }

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* Left column: Compact Profile Hero Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-2.5 overflow-hidden flex items-center">
        <div className="flex items-center justify-between gap-3 w-full">
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
        </div>
      </div>

      {/* Right column: Excel Import Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[12.5px] font-bold text-slate-900 leading-tight">Excel Data Import</h3>
            <p className="text-[10px] text-slate-500">Auto-fill your profile</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="h-7 px-3 text-[11px] font-semibold border border-slate-200 hover:border-slate-300 bg-white text-slate-700 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3 h-3 text-slate-500" />
            <span>Download</span>
          </button>
          <button
            onClick={() => toast.error("Excel upload is coming soon!")}
            className="h-7 px-3 text-[11px] font-semibold border border-transparent bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* Excel Instructions Modal */}
      <ExcelTemplateModal 
        open={isExcelModalOpen} 
        onClose={() => setIsExcelModalOpen(false)} 
        onDownload={handleDownloadExcel}
      />
    </div>
  )
}

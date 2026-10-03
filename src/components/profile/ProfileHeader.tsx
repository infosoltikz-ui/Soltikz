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
    import('xlsx').then((XLSX) => {
      // Define headers for each sheet
      const personalInfoHeaders = [["First Name", "Last Name", "Email", "Phone", "Location", "Website/Portfolio", "Summary"]]
      const experienceHeaders = [["Job Title", "Company", "Location", "Start Date (MM/YYYY)", "End Date (MM/YYYY)", "Is Current (Yes/No)", "Responsibilities"]]
      const educationHeaders = [["Degree", "Field of Study", "Institution", "Location", "Start Date (MM/YYYY)", "End Date (MM/YYYY)", "GPA"]]
      const projectsHeaders = [["Project Name", "Role", "Date", "Project URL", "Description"]]
      const skillsHeaders = [["Skill Name", "Category", "Proficiency (Beginner/Intermediate/Advanced)"]]
      const socialLinksHeaders = [["Platform Name (e.g., LinkedIn)", "URL"]]

      // Create worksheets
      const wsPersonalInfo = XLSX.utils.aoa_to_sheet(personalInfoHeaders)
      const wsExperience = XLSX.utils.aoa_to_sheet(experienceHeaders)
      const wsEducation = XLSX.utils.aoa_to_sheet(educationHeaders)
      const wsProjects = XLSX.utils.aoa_to_sheet(projectsHeaders)
      const wsSkills = XLSX.utils.aoa_to_sheet(skillsHeaders)
      const wsSocialLinks = XLSX.utils.aoa_to_sheet(socialLinksHeaders)

      // Auto-size columns loosely for better UX
      const wscols = [{ wch: 20 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 50 }]
      wsPersonalInfo['!cols'] = wscols
      wsExperience['!cols'] = wscols
      wsEducation['!cols'] = wscols

      // Create a workbook and append the worksheets
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, wsPersonalInfo, "Personal Info")
      XLSX.utils.book_append_sheet(wb, wsExperience, "Experience")
      XLSX.utils.book_append_sheet(wb, wsEducation, "Education")
      XLSX.utils.book_append_sheet(wb, wsProjects, "Projects")
      XLSX.utils.book_append_sheet(wb, wsSkills, "Skills")
      XLSX.utils.book_append_sheet(wb, wsSocialLinks, "Social Links")

      // Write the workbook and trigger download
      XLSX.writeFile(wb, "Soltikz_Master_Profile_Template.xlsx")
      toast.success('Excel Template downloaded successfully!')
    }).catch((err) => {
      console.error("Error generating Excel template:", err)
      toast.error("Failed to generate Excel template. Please try again.")
    })
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
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 overflow-hidden flex items-center">
        <div className="flex items-center justify-between gap-3 w-full">
          {/* Avatar & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white font-bold text-[14px] flex items-center justify-center shrink-0 shadow-sm">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-slate-900 tracking-tight">{fullName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              </div>
              <p className="text-[11.5px] font-medium text-slate-500 leading-none mt-1">
                {pi.location ? `${pi.location} • ` : ''}{email || 'Primary Candidate Record'}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-px rounded">
                  {jobCount} Experiences
                </span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-px rounded">
                  {skillCount} Skills
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-px rounded flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  ATS 90+
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: Excel Import Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-900 leading-tight">Excel Data Import</h3>
            <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed pr-2">
              Don't want to fill out forms manually? Download our standard template, fill it locally, and upload it to auto-populate your entire profile data at once.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="w-28 h-8 px-3 text-[11px] font-semibold border border-slate-200 hover:border-slate-300 bg-white text-slate-700 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>
          <button
            onClick={() => toast.error("Excel upload is coming soon!")}
            className="w-28 h-8 px-3 text-[11px] font-semibold border border-transparent bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload CSV</span>
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

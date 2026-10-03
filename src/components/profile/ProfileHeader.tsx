'use client'

import { ShieldCheck, Sparkles, UploadCloud, Eye, CheckCircle2, User, FileText, FileSpreadsheet, Download } from 'lucide-react'
import { useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { ExcelTemplateModal } from './ExcelTemplateModal'

interface ProfileHeaderProps {
  profile?: any
  viewMode?: boolean
  onToggleViewMode?: () => void
  onOpenImport?: () => void
  onPreviewModal?: () => void
  onExcelImport?: (data: any) => void
}

export function ProfileHeader({
  profile,
  viewMode,
  onToggleViewMode,
  onOpenImport,
  onPreviewModal,
  onExcelImport
}: ProfileHeaderProps) {
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const excelInputRef = useRef<HTMLInputElement>(null)

  const handleDownloadExcel = () => {
    import('xlsx').then((XLSX) => {
      // Define headers for each sheet matching the UI tabs exactly
      const personalDetailsHeaders = [["First Name", "Middle Name", "Last Name", "Email", "Phone", "Current Location", "LinkedIn Profile URL", "Executive Paragraph"]]
      const experienceHeaders = [["Job Title", "Company / Organization", "Employment Type", "Industry", "Country", "Location", "Start Date (MM/YYYY)", "End Date (MM/YYYY)", "Is Current Role? (Yes/No)", "Responsibilities & Measurable Achievements"]]
      const educationHeaders = [["Degree / Credential", "Field of Study / Major", "Institution Name", "Location", "Start Date (MM/YYYY)", "End Date (MM/YYYY)", "GPA / Score"]]
      const projectsHeaders = [["Project Name", "Role / Title", "Live Link / Repository", "Start Date (MM/YYYY)", "End Date (MM/YYYY)", "Project Overview & Architecture"]]
      const certificationsHeaders = [["Certification Name", "Issuing Organization", "Issue Date (MM/YYYY)", "Expiration Date (MM/YYYY)", "Credential ID", "Credential URL"]]
      const skillsTechHeaders = [["Skill Name", "Category (Frontend/Backend/etc)", "Proficiency (Beginner/Intermediate/Advanced)"]]

      // Create worksheets
      const wsPersonal = XLSX.utils.aoa_to_sheet(personalDetailsHeaders)
      const wsExperience = XLSX.utils.aoa_to_sheet(experienceHeaders)
      const wsEducation = XLSX.utils.aoa_to_sheet(educationHeaders)
      const wsProjects = XLSX.utils.aoa_to_sheet(projectsHeaders)
      const wsCertifications = XLSX.utils.aoa_to_sheet(certificationsHeaders)
      const wsSkills = XLSX.utils.aoa_to_sheet(skillsTechHeaders)

      // Auto-size columns loosely for better UX
      const wscols = [{ wch: 20 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 50 }]
      wsPersonal['!cols'] = wscols
      wsExperience['!cols'] = wscols
      wsEducation['!cols'] = wscols
      wsProjects['!cols'] = wscols
      wsCertifications['!cols'] = wscols
      wsSkills['!cols'] = wscols

      // Create a workbook and append the worksheets with exact UI tab names
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, wsPersonal, "Personal Details")
      XLSX.utils.book_append_sheet(wb, wsExperience, "Experience")
      XLSX.utils.book_append_sheet(wb, wsEducation, "Education")
      XLSX.utils.book_append_sheet(wb, wsProjects, "Projects")
      XLSX.utils.book_append_sheet(wb, wsCertifications, "Certifications")
      XLSX.utils.book_append_sheet(wb, wsSkills, "Skills & Tech")

      // Write the workbook and trigger download
      XLSX.writeFile(wb, "Soltikz_Master_Profile_Template.xlsx")
      toast.success('Excel Template downloaded successfully!')
    }).catch((err) => {
      console.error("Error generating Excel template:", err)
      toast.error("Failed to generate Excel template. Please try again.")
    })
  }

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // Reset input
    if (!file) return

    try {
      const XLSX = await import('xlsx')
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = event.target?.result
          const workbook = XLSX.read(data, { type: 'binary' })
          
          const parsedData: any = {
            personal_info: {},
            employment: [],
            education: [],
            projects: [],
            certifications: [],
            skills: []
          }

          // Helper to get sheet data
          const getSheetData = (sheetName: string) => {
            const sheet = workbook.Sheets[sheetName]
            if (!sheet) return []
            return XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(1) // skip header
          }

          // Parse Personal Details
          const personalData = getSheetData("Personal Details")
          if (personalData.length > 0) {
            const row: any = personalData[0]
            parsedData.personal_info = {
              firstName: row[0] || "",
              middleName: row[1] || "",
              lastName: row[2] || "",
              email: row[3] || "",
              phone: row[4] || "",
              location: row[5] || "",
              linkedin: row[6] || "",
              summary: row[7] || ""
            }
          }

          // Parse Experience
          const expData = getSheetData("Experience")
          parsedData.employment = expData.filter((r: any) => r.length > 0).map((row: any) => ({
            title: row[0] || "",
            company: row[1] || "",
            employmentType: row[2] || "",
            industry: row[3] || "",
            country: row[4] || "",
            location: row[5] || "",
            startDate: row[6] || "",
            endDate: row[7] || "",
            current: String(row[8] || "").toLowerCase() === 'yes',
            responsibilities: row[9] || ""
          }))

          // Parse Education
          const eduData = getSheetData("Education")
          parsedData.education = eduData.filter((r: any) => r.length > 0).map((row: any) => ({
            degree: row[0] || "",
            fieldOfStudy: row[1] || "",
            institution: row[2] || "",
            location: row[3] || "",
            startDate: row[4] || "",
            endDate: row[5] || "",
            grade: row[6] || ""
          }))

          // Parse Projects
          const projData = getSheetData("Projects")
          parsedData.projects = projData.filter((r: any) => r.length > 0).map((row: any) => ({
            name: row[0] || "",
            role: row[1] || "",
            link: row[2] || "",
            startDate: row[3] || "",
            endDate: row[4] || "",
            description: row[5] || ""
          }))

          // Parse Certifications
          const certData = getSheetData("Certifications")
          parsedData.certifications = certData.filter((r: any) => r.length > 0).map((row: any) => ({
            name: row[0] || "",
            organization: row[1] || "",
            issueDate: row[2] || "",
            expiryDate: row[3] || "",
            credentialId: row[4] || "",
            credentialUrl: row[5] || ""
          }))

          // Parse Skills & Tech
          const skillsData = getSheetData("Skills & Tech")
          const groupedSkills: Record<string, string[]> = {}
          skillsData.filter((r: any) => r.length > 0).forEach((row: any) => {
            const skillName = row[0]
            const category = row[1] || "Other Skills"
            if (skillName) {
              if (!groupedSkills[category]) groupedSkills[category] = []
              groupedSkills[category].push(skillName)
            }
          })
          parsedData.skills = Object.keys(groupedSkills).map(cat => ({ category: cat, items: groupedSkills[cat] }))

          if (onExcelImport) {
            onExcelImport(parsedData)
            toast.success("Excel data imported successfully!")
          }
        } catch (err) {
          console.error("Failed to parse Excel file:", err)
          toast.error("Failed to parse Excel file. Ensure it matches the template.")
        }
      }
      reader.readAsBinaryString(file)
    } catch (err) {
      console.error("Error importing xlsx:", err)
      toast.error("Failed to load excel parser.")
    }
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
          <input 
            type="file" 
            ref={excelInputRef}
            className="hidden" 
            accept=".xlsx,.xls,.csv"
            onChange={handleExcelUpload}
          />
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="w-28 h-8 px-3 text-[11px] font-semibold border border-slate-200 hover:border-slate-300 bg-white text-slate-700 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>
          <button
            onClick={() => excelInputRef.current?.click()}
            className="w-28 h-8 px-3 text-[11px] font-semibold border border-transparent bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Excel</span>
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

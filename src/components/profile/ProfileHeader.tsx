'use client'

import {
  Sparkles,
  UploadCloud,
  Eye,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Edit3,
  FileText,
  MapPin,
  Mail,
} from 'lucide-react'
import { useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { ExcelTemplateModal } from './ExcelTemplateModal'
import { cn } from '@/utils/cn'

interface ProfileHeaderProps {
  profile?: any
  viewMode?: boolean
  onToggleViewMode?: () => void
  onPreviewModal?: () => void
  onExcelImport?: (data: any) => void
}

export function ProfileHeader({
  profile,
  viewMode,
  onToggleViewMode,
  onPreviewModal,
  onExcelImport,
}: ProfileHeaderProps) {
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const excelInputRef = useRef<HTMLInputElement>(null)

  const handleDownloadExcel = () => {
    import('xlsx')
      .then((XLSX) => {
        const personalDetailsHeaders = [
          [
            'First Name',
            'Middle Name',
            'Last Name',
            'Email',
            'Phone',
            'Current Location',
            'LinkedIn Profile URL',
            'Executive Paragraph',
          ],
        ]
        const experienceHeaders = [
          [
            'Job Title',
            'Company / Organization',
            'Employment Type',
            'Industry',
            'Country',
            'Location',
            'Start Date (MM/YYYY)',
            'End Date (MM/YYYY)',
            'Is Current Role? (Yes/No)',
            'Responsibilities & Measurable Achievements',
          ],
        ]
        const educationHeaders = [
          [
            'Degree / Credential',
            'Field of Study / Major',
            'Institution Name',
            'Location',
            'Start Date (MM/YYYY)',
            'End Date (MM/YYYY)',
            'GPA / Score',
          ],
        ]
        const projectsHeaders = [
          [
            'Project Name',
            'Role / Title',
            'Live Link / Repository',
            'Start Date (MM/YYYY)',
            'End Date (MM/YYYY)',
            'Project Overview & Architecture',
          ],
        ]
        const certificationsHeaders = [
          [
            'Certification Name',
            'Issuing Organization',
            'Issue Date (MM/YYYY)',
            'Expiration Date (MM/YYYY)',
            'Credential ID',
            'Credential URL',
          ],
        ]
        const skillsTechHeaders = [
          [
            'Skill Name',
            'Category (Frontend/Backend/etc)',
            'Proficiency (Beginner/Intermediate/Advanced)',
          ],
        ]

        const wsPersonal = XLSX.utils.aoa_to_sheet(personalDetailsHeaders)
        const wsExperience = XLSX.utils.aoa_to_sheet(experienceHeaders)
        const wsEducation = XLSX.utils.aoa_to_sheet(educationHeaders)
        const wsProjects = XLSX.utils.aoa_to_sheet(projectsHeaders)
        const wsCertifications = XLSX.utils.aoa_to_sheet(certificationsHeaders)
        const wsSkills = XLSX.utils.aoa_to_sheet(skillsTechHeaders)

        const wscols = [
          { wch: 20 },
          { wch: 20 },
          { wch: 25 },
          { wch: 15 },
          { wch: 20 },
          { wch: 20 },
          { wch: 50 },
        ]
        wsPersonal['!cols'] = wscols
        wsExperience['!cols'] = wscols
        wsEducation['!cols'] = wscols
        wsProjects['!cols'] = wscols
        wsCertifications['!cols'] = wscols
        wsSkills['!cols'] = wscols

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, wsPersonal, 'Personal Details')
        XLSX.utils.book_append_sheet(wb, wsExperience, 'Experience')
        XLSX.utils.book_append_sheet(wb, wsEducation, 'Education')
        XLSX.utils.book_append_sheet(wb, wsProjects, 'Projects')
        XLSX.utils.book_append_sheet(wb, wsCertifications, 'Certifications')
        XLSX.utils.book_append_sheet(wb, wsSkills, 'Skills & Tech')

        XLSX.writeFile(wb, 'Soltikz_Master_Profile_Template.xlsx')
        toast.success('Excel Template downloaded successfully!')
      })
      .catch((err) => {
        console.error('Error generating Excel template:', err)
        toast.error('Failed to generate Excel template. Please try again.')
      })
  }

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
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
            skills: [],
          }

          const getSheetData = (sheetName: string) => {
            const sheet = workbook.Sheets[sheetName]
            if (!sheet) return []
            return XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(1)
          }

          const personalData = getSheetData('Personal Details')
          if (personalData.length > 0) {
            const row: any = personalData[0]
            parsedData.personal_info = {
              firstName: row[0] || '',
              middleName: row[1] || '',
              lastName: row[2] || '',
              email: row[3] || '',
              phone: row[4] || '',
              location: row[5] || '',
              linkedin: row[6] || '',
              summary: row[7] || '',
            }
          }

          const expData = getSheetData('Experience')
          parsedData.employment = expData
            .filter((r: any) => r.length > 0)
            .map((row: any) => ({
              title: row[0] || '',
              company: row[1] || '',
              employmentType: row[2] || '',
              industry: row[3] || '',
              country: row[4] || '',
              location: row[5] || '',
              startDate: row[6] || '',
              endDate: row[7] || '',
              current: String(row[8] || '').toLowerCase() === 'yes',
              responsibilities: row[9] || '',
            }))

          const eduData = getSheetData('Education')
          parsedData.education = eduData
            .filter((r: any) => r.length > 0)
            .map((row: any) => ({
              degree: row[0] || '',
              fieldOfStudy: row[1] || '',
              institution: row[2] || '',
              location: row[3] || '',
              startDate: row[4] || '',
              endDate: row[5] || '',
              grade: row[6] || '',
            }))

          const projData = getSheetData('Projects')
          parsedData.projects = projData
            .filter((r: any) => r.length > 0)
            .map((row: any) => ({
              name: row[0] || '',
              role: row[1] || '',
              link: row[2] || '',
              startDate: row[3] || '',
              endDate: row[4] || '',
              description: row[5] || '',
            }))

          const certData = getSheetData('Certifications')
          parsedData.certifications = certData
            .filter((r: any) => r.length > 0)
            .map((row: any) => ({
              name: row[0] || '',
              organization: row[1] || '',
              issueDate: row[2] || '',
              expiryDate: row[3] || '',
              credentialId: row[4] || '',
              credentialUrl: row[5] || '',
            }))

          const skillsData = getSheetData('Skills & Tech')
          const groupedSkills: Record<string, string[]> = {}
          skillsData
            .filter((r: any) => r.length > 0)
            .forEach((row: any) => {
              const skillName = row[0]
              const category = row[1] || 'Other Skills'
              if (skillName) {
                if (!groupedSkills[category]) groupedSkills[category] = []
                groupedSkills[category].push(skillName)
              }
            })
          parsedData.skills = Object.keys(groupedSkills).map((cat) => ({
            category: cat,
            items: groupedSkills[cat],
          }))

          if (onExcelImport) {
            onExcelImport(parsedData)
            toast.success('Excel data imported successfully!')
          }
        } catch (err) {
          console.error('Failed to parse Excel file:', err)
          toast.error('Failed to parse Excel file. Ensure it matches the template.')
        }
      }
      reader.readAsBinaryString(file)
    } catch (err) {
      console.error('Error importing xlsx:', err)
      toast.error('Failed to load excel parser.')
    }
  }

  const masterData = profile?.master_resume_data || {}
  const pi = masterData?.personal_info || {}
  const fullName =
    [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ') ||
    profile?.full_name ||
    'Candidate Master Profile'
  const email = profile?.email || pi.email || ''

  const initials =
    fullName
      .split(' ')
      .map((n: string) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'CV'

  const jobCount = masterData?.employment?.length || 0
  const skillCount = Array.isArray(masterData?.skills) ? masterData.skills.length : 0

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-6">
      {/* Candidate Identity & Mode Switcher */}
      <div className="xl:col-span-12 bg-[#151D28] rounded-2xl border border-[#26313F] shadow-xs p-5 sm:p-6 flex flex-col justify-between gap-4 hover:border-[#3A495C] transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-[#0A1017] text-[#D9A441] font-black text-lg flex items-center justify-center shrink-0 ring-4 ring-[#26313F] shadow-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-extrabold text-[#E4EAF2] tracking-tight truncate">
                  {fullName}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold bg-[#123227] text-[#3FA57C] border border-[#3FA57C]/30 px-2 py-0.5 rounded-full shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  Synced Record
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#9FACBE] mt-1">
                {pi.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#78859A]" />
                    {pi.location}
                  </span>
                )}
                {email && (
                  <span className="inline-flex items-center gap-1 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#78859A]" />
                    {email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mode Toggle & Preview Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {onToggleViewMode && (
              <div className="inline-flex p-1 rounded-xl bg-[#1A2330] border border-[#26313F]">
                <button
                  type="button"
                  onClick={() => {
                    if (!viewMode) onToggleViewMode()
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    viewMode
                      ? 'bg-[#0A6E4E] text-white shadow-2xs'
                      : 'text-[#78859A] hover:text-[#E4EAF2]'
                  )}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (viewMode) onToggleViewMode()
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    !viewMode
                      ? 'bg-[#0A6E4E] text-white shadow-2xs'
                      : 'text-[#78859A] hover:text-[#E4EAF2]'
                  )}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Mode</span>
                </button>
              </div>
            )}

            {onPreviewModal && (
              <button
                type="button"
                onClick={onPreviewModal}
                title="Open Quick Preview"
                className="h-9 px-3 rounded-xl border border-[#26313F] bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] hover:border-[#3FA57C]/30 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            )}
          </div>
        </div>

        <div className="pt-3.5 border-t border-[#26313F] flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-[#3FA57C] bg-[#123227] border border-[#3FA57C]/30 px-2.5 py-1 rounded-lg tabular-nums">
            {jobCount} {jobCount === 1 ? 'Experience' : 'Experiences'}
          </span>
          <span className="text-[11px] font-bold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2.5 py-1 rounded-lg tabular-nums">
            {skillCount} Skill {skillCount === 1 ? 'Group' : 'Groups'}
          </span>
          <span className="text-[11px] font-bold text-[#D9A441] bg-[#2E2616] border border-[#D9A441]/40 px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D9A441]" />
            ATS Ready Foundation
          </span>
        </div>
      </div>

      {/* Bulk Excel Import Card (Commented out)
      <div className="xl:col-span-5 bg-[#151D28] rounded-2xl border border-[#26313F] shadow-xs p-5 sm:p-6 flex flex-col justify-between gap-4 hover:border-[#3A495C] transition-colors">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#123227] border border-[#3FA57C]/30 text-[#3FA57C] flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[14.5px] font-extrabold text-[#E4EAF2]">
                Bulk Excel Import
              </h3>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#123227] text-[#3FA57C] border border-[#3FA57C]/30">
                Fast Setup
              </span>
            </div>
            <p className="text-xs text-[#9FACBE] font-medium leading-relaxed">
              Prefer offline editing? Download our structured workbook, fill in your career sections, and upload to populate instantly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 pt-2">
          <input
            type="file"
            ref={excelInputRef}
            className="hidden"
            accept=".xlsx,.xls,.csv"
            onChange={handleExcelUpload}
          />
          <button
            type="button"
            onClick={() => setIsExcelModalOpen(true)}
            className="flex-1 h-9 px-3.5 text-xs font-bold border border-[#26313F] bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] hover:border-[#3FA57C]/30 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#78859A]" />
            <span>Template</span>
          </button>

          <button
            type="button"
            onClick={() => excelInputRef.current?.click()}
            className="flex-1 h-9 px-3.5 text-xs font-bold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Upload Excel</span>
          </button>

          {onOpenImport && (
            <button
              type="button"
              onClick={onOpenImport}
              title="Import LinkedIn PDF"
              className="h-9 px-3 text-xs font-bold border border-[#D9A441]/40 bg-[#2E2616] hover:bg-[#D9A441] text-[#D9A441] hover:text-slate-950 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LinkedIn PDF</span>
            </button>
          )}
        </div>
      </div>
      */}

      {/* Excel Instructions Modal */}
      <ExcelTemplateModal
        open={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onDownload={handleDownloadExcel}
      />
    </div>
  )
}

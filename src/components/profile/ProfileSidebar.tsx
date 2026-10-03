'use client'

import { useRef, useState } from 'react'
import {
  CheckCircle2,
  User,
  Mail,
  MapPin,
  Lightbulb,
  Circle,
  Link2,
  Loader2,
  UploadCloud,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileSpreadsheet,
  Upload,
  Download
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'
import { ExcelTemplateModal } from './ExcelTemplateModal'

export function ProfileSidebar({ 
  profile, 
  onImport,
  onNavigateTab
}: { 
  profile?: any; 
  onImport?: (parsedData: any) => void;
  onNavigateTab?: (tab: string) => void;
}) {
  const [isImporting, setIsImporting] = useState(false)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-selecting the same file later
    if (!file) return

    setIsImporting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/ai/parse-linkedin-pdf', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to parse LinkedIn PDF')

      onImport?.(data.parsed_data)
      toast.success('LinkedIn profile imported — please review and save each section')
    } catch (error: any) {
      toast.error(error.message || 'Failed to import LinkedIn profile')
    } finally {
      setIsImporting(false)
    }
  }

  const handleDownloadExcel = () => {
    // Generate a simple CSV for now as a placeholder for the actual Excel
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
  const personalInfo = masterData?.personal_info || {}

  // Real data from profile
  const email = profile?.email || personalInfo?.email || null
  const location = personalInfo?.location || profile?.location || null
  const linkedin = personalInfo?.linkedin || profile?.linkedin_url || null
  const phone = profile?.phone || personalInfo?.phone || null

  // 6-section scoring — one point per tab
  const totalPoints = 6

  const hasPersonalDetails = !!(
    (profile?.full_name || personalInfo?.firstName) &&
    email && phone
  )
  const hasExperience = (masterData?.employment?.length > 0 || masterData?.experience?.length > 0)
  const hasEducation = (masterData?.education?.length > 0)
  const hasProjects = (masterData?.projects?.length > 0)
  const hasCertifications = (masterData?.certifications?.length > 0)
  const hasSkills = (masterData?.skills?.length > 0)

  const completedPoints = [
    hasPersonalDetails,
    hasExperience,
    hasEducation,
    hasProjects,
    hasCertifications,
    hasSkills,
  ].filter(Boolean).length

  const completion = Math.round((completedPoints / totalPoints) * 100)

  // SVG Gauge calculations
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (completion / 100) * circumference
  const strokeColor = completion >= 80 ? '#059669' : completion >= 40 ? '#d97706' : '#2563eb'

  const checklist = [
    { text: 'Personal Details & Contact Info', done: hasPersonalDetails, tab: 'personal' },
    { text: 'Employment History & Experience', done: hasExperience, tab: 'employment' },
    { text: 'Academic Degrees & Institutions', done: hasEducation, tab: 'education' },
    { text: 'Projects & Portfolio', done: hasProjects, tab: 'projects' },
    { text: 'Certifications & Licenses', done: hasCertifications, tab: 'certifications' },
    { text: 'Technical Skills & Tools', done: hasSkills, tab: 'skills' },
  ]

  return (
    <div className="space-y-4">

      {/* Profile Strength Gauge Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <h3 className="text-[13px] font-bold text-slate-900">Profile Health</h3>
          </div>
          <span className={cn(
            "text-[11px] font-bold px-2 py-0.5 rounded-full border",
            completion >= 80 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : completion >= 40
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-slate-50 text-slate-600 border-slate-200'
          )}>
            {completion}% Ready
          </span>
        </div>

        {/* Circular SVG Meter & Status */}
        <div className="flex items-center gap-4 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-slate-200"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke={strokeColor}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-slate-900">
              {completion}%
            </span>
          </div>

          <div>
            <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">
              {completion >= 80 ? 'Master Record Complete' : 'Incomplete Sections'}
            </h4>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5">
              {completion >= 80 ? 'Optimal for 90+ ATS AI resume generation.' : 'Complete checklist below to maximize ATS match score.'}
            </p>
          </div>
        </div>

        {/* Optimization Checklist */}
        <div className="space-y-2">
          {checklist.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => onNavigateTab?.(item.tab)}
              className={cn(
                "flex items-center justify-between p-2 rounded-lg text-[11.5px] transition-colors",
                onNavigateTab ? "cursor-pointer hover:bg-slate-50" : ""
              )}
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={2.5} />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" strokeWidth={2} />
                )}
                <span className={cn(
                  "truncate",
                  item.done ? "text-slate-700 font-medium" : "text-slate-400 font-normal"
                )}>
                  {item.text}
                </span>
              </div>
              {!item.done && onNavigateTab && (
                <span className="text-[10px] font-bold text-primary shrink-0 uppercase tracking-wider">
                  Add
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Excel Data Import Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition-colors mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
          <h3 className="text-[13px] font-bold text-slate-900">Excel Data Import</h3>
        </div>
        
        <p className="text-[11.5px] font-normal text-slate-500 mb-3 leading-relaxed">
          Don't want to fill out forms manually? Download our standard template, fill it locally, and upload it to auto-populate your profile.
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="w-full h-9 text-[12px] font-semibold border border-slate-200 hover:border-slate-300 bg-white text-slate-700 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>
          
          <button
            onClick={() => toast.error("Excel upload is coming soon!")}
            className="w-full h-9 text-[12px] font-semibold border border-transparent bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5" />
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

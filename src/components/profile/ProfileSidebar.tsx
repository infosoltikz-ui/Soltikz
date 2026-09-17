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
  ShieldCheck
} from 'lucide-react'
import { toast } from 'react-hot-toast'

export function ProfileSidebar({ profile, onImport }: { profile?: any; onImport?: (parsedData: any) => void }) {
  const [isImporting, setIsImporting] = useState(false)
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

  const masterData = profile?.master_resume_data || {}
  const personalInfo = masterData?.personal_info || {}

  // Real data from profile
  const email = profile?.email || personalInfo?.email || null
  const location = personalInfo?.location || profile?.location || null
  const linkedin = personalInfo?.linkedin || profile?.linkedin_url || null
  const phone = profile?.phone || personalInfo?.phone || null

  // Calculate real profile completion accurately
  let completedPoints = 0
  const totalPoints = 5

  if (profile?.full_name || personalInfo?.firstName) completedPoints++
  if (email && phone) completedPoints++
  if (personalInfo?.summary || personalInfo?.targetRole) completedPoints++
  if ((masterData?.employment && masterData.employment.length > 0) || (masterData?.experience && masterData.experience.length > 0)) completedPoints++
  if (masterData?.education?.length > 0 && masterData?.skills?.length > 0) completedPoints++

  const completion = Math.round((completedPoints / totalPoints) * 100)

  const summaryItems = [
    { label: 'Full Name', value: profile?.full_name || (personalInfo.firstName ? `${personalInfo.firstName} ${personalInfo.lastName || ''}`.trim() : null), icon: User },
    { label: 'Email', value: email, icon: Mail },
    { label: 'Phone', value: phone, icon: null },
    { label: 'Location', value: location, icon: MapPin },
    { label: 'LinkedIn', value: linkedin ? 'Connected' : null, isLink: true, href: linkedin },
  ]

  const tips = [
    { text: 'Add full name & contact info', done: !!(profile?.full_name && email && phone) },
    { text: 'Write a professional executive summary', done: !!personalInfo?.summary },
    { text: 'Add at least one work experience with metrics', done: (masterData?.employment?.length > 0 || masterData?.experience?.length > 0) },
    { text: 'List verified education & degrees', done: masterData?.education?.length > 0 },
    { text: 'Include technical tools & core competencies', done: masterData?.skills?.length > 0 },
  ]

  return (
    <div className="space-y-4">

      {/* LinkedIn Import Box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-slate-300 transition-colors">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0">
            <Link2 className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
          <h3 className="text-[13px] font-bold text-slate-900">Import from LinkedIn</h3>
        </div>
        <p className="text-[11px] font-normal text-slate-500 mb-3 leading-relaxed">
          Upload your LinkedIn &quot;Save to PDF&quot; export to auto-populate career history and skills.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileSelected}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isImporting}
          className="w-full h-8 text-[12px] font-semibold border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {isImporting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Parsing LinkedIn PDF...
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
              Upload LinkedIn PDF
            </>
          )}
        </button>
      </div>

      {/* Profile Health Meter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
          <h3 className="text-[13px] font-bold text-slate-900">Profile Health</h3>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
            completion >= 80 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : completion >= 40
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            {completion}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              completion >= 80 ? 'bg-emerald-600' : completion >= 40 ? 'bg-amber-500' : 'bg-primary'
            }`}
            style={{ width: `${completion}%` }}
          />
        </div>

        {/* Key Attributes List */}
        <div className="divide-y divide-slate-100 text-[11.5px]">
          {summaryItems.map((item, idx) => (
            <div key={idx} className="py-2 flex items-center justify-between gap-2">
              <span className="text-slate-500 font-medium">{item.label}</span>
              <span className={`font-semibold truncate max-w-[140px] text-right ${
                item.value ? 'text-slate-900' : 'text-slate-400 italic font-normal'
              }`}>
                {item.value || 'Not provided'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Optimization Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-slate-300 transition-colors">
        <div className="flex items-center gap-1.5 pb-2 mb-3 border-b border-slate-100">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <h3 className="text-[13px] font-bold text-slate-900">Optimization Checklist</h3>
        </div>
        
        <div className="space-y-2.5">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              {tip.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" strokeWidth={2} />
              )}
              <span className={`text-[11.5px] leading-snug ${
                tip.done ? 'text-slate-700 font-medium' : 'text-slate-400 font-normal'
              }`}>
                {tip.text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

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
  ArrowRight
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'

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

  // SVG Gauge calculations
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (completion / 100) * circumference
  const strokeColor = completion >= 80 ? '#059669' : completion >= 40 ? '#d97706' : '#2563eb'

  const checklist = [
    { text: 'Full Name & Verified Contact Channels', done: !!(profile?.full_name && email && phone), tab: 'personal' },
    { text: 'Executive Career Summary', done: !!personalInfo?.summary, tab: 'personal' },
    { text: 'Employment History with Quantified Metrics', done: (masterData?.employment?.length > 0 || masterData?.experience?.length > 0), tab: 'employment' },
    { text: 'Academic Degrees & Institutions', done: masterData?.education?.length > 0, tab: 'education' },
    { text: 'Categorized Technical Skills & Tools', done: masterData?.skills?.length > 0, tab: 'skills' },
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

      {/* LinkedIn 1-Click Fast Import Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0">
            <Link2 className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
          <h3 className="text-[13px] font-bold text-slate-900">LinkedIn Fast Import</h3>
        </div>
        
        <p className="text-[11.5px] font-normal text-slate-500 mb-3 leading-relaxed">
          Export your LinkedIn profile as PDF (&quot;More &gt; Save to PDF&quot;) and upload here to auto-populate your master record.
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
          className="w-full h-9 text-[12.5px] font-semibold border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer shadow-2xs"
        >
          {isImporting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
              <span>Parsing LinkedIn Data...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
              <span>Upload LinkedIn PDF</span>
            </>
          )}
        </button>
      </div>

    </div>
  )
}

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
  UploadCloud
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
      toast.success('LinkedIn profile imported — review and save each section')
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
  const phone = profile?.phone || null

  // Calculate real profile completion
  let completion = 0
  if (profile?.full_name) completion += 20
  if (email) completion += 20
  if (phone) completion += 10
  if (location) completion += 10
  if (masterData?.employment?.length > 0) completion += 20
  if (masterData?.education?.length > 0) completion += 10
  if (masterData?.skills?.length > 0) completion += 10

  const summaryItems = [
    { label: 'Name', value: profile?.full_name || null, icon: User },
    { label: 'Email', value: email, icon: Mail },
    { label: 'Location', value: location, icon: MapPin },
    { label: 'LinkedIn', value: linkedin, isSvg: true, svgPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  ]

  // Dynamic tips based on real data
  const tips = [
    { text: 'Add your full name', done: !!profile?.full_name },
    { text: 'Add email & phone number', done: !!(email && phone) },
    { text: 'Add at least one work experience', done: masterData?.employment?.length > 0 },
    { text: 'Add education details', done: masterData?.education?.length > 0 },
    { text: 'Add skills relevant to your target role', done: masterData?.skills?.length > 0 },
    { text: 'Add certifications (if any)', done: masterData?.certifications?.length > 0 },
  ]

  return (
    <div className="space-y-4">

      {/* LinkedIn Import Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="w-4 h-4 text-[#0A66C2]" strokeWidth={2.5} />
          <h3 className="text-[13px] font-black text-slate-900">Import from LinkedIn</h3>
        </div>
        <p className="text-[11px] font-medium text-slate-500 mb-3 leading-relaxed">
          Upload your LinkedIn "Save to PDF" export and we'll pre-fill these forms for you to review.
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
          className="w-full h-9 text-[12px] font-bold border border-slate-200 text-slate-700 hover:border-primary/40 hover:text-primary rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
        >
          {isImporting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Parsing PDF...
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5" />
              Upload PDF
            </>
          )}
        </button>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <h3 className="text-[14px] font-black text-slate-900 mb-3">Profile Summary</h3>
        
        <div className={`rounded-lg p-3 flex items-start gap-2.5 border mb-4 ${completion >= 80 ? 'bg-[#F0FDF4] border-primary/20' : completion >= 20 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${completion >= 80 ? 'bg-primary' : completion >= 20 ? 'bg-amber-500' : 'bg-slate-400'}`}>
            <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
          <div>
            <div className="text-[12px] font-black text-slate-900">{completion >= 80 ? 'Great job!' : completion >= 20 ? 'Keep going!' : 'Just getting started!'}</div>
            <div className="text-[11px] font-medium text-slate-600 mt-0.5">Your profile is {completion}% complete.</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {summaryItems.map((item, idx) => {
            return (
              <div key={idx} className="flex items-center gap-2.5">
                {item.isSvg ? (
                  <svg className="w-[15px] h-[15px] text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d={item.svgPath} />
                  </svg>
                ) : (
                  item.icon && <item.icon className="w-[15px] h-[15px] text-primary shrink-0" strokeWidth={2} />
                )}
                <div className="w-16 text-[11.5px] font-bold text-slate-700">{item.label}</div>
                <div className={`flex-1 text-[11.5px] truncate ${item.value ? 'font-medium text-slate-700' : 'font-medium text-slate-300 italic'}`}>
                  {item.value || 'Not provided'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-yellow-500" strokeWidth={2.5} />
          <h3 className="text-[13px] font-black text-slate-900">Tips for Better Profile</h3>
        </div>
        
        <div className="space-y-2.5">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              {tip.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" strokeWidth={3} />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" strokeWidth={2.5} />
              )}
              <span className={`text-[11.5px] leading-snug ${tip.done ? 'font-medium text-slate-600' : 'font-medium text-slate-400'}`}>
                {tip.text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

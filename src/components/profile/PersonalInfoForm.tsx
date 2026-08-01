import { MapPin, Globe, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

export function PersonalInfoForm({ 
  profile, 
  setProfile, 
  onNext, 
  localMode, 
  onLocalSave 
}: { 
  profile: any, 
  setProfile?: (p: any) => void, 
  onNext?: () => void,
  localMode?: boolean,
  onLocalSave?: (profile: any) => void
}) {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const masterData = profile?.master_resume_data || {}
  const personalInfo = masterData?.personal_info || {}

  const [formData, setFormData] = useState({
    firstName: personalInfo.firstName || profile?.full_name?.split(' ')[0] || '',
    middleName: personalInfo.middleName || '',
    lastName: personalInfo.lastName || profile?.full_name?.split(' ').slice(1).join(' ') || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    linkedin: personalInfo.linkedin || '',
    location: personalInfo.location || '',
    summary: personalInfo.summary || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const newMasterData = {
        ...masterData,
        personal_info: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          linkedin: formData.linkedin,
          location: formData.location,
          summary: formData.summary
        }
      }

      const updates = {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        master_resume_data: newMasterData
      }
      
      const updatedProfile = { ...profile, ...updates }

      if (localMode && onLocalSave) {
        onLocalSave(updatedProfile)
        toast.success('Local changes saved!')
      } else {
        const { error } = await supabase
          .from('profiles')
          .upsert({ 
            id: profile.id, 
            email: formData.email || profile.email,
            ...updates 
          })

        if (error) throw error

        if (setProfile) setProfile(updatedProfile)
        toast.success('Personal information saved!')
      }
      if (onNext) onNext()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save information')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-[18px] font-black text-slate-900 mb-1">Personal Information</h2>
        <p className="text-[13px] font-medium text-slate-500">Add your basic contact details. These will appear at the top of your resume.</p>
      </div>

      {/* Form Body */}
      <div className="px-8 py-8">
        <div className="space-y-8">

          {/* Name Row */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Full Name</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. John"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Middle name
                </label>
                <input
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Optional"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Doe"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Contact Row */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Contact Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Online Presence */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Online Presence</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    type="text"
                    placeholder="City, State, Country"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    type="text"
                    placeholder="linkedin.com/in/yourname"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Professional Summary</p>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                Summary
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange as any}
                rows={5}
                placeholder="A brief summary of your professional background and career goals..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300 resize-y"
              ></textarea>
            </div>
          </div>

        </div>
      </div>

      {/* Card Footer */}
      <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="h-11 px-8 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 min-w-[160px]"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save & Next'}
        </Button>
        <button className="h-11 px-6 rounded-xl font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}

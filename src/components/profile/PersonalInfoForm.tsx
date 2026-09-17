'use client'

import { MapPin, Globe, Loader2, User, Mail, Phone, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

export function PersonalInfoForm({
  profile,
  setProfile,
  onNext,
  localMode,
  onLocalSave,
  onCancel,
  resumeType
}: {
  profile: any,
  setProfile?: (p: any) => void,
  onNext?: () => void,
  localMode?: boolean,
  onLocalSave?: (profile: any) => void,
  onCancel?: () => void,
  resumeType?: 'c2c' | 'fulltime'
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
    phone: profile?.phone || personalInfo.phone || '',
    linkedin: personalInfo.linkedin || '',
    location: personalInfo.location || profile?.location || '',
    summary: personalInfo.summary || '',
    workAuthorization: personalInfo.workAuthorization || profile?.work_authorization || '',
    relocation: personalInfo.relocation || profile?.relocation || '',
    availability: personalInfo.availability || profile?.availability || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin,
          location: formData.location,
          summary: formData.summary,
          workAuthorization: formData.workAuthorization,
          relocation: formData.relocation,
          availability: formData.availability
        }
      }

      const updates = {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        location: formData.location,
        master_resume_data: newMasterData
      }
      
      const updatedProfile = { 
        ...profile, 
        ...updates,
        email: formData.email || profile.email
      }

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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Personal &amp; Contact Details</h2>
          <p className="text-[12px] text-slate-500 font-medium">Basic contact information positioned at the top of your tailored resumes.</p>
        </div>
      </div>

      {/* Form Body */}
      <div className="px-6 py-6 space-y-6">
        {resumeType === 'c2c' && (
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60">
            <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-primary text-white text-[10px] font-bold flex items-center justify-center">C</span>
              C2C / Contract Work Clearance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Work Authorization</label>
                <select
                  name="workAuthorization"
                  value={formData.workAuthorization}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-900 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select status...</option>
                  <option value="US Citizen">US Citizen</option>
                  <option value="Green Card">Green Card</option>
                  <option value="H1B">H1B</option>
                  <option value="H4 EAD">H4 EAD</option>
                  <option value="OPT EAD">OPT EAD</option>
                  <option value="CPT">CPT</option>
                  <option value="TN Visa">TN Visa</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Relocation Status</label>
                <select
                  name="relocation"
                  value={formData.relocation}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-900 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select option...</option>
                  <option value="Yes">Open to Relocate</option>
                  <option value="No">No Relocation</option>
                  <option value="Remote Only">Remote Only</option>
                  <option value="Hybrid Only">Hybrid Only</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Availability / Notice</label>
                <input 
                  type="text" 
                  name="availability"
                  value={formData.availability} 
                  onChange={handleChange}
                  placeholder="e.g. Immediate, 2 Weeks"
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-900 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Name Row */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Candidate Name</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="e.g. John"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                Middle Name
              </label>
              <input
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                type="text"
                placeholder="Optional"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Doe"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Contact Row */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Contact Channels</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Online Presence */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Location &amp; Online Links</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                Current Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  type="text"
                  placeholder="City, State, Country"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  type="text"
                  placeholder="linkedin.com/in/username"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Professional Executive Summary</span>
          {resumeType === 'c2c' ? (
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Capability Bullets (8–10 items)
              </label>
              <p className="text-[11px] text-slate-500 mb-2">Each bullet should follow: [ACTION VERB] + [technical action] + [tools] + [outcome].</p>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={7}
                placeholder="• Architected scalable microservices using Node.js and AWS, reducing latency by 35%&#10;• Spearheaded CI/CD pipeline automation with Docker and GitHub Actions..."
                className="w-full p-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors leading-relaxed"
              ></textarea>
            </div>
          ) : (
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Executive Paragraph (4–5 lines)
              </label>
              <p className="text-[11px] text-slate-500 mb-2">Concise summary highlighting years of experience, core technical stack, and specialized focus.</p>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={4}
                placeholder="Results-driven Senior Software Engineer with 6+ years specializing in modern cloud architectures, React ecosystem, and enterprise scalability."
                className="w-full p-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors leading-relaxed"
              ></textarea>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="h-9 px-6 rounded-lg font-semibold text-[13px] bg-primary text-white hover:bg-primary-dark shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save & Continue'}
        </button>
        {onCancel && (
          <button 
            onClick={onCancel} 
            className="h-9 px-4 rounded-lg font-semibold text-[13px] text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 bg-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}

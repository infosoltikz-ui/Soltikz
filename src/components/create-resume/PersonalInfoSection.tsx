'use client'

import { useState, useEffect } from 'react'
import { User, Edit2 } from 'lucide-react'
import { AutocompleteInput } from '@/components/ui/AutocompleteInput'
import { COUNTRIES, fetchLocations } from '@/utils/locationApi'

export function PersonalInfoSection({ profileData }: { profileData?: any }) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)

  // Extract real data
  const personalInfo = profileData?.master_resume_data?.personal_info || {}
  
  const fullName = [personalInfo.firstName, personalInfo.middleName, personalInfo.lastName]
    .filter(Boolean)
    .join(' ') || profileData?.full_name || 'Name not set'
    
  const email = personalInfo.email || profileData?.email || 'Email not set'
  const phone = personalInfo.phone || profileData?.phone || 'Phone not set'
  const location = personalInfo.location || profileData?.location || 'Location not set'
  const country = personalInfo.country || profileData?.country || ''

  const workAuthorization = personalInfo.work_authorization || profileData?.work_authorization || ''
  const relocation = personalInfo.relocation || profileData?.relocation || ''
  const availability = personalInfo.availability || profileData?.availability || ''

  const [formData, setFormData] = useState({
    fullName: fullName !== 'Name not set' ? fullName : '',
    email: email !== 'Email not set' ? email : '',
    phone: phone !== 'Phone not set' ? phone : '',
    location: location !== 'Location not set' ? location : '',
    country: country,
    workAuthorization: workAuthorization,
    relocation: relocation,
    availability: availability
  })

  // Sync state if profileData changes
  useEffect(() => {
    setFormData({
      fullName: fullName !== 'Name not set' ? fullName : '',
      email: email !== 'Email not set' ? email : '',
      phone: phone !== 'Phone not set' ? phone : '',
      location: location !== 'Location not set' ? location : '',
      country: country,
      workAuthorization: workAuthorization,
      relocation: relocation,
      availability: availability
    })
  }, [fullName, email, phone, location, country, workAuthorization, relocation, availability])

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900 mb-1">Resume Details</h2>
        <p className="text-[13px] font-medium text-slate-500">Verify your personal information</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md hidden sm:block">
            Auto-filled from Master Profile
          </span>
          <button 
            onClick={() => setIsEditingPersonal(!isEditingPersonal)}
            className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-primary transition-colors bg-slate-100 hover:bg-primary/10 px-3 py-1.5 rounded-md"
          >
            <Edit2 className="w-3.5 h-3.5" />
            {isEditingPersonal ? 'Save Changes' : 'Edit'}
          </button>
        </div>
      </div>

      {isEditingPersonal ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Full Name</label>
            <input 
              type="text" 
              value={formData.fullName} 
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Phone Number</label>
            <input 
              type="text" 
              value={formData.phone} 
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Country</label>
            <AutocompleteInput
              name="country"
              value={formData.country}
              onChange={(val) => setFormData(prev => ({ ...prev, country: val }))}
              staticOptions={COUNTRIES}
              placeholder="e.g. United States"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Location</label>
            <AutocompleteInput
              name="location"
              value={formData.location}
              onChange={(val) => setFormData(prev => ({ ...prev, location: val }))}
              fetchOptions={fetchLocations}
              placeholder="e.g. Dallas, Texas"
            />
          </div>

          {/* C2C Specific Fields */}
          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Work Authorization</label>
            <select
              value={formData.workAuthorization}
              onChange={(e) => setFormData(prev => ({ ...prev, workAuthorization: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Relocation</label>
            <select
              value={formData.relocation}
              onChange={(e) => setFormData(prev => ({ ...prev, relocation: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select option...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Open to Relocate">Open to Relocate</option>
              <option value="Remote Only">Remote Only</option>
              <option value="Hybrid Only">Hybrid Only</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Availability</label>
            <input 
              type="text" 
              value={formData.availability} 
              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
              placeholder="e.g. Immediate, 2 Weeks"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
          <div className="text-[16px] font-black text-slate-900">{formData.fullName || 'Name not set'}</div>
          <div className="text-[14px] font-medium text-slate-600 flex items-center gap-2">
            <span className="w-4 h-4 text-slate-400 flex items-center justify-center">@</span>
            {formData.email || 'Email not set'}
          </div>
          <div className="text-[14px] font-medium text-slate-600 flex items-center gap-2">
            <span className="w-4 h-4 text-slate-400 flex items-center justify-center">#</span>
            {formData.phone || 'Phone not set'}
          </div>
          <div className="text-[14px] font-medium text-slate-600 flex items-center gap-2">
            <span className="w-4 h-4 text-slate-400 flex items-center justify-center">📍</span>
            {[formData.location, formData.country].filter(Boolean).join(', ') || 'Location not set'}
          </div>
          
          {(formData.workAuthorization || formData.relocation || formData.availability) && (
            <div className="pt-3 mt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {formData.workAuthorization && (
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Visa Status</span>
                  <span className="text-[13px] font-bold text-slate-700">{formData.workAuthorization}</span>
                </div>
              )}
              {formData.relocation && (
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Relocation</span>
                  <span className="text-[13px] font-bold text-slate-700">{formData.relocation}</span>
                </div>
              )}
              {formData.availability && (
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Availability</span>
                  <span className="text-[13px] font-bold text-slate-700">{formData.availability}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

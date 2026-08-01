'use client'

import { useState } from 'react'
import { User, Edit2 } from 'lucide-react'

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
              defaultValue={fullName !== 'Name not set' ? fullName : ''} 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue={email !== 'Email not set' ? email : ''} 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Phone Number</label>
            <input 
              type="text" 
              defaultValue={phone !== 'Phone not set' ? phone : ''} 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Location</label>
            <input 
              type="text" 
              defaultValue={location !== 'Location not set' ? location : ''} 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-900 transition-colors bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
          <div className="text-[16px] font-black text-slate-900">{fullName}</div>
          <div className="text-[14px] font-medium text-slate-600 flex items-center gap-2">
            <span className="w-4 h-4 text-slate-400 flex items-center justify-center">@</span>
            {email}
          </div>
          <div className="text-[14px] font-medium text-slate-600 flex items-center gap-2">
            <span className="w-4 h-4 text-slate-400 flex items-center justify-center">#</span>
            {phone}
          </div>
          <div className="text-[14px] font-medium text-slate-600 flex items-center gap-2">
            <span className="w-4 h-4 text-slate-400 flex items-center justify-center">📍</span>
            {location}
          </div>
        </div>
      )}
    </div>
  )
}

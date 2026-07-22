'use client'

import { X, Mail, Phone, MapPin, Calendar, Clock, Download, FileText, CheckCircle2, AlertTriangle, User, LogIn, ExternalLink, HardDrive, Target, Crown, Ban } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import { Button } from '@/components/ui/Button'

interface UserProfileDrawerProps {
  userId: string;
  onClose: () => void;
}

export function UserProfileDrawer({ userId, onClose }: UserProfileDrawerProps) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (data) setUser(data)
      setIsLoading(false)
    }
    if (userId) {
      fetchUser()
    }
  }, [userId])

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]" onClick={onClose} />
        <div className="fixed top-0 right-0 h-screen w-[500px] bg-white shadow-2xl z-[110] p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!user) return null

  const initials = (user.full_name || user.email || 'U').substring(0, 2).toUpperCase()
  const plan = user.plan_id || 'FREE'

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100] transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed top-0 right-0 h-screen w-full max-w-[500px] bg-white shadow-2xl z-[110] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-[18px] font-black text-slate-900">User Profile</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Main Info */}
          <div className="flex gap-5">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[24px] font-black shrink-0">
              {initials}
            </div>
            <div>
              <h3 className="text-[20px] font-black text-slate-900 leading-tight mb-1">{user.full_name || 'No Name'}</h3>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-600 text-[11px] font-bold border border-green-100 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" /> {user.email}
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" /> {user.phone || 'Not provided'}
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" /> {user.location || 'Not provided'}
                </div>
              </div>
            </div>
          </div>

          {/* Resume Statistics */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Account Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <FileText className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[20px] font-black text-slate-900">{user.resumes_generated || 0}</div>
                <div className="text-[11px] font-bold text-slate-500">Total Resumes</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <Target className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[20px] font-black text-slate-900">{plan}</div>
                <div className="text-[11px] font-bold text-slate-500">Current Plan</div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Account Details</h3>
            <div className="space-y-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[12px] font-medium text-slate-500">Registration Date</div>
                  <div className="text-[13px] font-bold text-slate-900">{format(new Date(user.created_at), 'MMM dd, yyyy')}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Master Resume Data Status */}
          <div>
            <h4 className="text-[14px] font-black text-slate-900 mb-3">Master Profile Data</h4>
            <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
              <div className="p-3 flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-600">Experience</span>
                {user.master_resume_data?.experience ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-orange-400" />}
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-600">Education</span>
                {user.master_resume_data?.education ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-orange-400" />}
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-600">Skills</span>
                {user.master_resume_data?.skills ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-orange-400" />}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full text-[13px] h-10">
            <Crown className="w-4 h-4 mr-2" /> Upgrade
          </Button>
          <Button className="w-full text-[13px] h-10">
            Reset Password
          </Button>
          <button className="col-span-2 flex items-center justify-center gap-2 h-10 text-[13px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Ban className="w-4 h-4" /> Block User
          </button>
        </div>

      </div>
    </>
  )
}

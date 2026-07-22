'use client'

import { X, FileText, Download, Target, Calendar, User, Briefcase, Award, GraduationCap, LayoutTemplate, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'

interface ResumePreviewDrawerProps {
  resumeId: string;
  onClose: () => void;
}

export function ResumePreviewDrawer({ resumeId, onClose }: ResumePreviewDrawerProps) {
  const [resume, setResume] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResume() {
      const supabase = createClient()
      const { data } = await supabase
        .from('resumes')
        .select('*, profiles(full_name)')
        .eq('id', resumeId)
        .single()
      
      if (data) setResume(data)
      setIsLoading(false)
    }
    if (resumeId) {
      fetchResume()
    }
  }, [resumeId])

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" onClick={onClose} />
        <div className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white shadow-2xl z-[70] p-6">
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

  if (!resume) return null

  const userName = resume.profiles?.full_name || 'Unknown User'
  const resumeType = 'Full-Time' // Dummy since not in schema
  const templateName = resume.content?.template || 'Default Template'
  const status = resume.status || 'draft'
  const experienceEntries = resume.content?.experience?.length || 0
  const educationEntries = resume.content?.education?.length || 0
  const skillsCount = resume.content?.skills?.length || 0

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] z-[70] animate-in slide-in-from-right duration-300 flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-6 flex items-start justify-between border-b border-slate-100 bg-[#FAFAF8]">
          <div className="flex gap-5">
            <div className="w-20 h-28 bg-white border border-slate-200 shadow-md rounded-md overflow-hidden relative">
              <div className="absolute inset-0 bg-slate-50 p-2 flex flex-col gap-1.5">
                <div className="w-1/2 h-1.5 bg-slate-300 rounded-full"></div>
                <div className="w-1/3 h-1 bg-slate-200 rounded-full mb-2"></div>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-1"></div>
                <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                <div className="w-3/4 h-1 bg-slate-200 rounded-full mb-2"></div>
                <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                <div className="w-5/6 h-1 bg-slate-200 rounded-full"></div>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-[20px] font-black text-slate-900 mb-1">{resume.title || 'Untitled Resume'}</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[13px] font-medium text-slate-500 flex items-center gap-1.5"><User className="w-4 h-4" /> {userName}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-[13px] font-bold text-primary flex items-center gap-1.5"><Target className="w-4 h-4" /> {resume.ats_score || 0} ATS</span>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
                  ${status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
                >
                  {status}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Target & Metadata */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Target & Metadata</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <Briefcase className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[14px] font-black text-slate-900">{resume.target_role || '-'}</div>
                <div className="text-[11px] font-bold text-slate-500">Target Role</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <div className="w-5 h-5 bg-slate-200 rounded mb-2 flex items-center justify-center text-[10px] font-black text-slate-500">🏢</div>
                <div className="text-[14px] font-black text-slate-900">{resume.target_company || '-'}</div>
                <div className="text-[11px] font-bold text-slate-500">Target Company</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <LayoutTemplate className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[14px] font-black text-slate-900">{templateName}</div>
                <div className="text-[11px] font-bold text-slate-500">Template Used</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <Calendar className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[14px] font-black text-slate-900">{format(new Date(resume.updated_at), 'MMM dd, yyyy')}</div>
                <div className="text-[11px] font-bold text-slate-500">Last Modified</div>
              </div>
            </div>
          </div>

          {/* Resume Content Overview */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Content Analysis</h3>
            <div className="space-y-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <div className="text-[13px] font-bold text-slate-700">Experience Entries</div>
                </div>
                <span className="text-[14px] font-black text-slate-900">{experienceEntries}</span>
              </div>
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <div className="text-[13px] font-bold text-slate-700">Education Entries</div>
                </div>
                <span className="text-[14px] font-black text-slate-900">{educationEntries}</span>
              </div>
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-slate-400" />
                  <div className="text-[13px] font-bold text-slate-700">Skills Detected</div>
                </div>
                <span className="text-[14px] font-black text-slate-900">{skillsCount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-3">
          <Button className="w-full text-[13px] h-10 shadow-sm shadow-primary/20">
            Open Full Resume
          </Button>
          <Button variant="outline" className="w-full text-[13px] h-10">
            <Download className="w-4 h-4 mr-2" /> PDF / DOCX
          </Button>
          <button className="col-span-2 flex items-center justify-center gap-2 h-10 text-[13px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2">
            <Trash2 className="w-4 h-4" /> Delete Resume
          </button>
        </div>

      </div>
    </>
  )
}

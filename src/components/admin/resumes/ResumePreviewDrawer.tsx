'use client'

import { X, FileText, Download, Target, Calendar, User, Briefcase, Award, GraduationCap, LayoutTemplate, Trash2 } from 'lucide-react'
import { RESUMES_DATA } from './ResumeTable'
import { Button } from '@/components/ui/Button'

interface ResumePreviewDrawerProps {
  resumeId: number | null;
  onClose: () => void;
}

export function ResumePreviewDrawer({ resumeId, onClose }: ResumePreviewDrawerProps) {
  const resume = RESUMES_DATA.find(r => r.id === resumeId)
  
  if (!resume) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer */}
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
              <h2 className="text-[20px] font-black text-slate-900 mb-1">{resume.name}</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[13px] font-medium text-slate-500 flex items-center gap-1.5"><User className="w-4 h-4" /> {resume.user}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-[13px] font-bold text-primary flex items-center gap-1.5"><Target className="w-4 h-4" /> {resume.ats} ATS</span>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
                  ${resume.type === 'Full-Time' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}
                >
                  {resume.type}
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
                <div className="text-[14px] font-black text-slate-900">{resume.role}</div>
                <div className="text-[11px] font-bold text-slate-500">Target Role</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <div className="w-5 h-5 bg-slate-200 rounded mb-2 flex items-center justify-center text-[10px] font-black text-slate-500">🏢</div>
                <div className="text-[14px] font-black text-slate-900">{resume.company}</div>
                <div className="text-[11px] font-bold text-slate-500">Target Company</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <LayoutTemplate className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[14px] font-black text-slate-900">{resume.template}</div>
                <div className="text-[11px] font-bold text-slate-500">Template Used</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <Calendar className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[14px] font-black text-slate-900">{resume.modified}</div>
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
                <span className="text-[14px] font-black text-slate-900">4</span>
              </div>
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <div className="text-[13px] font-bold text-slate-700">Education Entries</div>
                </div>
                <span className="text-[14px] font-black text-slate-900">2</span>
              </div>
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-slate-400" />
                  <div className="text-[13px] font-bold text-slate-700">Skills Detected</div>
                </div>
                <span className="text-[14px] font-black text-slate-900">24</span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[12px] font-bold text-slate-900 mb-2">Keywords Found</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded">React</span>
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded">TypeScript</span>
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded">Node.js</span>
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded">AWS</span>
                  <span className="px-2 py-1 bg-slate-50 text-slate-600 text-[11px] font-bold rounded">+20 more</span>
                </div>
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

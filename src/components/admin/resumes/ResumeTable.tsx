'use client'

import { MoreHorizontal, FileText, CheckCircle2, Archive, Pencil, Download, Copy, Trash2, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'

interface ResumeTableProps {
  onRowClick: (resumeId: string) => void;
}

export function ResumeTable({ onRowClick }: ResumeTableProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [resumes, setResumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResumes() {
      const supabase = createClient()
      const { data } = await supabase
        .from('resumes')
        .select('*, profiles(full_name)')
        .order('updated_at', { ascending: false })
      
      if (data) setResumes(data)
      setIsLoading(false)
    }
    fetchResumes()
  }, [])

  if (isLoading) {
    return <div className="mt-6 p-8 text-center text-slate-500 font-bold bg-white border border-slate-200 rounded-[18px]">Loading resumes...</div>
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm mt-6 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Preview</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Resume Details</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Target</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">ATS Score</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Timeline</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {resumes.map((resume) => {
              const userName = resume.profiles?.full_name || 'Unknown User'
              const status = resume.status?.toLowerCase() || 'draft'
              
              return (
                <tr 
                  key={resume.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => onRowClick(resume.id)}
                >
                  <td className="px-5 py-3">
                    <div className="w-12 h-16 bg-white border border-slate-200 shadow-sm rounded-md overflow-hidden relative">
                      <div className="absolute inset-0 bg-slate-50 opacity-50 p-1.5 flex flex-col gap-1">
                        <div className="w-1/2 h-1 bg-slate-200 rounded-full"></div>
                        <div className="w-full h-0.5 bg-slate-200 rounded-full mt-1"></div>
                        <div className="w-3/4 h-0.5 bg-slate-200 rounded-full"></div>
                        <div className="w-full h-0.5 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors mb-0.5 flex items-center gap-1.5">
                      {resume.title || 'Untitled Resume'}
                    </div>
                    <div className="text-[12px] font-medium text-slate-500">By {userName}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[13px] font-bold text-slate-900 mb-0.5">{resume.target_company || '-'}</div>
                    <div className="text-[11px] font-bold text-slate-400">{resume.target_role || '-'}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[13px] font-black text-slate-900 flex items-center gap-1">
                      ATS: <span className={resume.ats_score > 89 ? 'text-primary' : resume.ats_score > 69 ? 'text-orange-500' : 'text-red-500'}>{resume.ats_score || 0}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[12px] font-medium text-slate-900 mb-0.5">Mod: {format(new Date(resume.updated_at), 'MMM dd, yyyy')}</div>
                    <div className="text-[11px] font-bold text-slate-400">Add: {format(new Date(resume.created_at), 'MMM dd, yyyy')}</div>
                  </td>
                  <td className="px-5 py-3">
                    {status === 'completed' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-[12px] font-bold border border-green-100"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                    {(status === 'draft' || status === 'in_progress') && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-[12px] font-bold border border-orange-100"><Pencil className="w-3 h-3" /> Draft</span>}
                    {status === 'archived' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[12px] font-bold border border-slate-200"><Archive className="w-3.5 h-3.5" /> Archived</span>}
                  </td>
                  <td className="px-5 py-3 text-right relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveDropdown(activeDropdown === resume.id ? null : resume.id)
                      }} 
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    
                    {activeDropdown === resume.id && (
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20">
                        <button className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Eye className="w-4 h-4 text-slate-400" /> Preview Resume</button>
                        <button className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Download className="w-4 h-4 text-slate-400" /> Download PDF</button>
                        <button className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Copy className="w-4 h-4 text-slate-400" /> Duplicate</button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button className="w-full text-left px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 className="w-4 h-4 text-red-500" /> Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
            {resumes.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-slate-500 font-medium">No resumes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
        <div className="flex items-center gap-4 text-[13px] font-bold text-slate-600">
          <span>Total resumes: {resumes.length}</span>
        </div>
      </div>
    </div>
  )
}

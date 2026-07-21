'use client'

import { MoreHorizontal, FileText, CheckCircle2, Archive, Pencil, Download, Copy, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

export const RESUMES_DATA = [
  { id: 1, name: 'Senior Staff Engineer Resume', user: 'Sarah Jenkins', company: 'Google', role: 'Staff Software Engineer', type: 'Full-Time', ats: '96%', template: 'Modern ATS', created: 'Oct 24, 2023', modified: '2 hours ago', downloads: 12, status: 'Completed', isPremium: true },
  { id: 2, name: 'Cloud Architect C2C', user: 'Michael Chen', company: 'Microsoft', role: 'Cloud Architect', type: 'C2C', ats: '98%', template: 'Executive', created: 'Oct 23, 2023', modified: '5 mins ago', downloads: 45, status: 'Completed', isPremium: true },
  { id: 3, name: 'Frontend Developer V2', user: 'Emily Rodriguez', company: 'Spotify', role: 'Frontend Developer', type: 'Full-Time', ats: '65%', template: 'Creative UI', created: 'Oct 23, 2023', modified: '3 days ago', downloads: 2, status: 'Draft', isPremium: false },
  { id: 4, name: 'Product Manager 2024', user: 'David Smith', company: 'Amazon', role: 'Senior Product Manager', type: 'Full-Time', ats: '88%', template: 'Professional', created: 'Oct 22, 2023', modified: '1 hour ago', downloads: 15, status: 'Completed', isPremium: true },
  { id: 5, name: 'Java Backend Dev', user: 'Aisha Patel', company: 'Infosys', role: 'Backend Developer', type: 'C2C', ats: '94%', template: 'Minimalist', created: 'Oct 21, 2023', modified: 'Just now', downloads: 30, status: 'Archived', isPremium: false },
]

interface ResumeTableProps {
  onRowClick: (resumeId: number) => void;
}

export function ResumeTable({ onRowClick }: ResumeTableProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm mt-6 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Preview</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Resume Details</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Target</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Type & ATS</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Template</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Timeline</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RESUMES_DATA.map((resume) => (
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
                    {resume.name}
                  </div>
                  <div className="text-[12px] font-medium text-slate-500">By {resume.user}</div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-[13px] font-bold text-slate-900 mb-0.5">{resume.company}</div>
                  <div className="text-[11px] font-bold text-slate-400">{resume.role}</div>
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider mb-1
                    ${resume.type === 'Full-Time' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}
                  >
                    {resume.type}
                  </span>
                  <div className="text-[13px] font-black text-slate-900 flex items-center gap-1">
                    ATS: <span className={parseInt(resume.ats) > 89 ? 'text-primary' : parseInt(resume.ats) > 69 ? 'text-orange-500' : 'text-red-500'}>{resume.ats}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-[13px] font-bold text-slate-700 mb-0.5">{resume.template}</div>
                  {resume.isPremium && <span className="text-[10px] font-black text-orange-500 uppercase tracking-wider">Premium</span>}
                </td>
                <td className="px-5 py-3">
                  <div className="text-[12px] font-medium text-slate-900 mb-0.5">Mod: {resume.modified}</div>
                  <div className="text-[11px] font-bold text-slate-400">Add: {resume.created}</div>
                </td>
                <td className="px-5 py-3">
                  {resume.status === 'Completed' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-[12px] font-bold border border-green-100"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                  {resume.status === 'Draft' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-[12px] font-bold border border-orange-100"><Pencil className="w-3 h-3" /> Draft</span>}
                  {resume.status === 'Archived' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[12px] font-bold border border-slate-200"><Archive className="w-3.5 h-3.5" /> Archived</span>}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
        <div className="flex items-center gap-4 text-[13px] font-bold text-slate-600">
          <span>Rows per page:</span>
          <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-primary">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>1-5 of 58,942</span>
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 text-[13px] font-bold text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">Previous</button>
          <button className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-white bg-primary rounded-lg shadow-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">2</button>
          <button className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">3</button>
          <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
          <button className="px-3 py-1.5 text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}

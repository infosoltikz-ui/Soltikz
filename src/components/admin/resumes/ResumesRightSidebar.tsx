'use client'

import { FileText, Target, Crown, Trash2 } from 'lucide-react'

const NOTIFICATIONS = [
  { title: 'Premium Used', desc: 'Emily R. used Executive template', time: '5m ago', bg: 'bg-orange-50 text-orange-500', icon: Crown },
  { title: 'New Creation', desc: '100+ resumes created last hour', time: '12m ago', bg: 'bg-green-50 text-green-500', icon: FileText },
  { title: 'Perfect ATS', desc: 'Michael C. scored 100% ATS', time: '1h ago', bg: 'bg-blue-50 text-blue-500', icon: Target },
  { title: 'Batch Deletion', desc: 'System cleared 500 old drafts', time: '3h ago', bg: 'bg-red-50 text-red-500', icon: Trash2 },
]

export function ResumesRightSidebar() {
  return (
    <aside className="w-[320px] shrink-0 border-l border-slate-100 bg-white flex flex-col h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
      
      {/* Quick Insights */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Quick Insights</h3>
        <div className="space-y-3">
          <div className="p-4 bg-[#FAFAF8] border border-slate-100 rounded-xl flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">Highest Score Today</span>
            <span className="text-[14px] font-black text-primary">100%</span>
          </div>
          <div className="p-4 bg-[#FAFAF8] border border-slate-100 rounded-xl flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">Most Popular Role</span>
            <span className="text-[12px] font-black text-slate-900 truncate max-w-[120px] text-right">Software Eng</span>
          </div>
          <div className="p-4 bg-[#FAFAF8] border border-slate-100 rounded-xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-500">Global Average ATS</span>
              <span className="text-[14px] font-black text-slate-900">91%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[91%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-black text-slate-900">Resume Alerts</h3>
        </div>
        
        <div className="space-y-5">
          {NOTIFICATIONS.map((notif, i) => {
            const Icon = notif.icon
            return (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.bg}`}>
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900 mb-0.5 group-hover:text-primary transition-colors">{notif.title}</div>
                  <div className="text-[11px] font-medium text-slate-500 mb-1">{notif.desc}</div>
                  <div className="text-[10px] font-bold text-slate-400">{notif.time}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </aside>
  )
}

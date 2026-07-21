'use client'

import { FilePlus, Edit3, Target, Download, Trash2 } from 'lucide-react'

const ACTIVITY = [
  { user: 'John D.', action: 'created new resume', item: 'Software Engineer 2024', time: '10 mins ago', icon: FilePlus, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
  { user: 'Sarah M.', action: 'ran ATS optimization', item: 'Marketing Manager V2', time: '24 mins ago', icon: Target, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  { user: 'Rahul K.', action: 'downloaded PDF', item: 'Data Scientist', time: '1 hour ago', icon: Download, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
  { user: 'Emily R.', action: 'updated experience section', item: 'Product Design Lead', time: '2 hours ago', icon: Edit3, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
  { user: 'Michael C.', action: 'deleted draft resume', item: 'Untitled Resume', time: '4 hours ago', icon: Trash2, color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
]

export function ResumeActivityTimeline() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent Resume Activity</h3>
          <p className="text-[13px] font-medium text-slate-500">Live platform events</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View Full Log</button>
      </div>

      <div className="relative pl-4 space-y-8 before:content-[''] before:absolute before:left-[35px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
        {ACTIVITY.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="relative flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 border-2 ${item.bg}`}>
                <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={2.5} />
              </div>
              <div className="pt-2">
                <p className="text-[14px] text-slate-700">
                  <span className="font-bold text-slate-900">{item.user}</span> {item.action} <span className="font-bold text-slate-900">"{item.item}"</span>
                </p>
                <span className="text-[11px] font-bold text-slate-400 mt-1 block">{item.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

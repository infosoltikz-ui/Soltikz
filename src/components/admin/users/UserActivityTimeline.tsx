'use client'

import { UserPlus, FileText, ArrowUpCircle, Download, UserCheck } from 'lucide-react'

const ACTIVITY = [
  { user: 'John D.', action: 'registered new account', time: '10 mins ago', icon: UserPlus, color: 'text-primary', bg: 'bg-green-50' },
  { user: 'Sarah M.', action: 'created ATS Resume', time: '24 mins ago', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
  { user: 'Rahul K.', action: 'downloaded Resume (PDF)', time: '1 hour ago', icon: Download, color: 'text-slate-600', bg: 'bg-slate-100' },
  { user: 'Emily R.', action: 'upgraded to Pro Plan', time: '2 hours ago', icon: ArrowUpCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
  { user: 'Michael C.', action: 'verified email address', time: '4 hours ago', icon: UserCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
]

export function UserActivityTimeline() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent User Activity</h3>
          <p className="text-[13px] font-medium text-slate-500">Live platform events</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View All</button>
      </div>

      <div className="relative pl-4 space-y-8 before:content-[''] before:absolute before:left-[35px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
        {ACTIVITY.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="relative flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 border-4 border-white ${item.bg}`}>
                <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={2.5} />
              </div>
              <div className="pt-2">
                <p className="text-[14px] text-slate-700">
                  <span className="font-bold text-slate-900">{item.user}</span> {item.action}
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

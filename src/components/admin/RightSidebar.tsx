'use client'

import { Calendar as CalendarIcon, Bell, CreditCard, FileText, Settings, Zap } from 'lucide-react'

const NOTIFICATIONS = [
  { title: 'New Premium User', time: '5m ago', icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50' },
  { title: 'Payment Received', time: '12m ago', icon: DollarSignIcon, color: 'text-green-500', bg: 'bg-green-50' },
  { title: 'New Resume Created', time: '1h ago', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
  { title: 'Template Updated', time: '3h ago', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-100' },
  { title: 'AI Credits Refilled', time: '5h ago', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50' },
]

function DollarSignIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  )
}

export function RightSidebar() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <aside className="w-[320px] shrink-0 border-l border-slate-100 bg-white flex flex-col h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
      
      {/* Calendar Widget */}
      <div className="p-6 border-b border-slate-100">
        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-primary" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-black text-slate-600 rounded-md uppercase tracking-wider">Today</span>
          </div>
          <div className="text-[16px] font-black text-slate-900 mb-1">{currentDate}</div>
          <div className="text-[12px] font-bold text-slate-500">3 Upcoming Tasks</div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="p-6 border-b border-slate-100 flex-1">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-black text-slate-900">Recent Activity</h3>
          <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View All</button>
        </div>
        
        <div className="space-y-5">
          {NOTIFICATIONS.map((notif, i) => {
            const Icon = notif.icon
            return (
              <div key={i} className="flex gap-4 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.bg}`}>
                  <Icon className={`w-4 h-4 ${notif.color}`} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900 mb-0.5 group-hover:text-primary transition-colors">{notif.title}</div>
                  <div className="text-[11px] font-bold text-slate-400">{notif.time}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Admin Notes */}
      <div className="p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Admin Notes</h3>
        <div className="space-y-3">
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
            <div className="text-[12px] font-black text-slate-900 mb-1">Today's Growth</div>
            <div className="text-[11px] font-medium text-slate-600">User registrations are up 15% compared to yesterday. Keep an eye on server load.</div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="text-[12px] font-black text-slate-900 mb-1">Pending Reviews</div>
            <div className="text-[11px] font-medium text-slate-600">3 new templates require approval before going live.</div>
          </div>
        </div>
      </div>

    </aside>
  )
}

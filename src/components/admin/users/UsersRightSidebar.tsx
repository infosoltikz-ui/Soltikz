'use client'

import { UserPlus, Download, Bell, Plus, Users, Send } from 'lucide-react'

const NOTIFICATIONS = [
  { title: 'New Registration', desc: 'Sarah J. joined via organic search', time: '5m ago', bg: 'bg-green-50 text-green-500', icon: UserPlus },
  { title: 'Payment Success', desc: 'Tech Corp LLC upgraded to Enterprise', time: '12m ago', bg: 'bg-orange-50 text-orange-500', icon: Download },
  { title: 'User Blocked', desc: 'System auto-blocked suspicious IP', time: '1h ago', bg: 'bg-red-50 text-red-500', icon: Bell },
]

export function UsersRightSidebar() {
  return (
    <aside className="w-[320px] shrink-0 border-l border-slate-100 bg-white flex flex-col h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
      
      {/* Quick Insights */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Quick Insights</h3>
        <div className="space-y-3">
          <div className="p-4 bg-[#FAFAF8] border border-slate-100 rounded-xl flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">New This Week</span>
            <span className="text-[14px] font-black text-slate-900">+482</span>
          </div>
          <div className="p-4 bg-[#FAFAF8] border border-slate-100 rounded-xl flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">Top Country</span>
            <span className="text-[14px] font-black text-slate-900 flex items-center gap-1.5"><span className="text-[16px]">🇺🇸</span> USA</span>
          </div>
          <div className="p-4 bg-[#FAFAF8] border border-slate-100 rounded-xl flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">Most Downloaded</span>
            <span className="text-[12px] font-black text-primary">Modern ATS</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-black text-slate-900">User Notifications</h3>
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

      {/* Quick Actions */}
      <div className="p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <Plus className="w-4 h-4 text-slate-400" /> Create User
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <Users className="w-4 h-4 text-slate-400" /> Export All Users
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-primary/10 border border-transparent rounded-xl text-[13px] font-bold text-primary hover:bg-primary/20 transition-all">
            <Send className="w-4 h-4" /> Send Announcement
          </button>
        </div>
      </div>

    </aside>
  )
}

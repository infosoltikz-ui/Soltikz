'use client'

import { Search, Bell, MessageSquare, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export function AdminHeader() {
  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
      
      {/* Title */}
      <div>
        <h1 className="text-[22px] font-black text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-[13px] font-medium text-slate-500 mt-0.5">Welcome back, Admin. Here's your platform overview.</p>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        
        {/* Search */}
        <div className="relative w-64 hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Global search..." 
            className="pl-9 h-10 bg-[#FAFAF8] border-slate-200 rounded-xl text-[13px] focus:bg-white transition-colors"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors relative shadow-sm">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors relative shadow-sm">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-100 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-[13px] font-black text-primary">AD</span>
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-[13px] font-bold text-slate-900">Admin User</div>
            <div className="text-[11px] font-medium text-slate-500">Super Admin</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>

      </div>
    </header>
  )
}

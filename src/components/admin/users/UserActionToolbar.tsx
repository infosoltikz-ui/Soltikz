'use client'

import { Search, Filter, Download, UserPlus, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function UserActionToolbar() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-4 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 mt-6">
      
      {/* Search */}
      <div className="relative w-full xl:w-64 group shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search by Name, Email, Mobile..." 
          className="pl-9 h-10 bg-[#FAFAF8] border-slate-200 rounded-xl text-[13px] focus:bg-white transition-colors w-full"
        />
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 xl:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full xl:w-auto">
        
        <select className="h-9 px-2.5 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[12px] font-bold rounded-lg outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer appearance-none whitespace-nowrap shrink-0">
          <option value="">All Plans</option>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>

        <select className="h-9 px-2.5 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[12px] font-bold rounded-lg outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer appearance-none whitespace-nowrap shrink-0">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
          <option value="pending">Pending Verification</option>
        </select>

        <select className="h-9 px-2.5 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[12px] font-bold rounded-lg outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer appearance-none whitespace-nowrap shrink-0">
          <option value="">Sort By: Newest</option>
          <option value="oldest">Sort By: Oldest</option>
          <option value="active">Sort By: Most Active</option>
          <option value="premium">Sort By: Premium First</option>
        </select>

        <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block shrink-0"></div>

        <button className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Refresh
        </button>

        <button className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export CSV
        </button>

        <Button 
          leftIcon={<UserPlus className="w-3.5 h-3.5" />}
          className="h-9 px-3 rounded-lg text-[12px] font-bold shadow-sm shadow-primary/20 whitespace-nowrap shrink-0"
        >
          Add User
        </Button>
      </div>

    </div>
  )
}

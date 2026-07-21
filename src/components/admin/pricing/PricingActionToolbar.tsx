'use client'

import { Search, Plus, Download, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export function PricingActionToolbar() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-4 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 mt-6">
      
      {/* Search */}
      <div className="relative w-full xl:w-64 group shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search Plans..." 
          className="pl-9 h-10 bg-[#FAFAF8] border-slate-200 rounded-xl text-[13px] focus:bg-white transition-colors w-full"
        />
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 xl:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full xl:w-auto">
        
        <button className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm hidden sm:flex whitespace-nowrap shrink-0">
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Refresh
        </button>

        <button className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm hidden sm:flex whitespace-nowrap shrink-0">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export Pricing
        </button>

        <button className="h-9 px-3 bg-primary border border-transparent rounded-lg text-[12px] font-bold text-white flex flex-row flex-nowrap items-center gap-1.5 hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 whitespace-nowrap shrink-0">
          <Plus className="w-3.5 h-3.5 shrink-0" /> 
          <span className="whitespace-nowrap shrink-0">Create New Plan</span>
        </button>
      </div>

    </div>
  )
}

import { Plus, Upload, Sparkles, Download, Search, Filter, ArrowUpDown, LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function ResumeToolbar() {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            className="h-10 text-[13px] font-bold rounded-xl px-5 shadow-sm hover:shadow-md"
            leftIcon={<Plus className="w-4 h-4" strokeWidth={2.5} />}
          >
            Create New Resume
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search resumes..." 
              className="pl-9 h-10 bg-slate-50/50 border-transparent rounded-xl text-[13px] focus-visible:bg-white"
            />
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
          <button className="h-10 px-4 flex items-center gap-2 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-50">
            <Filter className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
            Filter by
          </button>
          <button className="h-10 px-4 flex items-center gap-2 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-50">
            <ArrowUpDown className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
            Sort by
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-900">
            <LayoutGrid className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 transition-colors">
            <List className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

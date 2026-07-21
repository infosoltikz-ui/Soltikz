'use client'

import { useState } from 'react'
import { Briefcase, FileText, CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export function ResumeTypeSelector() {
  const [selectedType, setSelectedType] = useState<'fulltime' | 'c2c'>('fulltime')

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-[18px] font-black text-slate-900 mb-1">Step 1: Select Resume Type</h2>
        <p className="text-[13px] font-medium text-slate-500">Choose the type of resume you want to create</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Full Time Toggle */}
        <button 
          onClick={() => setSelectedType('fulltime')}
          className={cn(
            "relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group flex items-start gap-4",
            selectedType === 'fulltime' 
              ? "border-primary bg-primary/5" 
              : "border-slate-200 hover:border-primary/40 bg-white"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            selectedType === 'fulltime' ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:text-primary group-hover:bg-primary/10"
          )}>
            <Briefcase className="w-6 h-6" strokeWidth={2} />
          </div>
          <div className="flex-1 mt-1">
            <h3 className="text-[15px] font-black text-slate-900 mb-1">Full Time</h3>
            <p className="text-[13px] font-medium text-slate-500">For full-time job applications</p>
          </div>
          
          {selectedType === 'fulltime' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
              <CheckCircle2 className="w-6 h-6" fill="currentColor" stroke="white" strokeWidth={1} />
            </div>
          )}
        </button>

        {/* C2C Toggle */}
        <button 
          onClick={() => setSelectedType('c2c')}
          className={cn(
            "relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group flex items-start gap-4",
            selectedType === 'c2c' 
              ? "border-orange-500 bg-orange-50" 
              : "border-slate-200 hover:border-orange-500/40 bg-white"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            selectedType === 'c2c' ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-500/10"
          )}>
            <FileText className="w-6 h-6" strokeWidth={2} />
          </div>
          <div className="flex-1 mt-1">
            <h3 className="text-[15px] font-black text-slate-900 mb-1">C2C (Contract to Hire)</h3>
            <p className="text-[13px] font-medium text-slate-500">For contract or freelance roles</p>
          </div>
          
          {selectedType === 'c2c' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
              <CheckCircle2 className="w-6 h-6" fill="currentColor" stroke="white" strokeWidth={1} />
            </div>
          )}
        </button>

      </div>
    </div>
  )
}

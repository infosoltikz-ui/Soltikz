'use client'

import { Save, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function SettingsBottomActionBar() {
  return (
    <div className="sticky bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 px-8 mt-12 flex items-center justify-between z-40">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-[13px] font-bold text-red-600 hover:text-red-700 transition-colors">
          <RotateCcw className="w-4 h-4" /> Restore Default Settings
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" className="h-10 px-6 text-[13px]">
          <X className="w-4 h-4 mr-2" /> Cancel
        </Button>
        <Button className="h-10 px-8 text-[13px] shadow-sm shadow-primary/20">
          <Save className="w-4 h-4 mr-2" /> Save All Changes
        </Button>
      </div>
    </div>
  )
}

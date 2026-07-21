'use client'

import { Input } from '@/components/ui/Input'
import { HardDrive } from 'lucide-react'

export function StorageSettings() {
  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">Storage Settings</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Configure where user assets, generated PDFs, and profile images are stored.</p>
      </div>

      <div className="space-y-8">
        
        {/* Provider */}
        <div>
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Storage Provider</h3>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer">
              <input type="radio" name="storage_provider" className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">AWS S3</span>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border-2 border-primary rounded-xl cursor-pointer shadow-sm">
              <input type="radio" name="storage_provider" defaultChecked className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">Cloudinary</span>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer">
              <input type="radio" name="storage_provider" className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">Supabase Storage</span>
            </label>
          </div>
        </div>

        {/* Current Usage */}
        <div className="bg-[#FAFAF8] border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
              <HardDrive className="w-4 h-4 text-slate-400" /> Current Storage Usage
            </div>
            <div className="text-[13px] font-black text-slate-900">45 GB / 500 GB</div>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-[9%]"></div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 mt-3">You are using 9% of your Cloudinary monthly bandwidth allowance.</p>
        </div>

        {/* Upload Constraints */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Upload Constraints</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Max Upload Size (MB)</label>
              <Input type="number" defaultValue="5" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-3">Allowed File Types</label>
            <div className="flex flex-wrap gap-3">
              {['PDF', 'DOCX', 'PNG', 'JPG'].map(type => (
                <label key={type} className="flex items-center gap-2 p-3 bg-[#FAFAF8] border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="text-[12px] font-bold text-slate-700">.{type.toLowerCase()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

'use client'

import { Input } from '@/components/ui/Input'
import { UploadCloud, Image as ImageIcon } from 'lucide-react'

export function BrandingSettings() {
  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">Branding</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Customize the visual identity of the platform.</p>
      </div>

      <div className="space-y-8">
        
        {/* Logos */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-3">Company Logo</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-[#FAFAF8] hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-1">Upload Logo</h4>
              <p className="text-[11px] font-medium text-slate-500">SVG, PNG, or JPG (max 2MB)</p>
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-3">Favicon</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-[#FAFAF8] hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-1">Upload Icon</h4>
              <p className="text-[11px] font-medium text-slate-500">16x16 or 32x32 ICO/PNG</p>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Primary Color</label>
              <div className="flex gap-2">
                <div className="w-11 h-11 rounded-xl bg-primary shadow-sm shrink-0"></div>
                <Input defaultValue="#16A34A" className="h-11 bg-[#FAFAF8] border-slate-200 font-mono text-[13px]" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Secondary Color</label>
              <div className="flex gap-2">
                <div className="w-11 h-11 rounded-xl bg-[#F97316] shadow-sm shrink-0"></div>
                <Input defaultValue="#F97316" className="h-11 bg-[#FAFAF8] border-slate-200 font-mono text-[13px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Text & Naming</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Platform Name</label>
              <Input defaultValue="Soltikz AI ATS Resume Builder" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Email Footer Name</label>
              <Input defaultValue="Soltikz Technologies Inc." className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

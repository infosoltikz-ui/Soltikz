'use client'

import { Input } from '@/components/ui/Input'

export function GeneralSettings() {
  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">General Settings</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Configure your primary business information and localizations.</p>
      </div>

      <div className="space-y-6">
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Company Name</label>
            <Input defaultValue="Soltikz AI" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Company Website</label>
            <Input defaultValue="https://soltikz.com" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Support Email</label>
            <Input defaultValue="support@soltikz.com" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Support Phone</label>
            <Input defaultValue="+1 (800) 123-4567" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-black text-slate-900 mb-2">Company Address</label>
          <textarea 
            defaultValue="123 Innovation Drive, Tech District, San Francisco, CA 94105"
            className="w-full h-24 px-4 py-3 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] text-slate-900 outline-none focus:border-primary focus:bg-white transition-colors resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Timezone</label>
            <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
              <option>(GMT-08:00) Pacific Time</option>
              <option>(GMT-05:00) Eastern Time</option>
              <option>(GMT+00:00) UTC</option>
              <option>(GMT+05:30) India Standard Time</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Default Language</label>
            <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  )
}

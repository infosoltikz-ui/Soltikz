'use client'

import { Input } from '@/components/ui/Input'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export function GeneralSettings() {
  const [settings, setSettings] = useState<any>({
    companyName: 'Soltikz AI',
    companyWebsite: 'https://soltikz.com',
    supportEmail: 'support@soltikz.com',
    supportPhone: '+1 (800) 123-4567',
    companyAddress: '123 Innovation Drive, Tech District, San Francisco, CA 94105',
    timezone: '(GMT-08:00) Pacific Time',
    defaultLanguage: 'English (US)'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      const supabase = createClient()
      const { data } = await supabase
        .from('system_settings')
        .select('metadata')
        .eq('id', 'GLOBAL_CONFIG')
        .single()
      
      if (data && data.metadata) {
        setSettings({ ...settings, ...data.metadata })
      }
      setIsLoading(false)
    }
    fetchSettings()
  }, [])

  if (isLoading) {
    return <div className="max-w-3xl animate-in fade-in duration-300">Loading settings...</div>
  }

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
            <Input defaultValue={settings.companyName} className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Company Website</label>
            <Input defaultValue={settings.companyWebsite} className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Support Email</label>
            <Input defaultValue={settings.supportEmail} className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Support Phone</label>
            <Input defaultValue={settings.supportPhone} className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-black text-slate-900 mb-2">Company Address</label>
          <textarea 
            defaultValue={settings.companyAddress}
            className="w-full h-24 px-4 py-3 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] text-slate-900 outline-none focus:border-primary focus:bg-white transition-colors resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Timezone</label>
            <select defaultValue={settings.timezone} className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
              <option value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific Time</option>
              <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
              <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
              <option value="(GMT+05:30) India Standard Time">(GMT+05:30) India Standard Time</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Default Language</label>
            <select defaultValue={settings.defaultLanguage} className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
              <option value="English (US)">English (US)</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  )
}

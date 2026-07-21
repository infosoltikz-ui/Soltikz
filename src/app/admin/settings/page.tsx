'use client'

import { useState } from 'react'

import { SettingsNavigation } from '@/components/admin/settings/SettingsNavigation'
import { GeneralSettings } from '@/components/admin/settings/forms/GeneralSettings'
import { BrandingSettings } from '@/components/admin/settings/forms/BrandingSettings'
import { AuthSettings } from '@/components/admin/settings/forms/AuthSettings'
import { EmailSettings } from '@/components/admin/settings/forms/EmailSettings'

import { SystemHealthCards } from '@/components/admin/settings/SystemHealthCards'
import { RecentSystemActivity } from '@/components/admin/settings/RecentSystemActivity'
import { SettingsBottomActionBar } from '@/components/admin/settings/SettingsBottomActionBar'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const renderForm = () => {
    switch(activeTab) {
      case 'general': return <GeneralSettings />
      case 'branding': return <BrandingSettings />
      case 'auth': return <AuthSettings />
      case 'email': return <EmailSettings />
      default: return <GeneralSettings />
    }
  }

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen relative">
      
      {/* Main Center Content */}
      <div className="flex-1 p-8 pb-0 overflow-x-hidden flex flex-col min-h-screen">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[22px] font-black text-slate-900 tracking-tight">Platform Settings</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5">Manage company branding, platform configuration, integrations, security, and administrator preferences.</p>
        </div>

        {/* Settings Layout */}
        <div className="flex gap-12 flex-1">
          
          {/* Left Vertical Navigation */}
          <SettingsNavigation activeTab={activeTab} onChange={setActiveTab} />

          {/* Right Configuration Area */}
          <div className="flex-1">
            
            {/* Dynamic Form View */}
            <div className="min-h-[600px]">
              {renderForm()}
            </div>

            {/* Global Bottom Sections (always visible below forms) */}
            <SystemHealthCards />
            <RecentSystemActivity />

            {/* Footer */}
            <footer className="mt-12 pt-8 pb-32 border-t border-slate-100 flex items-center justify-between gap-4 text-[12px] font-bold text-slate-400">
              <div>Soltikz Admin Portal v1.0 • Settings Module</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-slate-600 transition-colors">Documentation</a>
                <a href="#" className="hover:text-slate-600 transition-colors">API Reference</a>
                <a href="#" className="hover:text-slate-600 transition-colors">Support Ticket</a>
              </div>
            </footer>
            
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 ml-64 z-50">
        <SettingsBottomActionBar />
      </div>

    </div>
  )
}

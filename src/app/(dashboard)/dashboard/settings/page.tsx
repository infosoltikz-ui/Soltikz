'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { SettingsSidebar } from '@/components/dashboard/settings/SettingsSidebar'
import { SettingsTabs, TabId } from '@/components/dashboard/settings/SettingsTabs'

// Tab Contents
import { AccountTab } from '@/components/dashboard/settings/tabs/AccountTab'
import { ProfileTab } from '@/components/dashboard/settings/tabs/ProfileTab'
import { BillingTab } from '@/components/dashboard/settings/tabs/BillingTab'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('account')

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 md:px-8 pt-8 pb-24 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <DashboardHeader 
        title="Settings" 
        subtitle="Manage your account, security, preferences, and subscription from one place." 
      />

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 max-w-5xl mx-auto w-full">
          
          <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Dynamic Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'account' && <AccountTab />}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'billing' && <BillingTab />}
          </div>
          
        </div>

        {/* Right Sidebar */}
        <SettingsSidebar />

      </div>

    </div>
  )
}

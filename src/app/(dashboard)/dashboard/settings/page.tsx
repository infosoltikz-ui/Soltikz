'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { SettingsSidebar } from '@/components/dashboard/settings/SettingsSidebar'
import { SettingsTabs, TabId } from '@/components/dashboard/settings/SettingsTabs'

// Tab Contents
import { AccountTab } from '@/components/dashboard/settings/tabs/AccountTab'
import { BillingTab } from '@/components/dashboard/settings/tabs/BillingTab'

const VALID_TABS: TabId[] = ['account', 'billing']

function SettingsContent() {
  const searchParams = useSearchParams()
  const requestedTab = searchParams.get('tab') as TabId | null
  const initialTab = requestedTab && VALID_TABS.includes(requestedTab) ? requestedTab : 'account'
  const initialYearly = searchParams.get('period') === 'yearly'

  const [activeTab, setActiveTab] = useState<TabId>(initialTab)

  return (
    <div className="flex flex-col xl:flex-row gap-8">

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 max-w-5xl mx-auto w-full">

        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'account' && <AccountTab />}
          {activeTab === 'billing' && <BillingTab initialYearly={initialYearly} />}
        </div>

      </div>

      {/* Right Sidebar */}
      <SettingsSidebar />

    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 md:px-8 pt-8 pb-24 max-w-[1600px] mx-auto">

      {/* Header */}
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account, security, preferences, and subscription from one place."
      />

      <Suspense fallback={null}>
        <SettingsContent />
      </Suspense>

    </div>
  )
}

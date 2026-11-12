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
    <div className="flex flex-col xl:flex-row gap-6 items-start">

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 w-full">

        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Tab Content */}
        <div className="min-h-[540px]">
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
    <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-14 max-w-[1540px] mx-auto">

      {/* Header */}
      <DashboardHeader
        eyebrow="Workspace & Billing"
        title="Settings"
        subtitle="Manage your account details, security preferences, and Pro subscription."
      />

      <Suspense
        fallback={
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 animate-pulse h-80" />
        }
      >
        <SettingsContent />
      </Suspense>

    </div>
  )
}

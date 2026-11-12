'use client'

import { User, CreditCard } from 'lucide-react'
import { cn } from '@/utils/cn'

export type TabId = 'account' | 'billing'

interface SettingsTabsProps {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}

const TABS: { id: TabId; label: string; description: string; icon: typeof User }[] = [
  {
    id: 'account',
    label: 'Account Details',
    description: 'Identity & contact profile',
    icon: User,
  },
  {
    id: 'billing',
    label: 'Plan & Billing',
    description: 'Credits & Pro membership',
    icon: CreditCard,
  },
]

export function SettingsTabs({ activeTab, setActiveTab }: SettingsTabsProps) {
  return (
    <div className="mb-6">
      <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'group flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer',
                isActive
                  ? 'bg-[#0F2744] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-[#F8FAFC] hover:text-[#0F2744]'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                  isActive
                    ? 'bg-white/10 text-[#F59E0B]'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-[#EEF4FA] group-hover:text-[#0F2744]'
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={2.2} />
              </div>
              <div>
                <div
                  className={cn(
                    'text-[13.5px] font-bold leading-tight',
                    isActive ? 'text-white' : 'text-slate-900'
                  )}
                >
                  {tab.label}
                </div>
                <div
                  className={cn(
                    'text-[11px] font-medium leading-tight mt-0.5 hidden sm:block',
                    isActive ? 'text-slate-300' : 'text-slate-400'
                  )}
                >
                  {tab.description}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

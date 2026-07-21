import { cn } from '@/utils/cn'

export type TabId = 'account' | 'profile' | 'billing'

interface SettingsTabsProps {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'account', label: 'Account' },
  { id: 'profile', label: 'Profile' },
  { id: 'billing', label: 'Billing' }
]

export function SettingsTabs({ activeTab, setActiveTab }: SettingsTabsProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar border-b border-slate-200 mb-8">
      <div className="flex items-center min-w-max px-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-4 text-[14px] font-bold transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {tab.label}
              
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

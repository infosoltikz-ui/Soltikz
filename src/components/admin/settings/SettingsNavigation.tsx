'use client'

import { Settings, Palette, Shield, Mail, BrainCircuit, HardDrive, CreditCard, Lock, Sliders } from 'lucide-react'

export const SETTINGS_TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'auth', label: 'Authentication', icon: Shield },
  { id: 'email', label: 'Email & Notifications', icon: Mail },
]

interface SettingsNavigationProps {
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function SettingsNavigation({ activeTab, onChange }: SettingsNavigationProps) {
  return (
    <nav className="w-64 shrink-0 flex flex-col gap-1">
      {SETTINGS_TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}

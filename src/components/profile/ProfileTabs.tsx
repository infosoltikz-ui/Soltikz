'use client'

import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderOpen,
  Award,
  Eye,
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  onPreview?: () => void
  counts?: {
    employment?: number
    education?: number
    skills?: number
    projects?: number
    certifications?: number
  }
}

export function ProfileTabs({
  activeTab,
  onTabChange,
  onPreview,
  counts,
}: ProfileTabsProps) {
  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User, count: null },
    { id: 'employment', label: 'Experience', icon: Briefcase, count: counts?.employment },
    { id: 'education', label: 'Education', icon: GraduationCap, count: counts?.education },
    { id: 'projects', label: 'Projects', icon: FolderOpen, count: counts?.projects },
    { id: 'certifications', label: 'Certifications', icon: Award, count: counts?.certifications },
    { id: 'skills', label: 'Skills & Tech', icon: Wrench, count: counts?.skills },
  ]

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-6">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-1.5 flex overflow-x-auto hide-scrollbar gap-1 shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-[12.5px] sm:text-[13px] whitespace-nowrap transition-all duration-150 cursor-pointer',
                isActive
                  ? 'bg-[#0F2744] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0F2744] hover:bg-slate-100/80'
              )}
            >
              <Icon
                className={cn('w-3.5 h-3.5', isActive ? 'text-[#F59E0B]' : 'text-slate-400')}
                strokeWidth={2.2}
              />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded-md text-[10px] font-extrabold tabular-nums leading-none',
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'bg-[#EEF4FA] text-[#0F2744]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {onPreview && (
        <div className="shrink-0 self-end xl:self-auto">
          <button
            onClick={onPreview}
            className="h-10 px-4 text-xs font-extrabold bg-white hover:bg-[#EEF4FA] text-slate-700 hover:text-[#0F2744] border border-slate-200/90 hover:border-[#0F2744]/25 rounded-xl shadow-xs inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#0F2744]" />
            <span>View Full Dossier</span>
          </button>
        </div>
      )}
    </div>
  )
}

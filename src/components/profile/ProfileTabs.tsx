'use client'

import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  FolderOpen, 
  Award,
  Eye
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
  counts
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
      {/* Tabs container */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-1 flex overflow-x-auto hide-scrollbar gap-1 shadow-2xs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-semibold text-[12.5px] sm:text-[13px] whitespace-nowrap transition-all duration-150 cursor-pointer",
                isActive
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-slate-500")} strokeWidth={2} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Action Button */}
      {onPreview && (
        <div className="shrink-0 self-end xl:self-auto">
          <button
            onClick={onPreview}
            className="h-9 px-3.5 text-[12.5px] font-semibold bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            Preview Dossier
          </button>
        </div>
      )}
    </div>
  )
}

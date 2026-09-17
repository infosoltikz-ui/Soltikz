import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  FolderOpen, 
  Award,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function ProfileTabs({
  activeTab,
  onTabChange,
  onPreview
}: {
  activeTab: string,
  onTabChange: (tabId: string) => void,
  onPreview?: () => void
}) {
  const tabs = [
    { id: 'personal', label: 'Personal & Contact', icon: User },
    { id: 'employment', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Tools', icon: Wrench },
    { id: 'projects', label: 'Key Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ]

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
      {/* Tabs container */}
      <div className="bg-white border border-slate-200 rounded-xl p-1 flex overflow-x-auto hide-scrollbar gap-1 shadow-2xs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-[13px] whitespace-nowrap transition-all duration-150 cursor-pointer",
                isActive
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-slate-500")} strokeWidth={2} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Action Button */}
      <div className="shrink-0">
        <button
          onClick={onPreview}
          className="h-10 px-4 text-[13px] font-semibold bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl shadow-2xs inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4 text-slate-500" />
          Preview Complete Profile
        </button>
      </div>
    </div>
  )
}

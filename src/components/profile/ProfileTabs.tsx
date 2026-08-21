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
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'employment', label: 'Employment Details', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'skills', label: 'Skills', icon: Wrench },
  ]

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
      {/* Tabs container */}
      <div className="bg-slate-100/80 rounded-2xl p-1.5 flex overflow-x-auto hide-scrollbar gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] whitespace-nowrap transition-all duration-200",
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm border border-slate-200/60"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <Icon className="w-4 h-4" strokeWidth={2.5} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Action Button */}
      <div className="shrink-0">
        <Button
          onClick={onPreview}
          className="h-11 px-6 text-[13px] font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 rounded-xl"
          leftIcon={<Eye className="w-4 h-4" />}
        >
          Preview Full Profile
        </Button>
      </div>
    </div>
  )
}

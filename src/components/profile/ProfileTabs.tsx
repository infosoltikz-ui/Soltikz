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
  onTabChange 
}: { 
  activeTab: string, 
  onTabChange: (tabId: string) => void 
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
    <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-slate-200 mb-8 gap-4">
      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-4 border-b-2 font-bold text-[13px] whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary" 
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <Icon className="w-4 h-4" strokeWidth={2.5} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Action Button */}
      <div className="pb-4 xl:pb-0 shrink-0">
        <Button className="h-10 px-5 text-[13px] font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 rounded-xl" leftIcon={<Eye className="w-4 h-4" />}>
          Preview Full Profile
        </Button>
      </div>
    </div>
  )
}

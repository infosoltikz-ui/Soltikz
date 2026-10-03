import { FileText, Sparkles, Send, FileStack, Pencil, DownloadCloud, UserCircle, ShieldAlert, Key, Target, LayoutDashboard, SearchCheck, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  FileText, Sparkles, Send, FileStack, Pencil, DownloadCloud,
  UserCircle, ShieldAlert, Key, Target, LayoutDashboard, SearchCheck,
}

interface WorkflowStep {
  title: string
  description: string
  iconName: keyof typeof iconMap
}

interface ModuleHowItWorksProps {
  steps: WorkflowStep[]
}

export function ModuleHowItWorks({ steps }: ModuleHowItWorksProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-2xs p-2 sm:p-2.5 mb-5">
      <nav aria-label="Module Workflow" className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5">
        {steps.map((step, index) => {
          const Icon = iconMap[step.iconName]
          const badge = `Step 0${index + 1}`

          return (
            <div
              key={index}
              className="relative rounded-lg p-2.5 px-3 flex items-center gap-2.5 border bg-slate-50/90 border-slate-200/80 overflow-hidden"
            >
              {/* Icon */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xs">
                {Icon && <Icon className="w-3.5 h-3.5" />}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 leading-none mb-0.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 rounded-md border text-emerald-700 bg-emerald-100/80 border-emerald-200">
                    {badge}
                  </span>
                </div>
                <h3 className="text-[12.5px] font-bold tracking-tight truncate leading-snug text-slate-900">
                  {step.title}
                </h3>
                <p className="text-[10.5px] font-medium leading-none text-slate-400 truncate">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

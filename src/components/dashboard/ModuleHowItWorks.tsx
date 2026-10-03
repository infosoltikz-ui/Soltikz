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
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-xs p-4 sm:p-5 mb-8">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="h-5 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" />
        <h3 className="text-[14px] font-black text-slate-800 tracking-tight">How it works</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, index) => {
          const Icon = iconMap[step.iconName]
          return (
            <div
              key={index}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs relative overflow-hidden group hover:border-emerald-300 transition-all duration-300"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="w-10 h-10 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 shadow-inner relative z-10 group-hover:scale-105 transition-transform duration-300">
                {Icon && <Icon className="w-5 h-5" />}
              </div>
              <div className="relative z-10">
                <div className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-wider mb-0.5">
                  Step 0{index + 1}
                </div>
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight mb-1">{step.title}</h4>
                <p className="text-[12px] font-medium text-slate-500 leading-snug">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

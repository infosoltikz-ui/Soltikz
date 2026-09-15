import { FileEdit, Folder, User, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

const actions = [
  {
    title: 'Create Tailored Resume',
    desc: 'Generate a new ATS-matched resume from a JD',
    icon: FileEdit,
    href: '/dashboard/create'
  },
  {
    title: 'Resume Library',
    desc: 'Access and download all generated resumes',
    icon: Folder,
    href: '/dashboard/resumes'
  },
  {
    title: 'Master Profile',
    desc: 'Update your career history, skills & certifications',
    icon: User,
    href: '/dashboard/profile'
  },
  {
    title: 'Plans & Billing',
    desc: 'Manage Pro subscription & AI generation limits',
    icon: ShieldCheck,
    href: '/dashboard/pricing'
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition-colors">
      <div className="pb-3 mb-4 border-b border-slate-100">
        <h3 className="text-[14px] font-bold text-slate-900">Quick Navigation</h3>
        <p className="text-[11px] text-slate-500 font-medium">Frequently used workspace tools</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.title}
              href={action.href}
              className="p-3.5 rounded-lg border border-slate-200/80 hover:border-slate-300 bg-slate-50/40 hover:bg-slate-50 transition-all group block"
            >
              <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center mb-2.5 text-slate-700 group-hover:text-primary group-hover:border-primary/30 transition-colors shadow-2xs">
                <Icon className="w-4 h-4" strokeWidth={2} />
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-0.5 group-hover:text-primary transition-colors">
                {action.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                {action.desc}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

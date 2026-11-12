import { FilePlus2, Files, IdCard, Crown, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const actions = [
  {
    title: 'Create Tailored Resume',
    desc: 'Generate a new ATS-matched resume from a job description',
    icon: FilePlus2,
    href: '/dashboard/create',
    badge: 'Studio',
  },
  {
    title: 'Resume Library',
    desc: 'Review, duplicate, and export PDF or DOCX resumes',
    icon: Files,
    href: '/dashboard/resumes',
    badge: 'Vault',
  },
  {
    title: 'Master Profile',
    desc: 'Update experience, education, skills & certifications',
    icon: IdCard,
    href: '/dashboard/profile',
    badge: 'Source',
  },
  {
    title: 'Plans & Billing',
    desc: 'Manage Pro subscription & unlimited resume credits',
    icon: Crown,
    href: '/dashboard/pricing',
    badge: 'Upgrade',
  },
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div>
          <h3 className="text-[15px] font-extrabold text-slate-900">Quick Workspace Shortcuts</h3>
          <p className="text-xs text-slate-500 font-medium">
            Jump straight into any career workflow
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.title}
              href={action.href}
              className="group relative p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-[#0F2744]/30 hover:shadow-lg hover:shadow-slate-900/[0.04] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-[#0F2744] group-hover:bg-[#0F2744] group-hover:text-[#F59E0B] group-hover:border-[#0F2744] shadow-2xs transition-colors duration-200">
                    <Icon className="w-4.5 h-4.5" strokeWidth={2.2} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#0F2744] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h4 className="text-[14px] font-extrabold text-slate-900 mb-1 group-hover:text-[#0F2744] transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {action.desc}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

import { FileEdit, Folder, User, DollarSign } from 'lucide-react'
import Link from 'next/link'

const actions = [
  {
    title: 'Create New Resume',
    desc: 'Start building a new resume with AI',
    icon: FileEdit,
    color: 'text-primary',
    bg: 'bg-primary/10',
    href: '/dashboard/create'
  },
  {
    title: 'My Resumes',
    desc: 'View, edit and download your resumes',
    icon: Folder,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    href: '/dashboard/resumes'
  },
  {
    title: 'Master Profile',
    desc: 'Update your experience and skills',
    icon: User,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    href: '/dashboard/profile'
  },
  {
    title: 'Upgrade Plan',
    desc: 'Unlock unlimited AI generations',
    icon: DollarSign,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    href: '/dashboard/pricing'
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="text-[16px] font-black text-slate-900 mb-6">Quick Actions</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.title}
              href={action.href}
              className="text-left p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all group block"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${action.bg}`}>
                <Icon className={`w-5 h-5 ${action.color}`} strokeWidth={2.5} />
              </div>
              <h4 className="text-[13px] font-black text-slate-900 mb-1">{action.title}</h4>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{action.desc}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

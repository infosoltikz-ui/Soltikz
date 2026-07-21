import { FileText, CheckCircle, Zap, FileSignature } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      title: 'Create New Resume',
      desc: 'Start building a new resume with AI',
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      title: 'Check ATS Score',
      desc: 'Analyze your resume ATS compatibility',
      icon: CheckCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      title: 'AI Resume Optimizer',
      desc: 'Improve your resume with AI suggestions',
      icon: Zap,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      title: 'Cover Letter',
      desc: 'Create a professional cover letter',
      icon: FileSignature,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    }
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
      <h3 className="text-[16px] font-black text-slate-900 mb-6">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button key={action.title} className="text-left p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${action.bg}`}>
                <Icon className={`w-5 h-5 ${action.color}`} strokeWidth={2.5} />
              </div>
              <h4 className="text-[13px] font-black text-slate-900 mb-1">{action.title}</h4>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{action.desc}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

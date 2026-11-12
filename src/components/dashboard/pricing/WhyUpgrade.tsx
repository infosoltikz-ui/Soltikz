import { FileEdit, ShieldCheck, Sparkles, BriefcaseBusiness } from 'lucide-react'

const BENEFITS = [
  {
    icon: FileEdit,
    title: 'Unlimited Tailoring',
    description:
      'Generate a fresh, role-aligned resume version for every job application without watching credit counters.',
    accent: 'border-t-[#0F2744]',
    iconStyle: 'bg-[#EEF4FA] text-[#0F2744]',
  },
  {
    icon: ShieldCheck,
    title: 'Full ATS Diagnostics',
    description:
      'See required vs preferred skill gaps, exact missing keywords, and instant section fixes to beat screening filters.',
    accent: 'border-t-[#059669]',
    iconStyle: 'bg-emerald-50 text-[#059669]',
  },
  {
    icon: Sparkles,
    title: 'Cover Letters & Word Export',
    description:
      'Export clean Word (.docx) files alongside matching cover letters tailored directly to each hiring company.',
    accent: 'border-t-[#F59E0B]',
    iconStyle: 'bg-[#FEF3C7] text-[#D97706]',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Interview Strategy Pack',
    description:
      'Unlock personalized STAR stories, role-specific technical Q&A, HR prompts, and company pitch talking points.',
    accent: 'border-t-[#0F2744]',
    iconStyle: 'bg-slate-100 text-slate-700',
  },
]

export function WhyUpgrade() {
  return (
    <section className="mb-14">
      <div className="text-center mb-7">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Career ROI
        </span>
        <h2 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
          Why Upgrade to Pro?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {BENEFITS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className={`bg-white rounded-2xl border border-slate-200/90 border-t-4 ${item.accent} p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${item.iconStyle} flex items-center justify-center mb-4`}
              >
                <Icon className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-[15.5px] font-extrabold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

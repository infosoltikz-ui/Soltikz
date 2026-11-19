import { FileEdit, ShieldCheck, Sparkles, BriefcaseBusiness } from 'lucide-react'

const BENEFITS = [
  {
    icon: FileEdit,
    title: 'Unlimited Tailoring',
    description:
      'Generate a fresh, role-aligned resume version for every job application without watching credit counters.',
    accent: 'border-t-[#3FA57C]',
    iconStyle: 'bg-[#123227] text-[#3FA57C]',
  },
  {
    icon: ShieldCheck,
    title: 'Full ATS Diagnostics',
    description:
      'See required vs preferred skill gaps, exact missing keywords, and instant section fixes to beat screening filters.',
    accent: 'border-t-[#3FA57C]',
    iconStyle: 'bg-[#123227] text-[#3FA57C]',
  },
  {
    icon: Sparkles,
    title: 'Cover Letters & Word Export',
    description:
      'Export clean Word (.docx) files alongside matching cover letters tailored directly to each hiring company.',
    accent: 'border-t-[#D9A441]',
    iconStyle: 'bg-[#2E2616] text-[#D9A441]',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Interview Strategy Pack',
    description:
      'Unlock personalized STAR stories, role-specific technical Q&A, HR prompts, and company pitch talking points.',
    accent: 'border-t-[#3FA57C]',
    iconStyle: 'bg-[#1A2330] text-[#8FD3B6]',
  },
]

export function WhyUpgrade() {
  return (
    <section className="mb-14">
      <div className="text-center mb-7">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#78859A]">
          Career ROI
        </span>
        <h2 className="text-2xl font-black text-[#E4EAF2] mt-1 tracking-tight" style={{ color: '#E4EAF2' }}>
          Why Upgrade to Pro?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {BENEFITS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className={`bg-[#151D28] rounded-2xl border border-[#26313F] border-t-4 ${item.accent} p-6 shadow-xs hover:border-[#3FA57C]/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${item.iconStyle} flex items-center justify-center mb-4`}
              >
                <Icon className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-[15.5px] font-extrabold text-[#E4EAF2] mb-2" style={{ color: '#E4EAF2' }}>
                {item.title}
              </h3>
              <p className="text-[13px] text-[#9FACBE] font-medium leading-relaxed" style={{ color: '#9FACBE' }}>
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

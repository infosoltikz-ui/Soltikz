import { CheckCircle2, Minus, Crown } from 'lucide-react'
import { FREE_TIER_CREDITS } from '@/utils/pricingPlans'

const FEATURES: { name: string; free: boolean | string; pro: boolean | string }[] = [
  { name: 'AI Tailored Resumes', free: `${FREE_TIER_CREDITS} Credits`, pro: 'Unlimited' },
  { name: 'Full-Time & C2C Formats', free: true, pro: true },
  { name: 'ATS-Compliant Templates', free: 'All 10 Layouts', pro: 'All 10 Layouts' },
  { name: 'Vector PDF Download', free: true, pro: true },
  { name: 'Word (.docx) Download', free: false, pro: true },
  { name: 'ATS Score & Keyword Gap Audit', free: 'Basic Score', pro: 'Full Breakdown' },
  { name: 'Matching Cover Letter Studio', free: false, pro: true },
  { name: 'STAR Stories & Interview Prep', free: false, pro: true },
  { name: 'Resume Version History', free: true, pro: true },
  { name: 'Priority Customer Support', free: false, pro: true },
]

export function PricingTable() {
  const renderValue = (val: boolean | string, highlight = false) => {
    if (typeof val === 'string') {
      return (
        <span
          className={
            highlight
              ? 'inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-extrabold bg-[#EEF4FA] text-[#0F2744]'
              : 'text-[13px] font-bold text-slate-600'
          }
        >
          {val}
        </span>
      )
    }
    if (val === true) {
      return (
        <CheckCircle2
          className={highlight ? 'w-5 h-5 text-[#059669] mx-auto' : 'w-5 h-5 text-[#0F2744] mx-auto'}
          strokeWidth={2.4}
        />
      )
    }
    return <Minus className="w-5 h-5 text-slate-300 mx-auto" strokeWidth={2.2} />
  }

  return (
    <section id="compare-plans" className="mb-14">
      <div className="text-center mb-7">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Side-by-Side Comparison
        </span>
        <h2 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
          Compare Plan Capabilities
        </h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left border-collapse">
            <thead>
              <tr>
                <th className="p-5 pl-6 bg-[#F8FAFC] border-b border-slate-200 w-2/5">
                  <span className="text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider">
                    Capabilities
                  </span>
                </th>
                <th className="p-5 bg-[#F8FAFC] border-b border-slate-200 w-[30%] text-center">
                  <div className="text-[16px] font-black text-slate-900">Free Plan</div>
                  <div className="text-[11.5px] font-medium text-slate-400">Starter Access</div>
                </th>
                <th className="p-5 bg-[#0F2744] border-b border-[#0F2744] w-[30%] text-center">
                  <div className="inline-flex items-center gap-1.5 text-[16px] font-black text-white">
                    <Crown className="w-4 h-4 text-[#F59E0B]" />
                    <span>Pro Career Pass</span>
                  </div>
                  <div className="text-[11.5px] font-semibold text-[#F59E0B]">Unlimited Tools</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FEATURES.map((feature, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="p-4 pl-6 text-[13.5px] font-bold text-slate-800">
                    {feature.name}
                  </td>
                  <td className="p-4 text-center">{renderValue(feature.free)}</td>
                  <td className="p-4 text-center bg-[#EEF4FA]/40">
                    {renderValue(feature.pro, true)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

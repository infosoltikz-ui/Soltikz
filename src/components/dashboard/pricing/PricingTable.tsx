import { CheckCircle2, Minus } from 'lucide-react'

const FEATURES = [
  { name: 'Resume Builder', free: true, pro: true },
  { name: 'ATS Score', free: 'Basic', pro: 'Advanced' },
  { name: 'AI Resume Optimization', free: false, pro: true },
  { name: 'Resume Templates', free: '5 Templates', pro: 'Unlimited' },
  { name: 'Cover Letter', free: false, pro: true },
  { name: 'Interview Preparation', free: false, pro: true },
  { name: 'Cloud Storage', free: false, pro: true },
  { name: 'Resume History', free: false, pro: true },
  { name: 'Priority Support', free: false, pro: true },
]

export function PricingTable() {
  const renderValue = (val: boolean | string) => {
    if (typeof val === 'string') {
      return <span className="text-[13px] font-bold text-slate-700">{val}</span>
    }
    if (val === true) {
      return <CheckCircle2 className="w-5 h-5 text-primary mx-auto" strokeWidth={2.5} />
    }
    return <Minus className="w-5 h-5 text-slate-300 mx-auto" strokeWidth={2.5} />
  }

  return (
    <div className="mb-24 max-w-4xl mx-auto hidden md:block">
      <h2 className="text-2xl font-black text-slate-900 mb-8 text-center tracking-tight">Compare Plans</h2>
      
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-6 bg-slate-50 border-b border-slate-200 w-1/3">
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Features</span>
              </th>
              <th className="p-6 bg-slate-50 border-b border-slate-200 w-1/3 text-center">
                <div className="text-[18px] font-black text-slate-900">Free</div>
              </th>
              <th className="p-6 bg-primary/5 border-b border-primary/20 w-1/3 text-center">
                <div className="text-[18px] font-black text-primary">Pro</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {FEATURES.map((feature, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 pl-6 text-[14px] font-bold text-slate-700">
                  {feature.name}
                </td>
                <td className="p-4 text-center">
                  {renderValue(feature.free)}
                </td>
                <td className="p-4 text-center bg-primary/[0.02]">
                  {renderValue(feature.pro)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

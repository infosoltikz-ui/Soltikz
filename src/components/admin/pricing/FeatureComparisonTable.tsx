'use client'

import { Check, Minus } from 'lucide-react'

const FEATURES = [
  { name: 'Resume Builder Access', free: true, pro: true, enterprise: true },
  { name: 'Resume Limit', free: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'ATS Analysis Engine', free: '10 Reports', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'AI Resume Optimization', free: 'Limited', pro: true, enterprise: true },
  { name: 'Premium Templates', free: false, pro: true, enterprise: true },
  { name: 'Cover Letter Generator', free: false, pro: true, enterprise: true },
  { name: 'Interview Preparation', free: false, pro: true, enterprise: true },
  { name: 'Resume Version History', free: false, pro: '30 Days', enterprise: 'Unlimited' },
  { name: 'Cloud Storage', free: '100 MB', pro: '5 GB', enterprise: 'Unlimited' },
  { name: 'Export to PDF', free: true, pro: true, enterprise: true },
  { name: 'Export to DOCX', free: false, pro: true, enterprise: true },
  { name: 'Priority Support', free: false, pro: true, enterprise: true },
  { name: 'Bulk Resume Generation', free: false, pro: false, enterprise: true },
  { name: 'Admin Dashboard', free: false, pro: false, enterprise: true },
  { name: 'API Access', free: false, pro: false, enterprise: true },
]

export function FeatureComparisonTable() {
  const renderCell = (val: string | boolean) => {
    if (typeof val === 'string') return <span className="text-[13px] font-bold text-slate-700">{val}</span>
    if (val) return <Check className="w-5 h-5 text-green-500 mx-auto" />
    return <Minus className="w-5 h-5 text-slate-300 mx-auto" />
  }

  return (
    <div className="mt-16">
      <h3 className="text-[18px] font-black text-slate-900 mb-6">Detailed Feature Comparison</h3>
      
      <div className="bg-white border border-slate-200 rounded-[18px] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-200">
              <th className="py-5 px-6 text-[13px] font-black text-slate-900 uppercase tracking-widest w-[40%]">Features</th>
              <th className="py-5 px-6 text-[13px] font-black text-slate-900 uppercase tracking-widest text-center w-[30%]">Free</th>
              <th className="py-5 px-6 text-[13px] font-black text-primary uppercase tracking-widest text-center w-[30%] bg-green-50/50">Pro</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feat, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-[13px] font-bold text-slate-600">{feat.name}</td>
                <td className="py-4 px-6 text-center">{renderCell(feat.free)}</td>
                <td className="py-4 px-6 text-center bg-green-50/20">{renderCell(feat.pro)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

"use client";
import { Check, XCircle, FileText, Bot, ShieldCheck, Zap, LayoutTemplate, PenTool, LayoutDashboard, Download, Headset } from 'lucide-react'

const features = [
  {
    name: 'Resume Limit',
    icon: <FileText className="w-5 h-5 text-primary" />,
    basic: '1',
    pro: 'Unlimited',
    premium: 'Unlimited'
  },
  {
    name: 'AI Resume Generation',
    icon: <Bot className="w-5 h-5 text-primary" />,
    basic: 'Limited',
    pro: 'Unlimited',
    premium: 'Unlimited'
  },
  {
    name: 'ATS Score Check',
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    basic: 'Limited',
    pro: 'Unlimited',
    premium: 'Unlimited'
  },
  {
    name: 'AI Optimization',
    icon: <Zap className="w-5 h-5 text-primary" />,
    basic: false,
    pro: true,
    premium: true
  },
  {
    name: 'Premium Templates',
    icon: <LayoutTemplate className="w-5 h-5 text-primary" />,
    basic: '5+',
    pro: '25+',
    premium: '25+'
  },
  {
    name: 'Cover Letter Builder',
    icon: <PenTool className="w-5 h-5 text-primary" />,
    basic: false,
    pro: true,
    premium: true
  },
  {
    name: 'Job Tracker',
    icon: <LayoutDashboard className="w-5 h-5 text-primary" />,
    basic: false,
    pro: true,
    premium: true
  },
  {
    name: 'Download Format',
    icon: <Download className="w-5 h-5 text-primary" />,
    basic: 'PDF',
    pro: 'PDF, DOCX',
    premium: 'PDF, DOCX'
  },
  {
    name: 'Priority Support',
    icon: <Headset className="w-5 h-5 text-primary" />,
    basic: false,
    pro: true,
    premium: true
  }
]

function renderValue(val: string | boolean) {
  if (typeof val === 'string') {
    return <span className="text-[13px] font-medium text-slate-700">{val}</span>
  }
  if (val === true) {
    return <Check className="w-5 h-5 text-primary mx-auto" strokeWidth={3} />
  }
  return <XCircle className="w-5 h-5 text-red-500 mx-auto" strokeWidth={2.5} />
}

export function PricingCompare() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-900">
            Compare <span className="text-primary">All Plans</span>
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-primary/5 border-b border-primary/10">
                  <th className="py-4 px-6 text-[13px] font-bold text-primary w-1/3">Features</th>
                  <th className="py-4 px-6 text-center w-[22%]">
                    <div className="text-[14px] font-black text-slate-900 leading-tight">Basic</div>
                    <div className="text-[11px] font-bold text-primary">Free</div>
                  </th>
                  <th className="py-4 px-6 text-center w-[22%] border-x border-primary/10 bg-white/50">
                    <div className="text-[14px] font-black text-slate-900 leading-tight">Pro</div>
                    <div className="text-[11px] font-bold text-primary">$9.99 /month</div>
                  </th>
                  <th className="py-4 px-6 text-center w-[22%]">
                    <div className="text-[14px] font-black text-slate-900 leading-tight">Premium</div>
                    <div className="text-[11px] font-bold text-primary">$19.99 /month</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {features.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                        {feature.icon}
                      </div>
                      <span className="text-[13px] font-bold text-slate-700">{feature.name}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderValue(feature.basic)}
                    </td>
                    <td className="py-4 px-6 text-center border-x border-slate-100 bg-slate-50/30">
                      {renderValue(feature.pro)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderValue(feature.premium)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}

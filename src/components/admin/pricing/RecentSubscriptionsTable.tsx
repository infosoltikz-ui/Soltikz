'use client'

import { CreditCard, MoreHorizontal, Download } from 'lucide-react'

const SUBSCRIPTIONS = [
  { id: 'SUB-9021', customer: 'Acme Corp', email: 'billing@acme.com', plan: 'Enterprise', amount: '₹120,000', method: 'Wire Transfer', date: 'Oct 24, 2024', renewal: 'Oct 24, 2025', status: 'Active' },
  { id: 'SUB-9020', customer: 'Sarah Jenkins', email: 'sarah.j@email.com', plan: 'Pro (Yearly)', amount: '₹4,788', method: 'Visa •••• 4242', date: 'Oct 23, 2024', renewal: 'Oct 23, 2025', status: 'Active' },
  { id: 'SUB-9019', customer: 'Michael Chen', email: 'm.chen@dev.io', plan: 'Pro (Monthly)', amount: '₹499', method: 'Mastercard •••• 8812', date: 'Oct 22, 2024', renewal: 'Nov 22, 2024', status: 'Active' },
  { id: 'SUB-9018', customer: 'TechFlow Solutions', email: 'hr@techflow.io', plan: 'Enterprise', amount: '₹85,000', method: 'Wire Transfer', date: 'Oct 20, 2024', renewal: 'Oct 20, 2025', status: 'Active' },
  { id: 'SUB-9017', customer: 'Emma Watson', email: 'emma.w@design.co', plan: 'Pro (Monthly)', amount: '₹499', method: 'Visa •••• 1123', date: 'Oct 19, 2024', renewal: 'Nov 19, 2024', status: 'Past Due' },
]

export function RecentSubscriptionsTable() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-black text-slate-900">Recent Subscriptions</h3>
        <button className="text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
          View All Transactions
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#FAFAF8] border-b border-slate-200">
                <th className="py-4 px-6 text-[12px] font-black text-slate-900 uppercase tracking-widest">Customer</th>
                <th className="py-4 px-6 text-[12px] font-black text-slate-900 uppercase tracking-widest">Plan</th>
                <th className="py-4 px-6 text-[12px] font-black text-slate-900 uppercase tracking-widest">Amount</th>
                <th className="py-4 px-6 text-[12px] font-black text-slate-900 uppercase tracking-widest">Payment Method</th>
                <th className="py-4 px-6 text-[12px] font-black text-slate-900 uppercase tracking-widest">Renewal Date</th>
                <th className="py-4 px-6 text-[12px] font-black text-slate-900 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[12px] font-black text-slate-900 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SUBSCRIPTIONS.map((sub, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="text-[13px] font-bold text-slate-900">{sub.customer}</div>
                    <div className="text-[12px] font-medium text-slate-500">{sub.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{sub.plan}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-[13px] font-black text-slate-900">{sub.amount}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-[12px] font-bold text-slate-600">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                      {sub.method}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-[12px] font-bold text-slate-600">{sub.renewal}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase
                      ${sub.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}
                    `}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-md shadow-sm transition-colors" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-md shadow-sm transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

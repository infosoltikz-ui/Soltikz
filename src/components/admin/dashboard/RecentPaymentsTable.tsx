'use client'

import { Search, Download, ExternalLink, CheckCircle2 } from 'lucide-react'

const PAYMENTS = [
  { user: 'Tech Corp LLC', email: 'billing@techcorp.com', plan: 'Enterprise', amount: '$499.00', method: '•••• 4242', date: 'Oct 24, 2023', status: 'Paid', invoice: 'INV-2023-089' },
  { user: 'Sarah Jenkins', email: 'sarah.j@example.com', plan: 'Pro', amount: '$29.00', method: '•••• 8821', date: 'Oct 24, 2023', status: 'Paid', invoice: 'INV-2023-090' },
  { user: 'David Smith', email: 'david.smith@example.com', plan: 'Pro', amount: '$29.00', method: '•••• 1123', date: 'Oct 23, 2023', status: 'Paid', invoice: 'INV-2023-091' },
  { user: 'Global Solutions', email: 'admin@globalsol.com', plan: 'Enterprise', amount: '$499.00', method: '•••• 5590', date: 'Oct 23, 2023', status: 'Paid', invoice: 'INV-2023-092' },
]

export function RecentPaymentsTable() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm overflow-hidden mt-6">
      
      {/* Header & Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent Payments</h3>
          <p className="text-[13px] font-medium text-slate-500">Latest subscription transactions</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search payments..." 
              className="pl-9 h-10 w-48 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="h-10 px-4 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PAYMENTS.map((payment, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-[14px] font-bold text-slate-900">{payment.user}</div>
                    <div className="text-[12px] font-medium text-slate-500">{payment.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider
                    ${payment.plan === 'Pro' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'}`}
                  >
                    {payment.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[14px] font-black text-slate-900">{payment.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                    <div className="w-8 h-5 bg-slate-200 rounded flex items-center justify-center text-[8px] font-black text-slate-500">VISA</div>
                    {payment.method}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-medium text-slate-600">{payment.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-[13px] font-bold text-slate-700">{payment.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:text-orange-500 transition-colors">
                    {payment.invoice} <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

'use client'

import { CreditCard, MoreHorizontal, Download, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'

export function RecentSubscriptionsTable() {
  const supabase = createClient()
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSubscriptions() {
      const { data } = await supabase
        .from('payments_and_subscriptions')
        .select(`
          id,
          amount_paid,
          created_at,
          status,
          valid_until,
          profiles (
            full_name,
            email,
            plan_id
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10)

      if (data) {
        const mapped = data.map((sub: any) => {
          const profile = Array.isArray(sub.profiles) ? sub.profiles[0] : sub.profiles;
          
          return {
            id: sub.id.substring(0, 8),
            customer: profile?.full_name || 'Unknown',
            email: profile?.email || 'No email',
            plan: profile?.plan_id || 'FREE',
            amount: `₹${sub.amount_paid || 0}`,
            method: 'Razorpay', // Assuming Razorpay is used based on Indian Rupee
            date: format(new Date(sub.created_at), 'MMM dd, yyyy'),
            renewal: sub.valid_until ? format(new Date(sub.valid_until), 'MMM dd, yyyy') : 'N/A',
            status: sub.status === 'SUCCESS' || sub.status === 'ACTIVE' ? 'Active' : 'Past Due'
          }
        })
        setSubscriptions(mapped)
      }
      setIsLoading(false)
    }
    fetchSubscriptions()
  }, [])

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-black text-slate-900">Recent Subscriptions</h3>
        <button className="text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
          View All Transactions
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="flex justify-center items-center h-48 text-slate-500 font-medium text-sm">
            No recent subscriptions found.
          </div>
        ) : (
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
                {subscriptions.map((sub, i) => (
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
        )}
      </div>
    </div>
  )
}

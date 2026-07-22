'use client'

import { useEffect, useState } from 'react'
import { Users, Crown, FileText, FileUp, DollarSign, Target, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export function AnalyticsCards() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    proUsers: 0,
    totalResumes: 0,
    revenue: 0,
    avgAts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();
      try {
        // Since Admin RLS allows viewing all, these counts will work for admins
        const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: proUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('plan_id', 'PRO_MONTHLY');
        const { count: totalResumes } = await supabase.from('resumes_v2').select('*', { count: 'exact', head: true });
        
        // Sum revenue
        const { data: payments } = await supabase.from('payments_and_subscriptions').select('amount_paid');
        const revenue = (payments || []).reduce((acc, curr) => acc + (Number(curr.amount_paid) || 0), 0);

        // Avg ATS
        const { data: atsData } = await supabase.from('ats_analyses').select('overall_score');
        const avgAts = atsData && atsData.length > 0 
          ? Math.round(atsData.reduce((acc, curr) => acc + (curr.overall_score || 0), 0) / atsData.length)
          : 0;

        setStats({
          totalUsers: totalUsers || 0,
          proUsers: proUsers || 0,
          totalResumes: totalResumes || 0,
          revenue,
          avgAts
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const CARDS = [
    { title: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users },
    { title: 'Premium Subscribers', value: stats.proUsers.toLocaleString(), icon: Crown },
    { title: 'Total Resumes Created', value: stats.totalResumes.toLocaleString(), icon: FileText },
    { title: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: DollarSign },
    { title: 'Average ATS Score', value: `${stats.avgAts}%`, isCircular: true, icon: Target },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-slate-600" strokeWidth={2} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[14px] font-bold text-slate-500 mb-1">{card.title}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</h3>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}

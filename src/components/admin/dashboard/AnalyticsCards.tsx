'use client'

import { useEffect, useState } from 'react'
import { Users, Crown, FileText, DollarSign, Target, Loader2 } from 'lucide-react'
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
        const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: proUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).in('plan_id', ['PRO_MONTHLY', 'PRO_YEARLY']);
        const { count: totalResumes } = await supabase.from('resumes_v2').select('*', { count: 'exact', head: true });
        
        const { data: payments } = await supabase.from('payments_and_subscriptions').select('amount_paid');
        const revenue = (payments || []).reduce((acc, curr) => acc + (Number(curr.amount_paid) || 0), 0);

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
    { 
      title: 'Total Users', 
      value: stats.totalUsers.toLocaleString(), 
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100',
      gradient: 'from-blue-500/10 to-transparent'
    },
    { 
      title: 'Premium Users', 
      value: stats.proUsers.toLocaleString(), 
      icon: Crown,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 border-amber-100',
      gradient: 'from-amber-500/10 to-transparent'
    },
    { 
      title: 'Resumes Created', 
      value: stats.totalResumes.toLocaleString(), 
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
      gradient: 'from-emerald-500/10 to-transparent'
    },
    { 
      title: 'Total Revenue', 
      value: `₹${stats.revenue.toLocaleString()}`, 
      icon: DollarSign,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-100',
      gradient: 'from-indigo-500/10 to-transparent'
    },
    { 
      title: 'Avg ATS Score', 
      value: `${stats.avgAts}%`, 
      icon: Target,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50 border-rose-100',
      gradient: 'from-rose-500/10 to-transparent'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            {/* Background subtle gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.gradient} opacity-50 rounded-bl-full pointer-events-none -z-0 group-hover:scale-110 transition-transform duration-500`}></div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl ${card.bgColor} border flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={2.5} />
              </div>

              <div>
                <p className="text-[12px] font-bold text-slate-500 mb-1 uppercase tracking-wide">{card.title}</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</h3>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}

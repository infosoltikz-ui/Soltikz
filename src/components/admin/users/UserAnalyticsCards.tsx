'use client'

import { Users, Crown, User, CheckCircle2, Ban, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Stats {
  total: number
  premium: number
  free: number
  newToday: number
  verified: number
  blocked: number
}

export function UserAnalyticsCards() {
  const [stats, setStats] = useState<Stats>({ total: 0, premium: 0, free: 0, newToday: 0, verified: 0, blocked: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch from our server-side API which uses Service Role (bypasses RLS)
    fetch('/api/admin/user-stats')
      .then(res => res.json())
      .then(data => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const CARDS = [
    {
      title: 'Total Users',
      value: stats.total,
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      badge: { label: 'All', color: 'bg-blue-50 text-blue-700 border-blue-100' },
    },
    {
      title: 'Premium',
      value: stats.premium,
      icon: Crown,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      badge: { label: 'Pro', color: 'bg-amber-50 text-amber-700 border-amber-100' },
    },
    {
      title: 'Free Users',
      value: stats.free,
      icon: User,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-500',
    },
    {
      title: 'Verified',
      value: stats.verified,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Blocked',
      value: stats.blocked,
      icon: Ban,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      title: 'New Today',
      value: stats.newToday,
      icon: UserPlus,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      isLive: true,
    },
  ]

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-2.5"
          >
            {/* Top row: icon + badge */}
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} strokeWidth={2.2} />
              </div>
              {card.badge && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border ${card.badge.color}`}>
                  {card.badge.label}
                </span>
              )}
              {card.isLive && (
                <span className="flex items-center gap-1 text-[10px] font-black text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  LIVE
                </span>
              )}
            </div>

            {/* Bottom row: value + label */}
            <div>
              {loading ? (
                <div className="h-5 w-8 bg-slate-100 animate-pulse rounded mb-1" />
              ) : (
                <p className="text-[20px] font-black text-slate-900 leading-none">{card.value.toLocaleString()}</p>
              )}
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{card.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

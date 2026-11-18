'use client'

import { useState, useRef, useEffect } from 'react'
import { Settings2, LogOut, IdCard, Files, Crown, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { isPremiumPlan } from '@/utils/pricingPlans'
import { cn } from '@/utils/cn'

export function UserMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: 'User',
    email: '',
    isPro: false,
  })

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, plan_id')
          .eq('id', user.id)
          .single()

        setUserData({
          name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          isPro: isPremiumPlan(profile?.plan_id),
        })
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const initials =
    userData.name
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U'

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('soltkiz_session_active')
      sessionStorage.removeItem('soltkiz_session_start')
      document.cookie = 'session_start=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax'
    }
    router.push('/login?logout=success')
    router.refresh()
  }

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          'group flex items-center gap-3 cursor-pointer bg-[#151D28] border px-3 sm:px-3.5 py-2 rounded-2xl transition-all duration-200 shadow-xs hover:border-[#3A495C] text-left',
          isDropdownOpen
            ? 'border-[#3FA57C] ring-2 ring-[#3FA57C]/20'
            : 'border-[#26313F] hover:border-[#3A495C]'
        )}
      >
        <div className="w-9 h-9 rounded-xl bg-[#0A1017] text-[#D9A441] font-black text-xs flex items-center justify-center shrink-0 ring-2 ring-[#D9A441]/25 shadow-xs group-hover:scale-105 transition-transform">
          {initials}
        </div>

        <div className="hidden sm:block pr-1">
          <div className="text-[13.5px] font-extrabold text-[#E4EAF2] leading-tight flex items-center gap-1.5">
            <span className="max-w-[140px] truncate">{userData.name}</span>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-[#78859A] transition-transform duration-200',
                isDropdownOpen && 'rotate-180 text-[#3FA57C]'
              )}
            />
          </div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-px rounded',
                userData.isPro
                  ? 'bg-[#2E2616] text-[#D9A441] border border-[#D9A441]/40'
                  : 'bg-[#1A2330] text-[#9FACBE] border border-[#26313F]'
              )}
            >
              {userData.isPro && <Crown className="w-2.5 h-2.5 text-[#D9A441]" />}
              {userData.isPro ? 'Pro Plan' : 'Free Plan'}
            </span>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2.5 w-64 bg-[#151D28] rounded-2xl shadow-xl shadow-black/40 border border-[#26313F] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 border-b border-[#26313F] mb-1.5">
            <p className="text-[13.5px] font-extrabold text-[#E4EAF2] truncate">{userData.name}</p>
            <p className="text-[12px] font-medium text-[#78859A] truncate mt-0.5">{userData.email}</p>
          </div>

          <div className="px-1.5 space-y-0.5">
            <Link
              href="/dashboard/profile"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-[#C3CCD9] hover:bg-[#1A2330] hover:text-[#E4EAF2] transition-colors"
            >
              <IdCard className="w-4 h-4 text-[#78859A]" />
              <span>Master Profile</span>
            </Link>

            <Link
              href="/dashboard/resumes"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-[#C3CCD9] hover:bg-[#1A2330] hover:text-[#E4EAF2] transition-colors"
            >
              <Files className="w-4 h-4 text-[#78859A]" />
              <span>My Resumes</span>
            </Link>

            <Link
              href="/dashboard/pricing"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-[#C3CCD9] hover:bg-[#2E2616] hover:text-[#D9A441] transition-colors"
            >
              <Crown className="w-4 h-4 text-[#D9A441]" />
              <span>{userData.isPro ? 'Manage Subscription' : 'Upgrade to Pro'}</span>
            </Link>

            <Link
              href="/dashboard/settings"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-[#C3CCD9] hover:bg-[#1A2330] hover:text-[#E4EAF2] transition-colors"
            >
              <Settings2 className="w-4 h-4 text-[#78859A]" />
              <span>Account Settings</span>
            </Link>
          </div>

          <div className="h-px bg-[#26313F] my-1.5 mx-3" />

          <div className="px-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { isPremiumPlan } from '@/utils/pricingPlans'

export function UserMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [userData, setUserData] = useState({ name: 'User', email: '', plan: 'Free Plan' })

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, plan_id')
          .eq('id', user.id)
          .single()

        setUserData({
          name: profile?.full_name || user.user_metadata?.full_name || 'User',
          email: user.email || '',
          plan: isPremiumPlan(profile?.plan_id) ? 'Premium Plan' : 'Free Plan'
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
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=16A34A&color=fff&bold=true`

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <div
        className="flex items-center gap-3 cursor-pointer bg-white border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          src={avatarUrl}
          alt={userData.name}
          className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
        />
        <div className="hidden sm:block">
          <div className="text-[14px] font-black text-slate-900 leading-tight flex items-center gap-1.5">
            {userData.name}
            <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="text-[11px] font-semibold text-slate-500">{userData.plan}</div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100 mb-2">
            <p className="text-[13px] font-bold text-slate-900">{userData.name}</p>
            <p className="text-[12px] font-medium text-slate-500 truncate">{userData.email}</p>
          </div>

          <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left">
            <Settings className="w-4 h-4" />
            Settings
          </Link>

          <div className="h-px bg-slate-100 my-2 mx-4"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, User, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function CreateResumeHeader({ title = "Untitled Resume" }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [userData, setUserData] = useState({ name: 'User', email: '', plan: 'Free Plan' })

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        setUserData({
          name: profile?.full_name || user.user_metadata?.full_name || 'User',
          email: user.email || '',
          plan: profile?.subscription_tier === 'PRO_MONTHLY' ? 'Premium Plan' : 'Free Plan'
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
  }, [dropdownRef])

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=16A34A&color=fff&bold=true`

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-6">
          <Link 
            href="/dashboard"
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <h1 className="text-[16px] font-black text-slate-900 truncate max-w-[200px] sm:max-w-md">
            {title}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors">
            Preview
          </button>
          
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img 
                src={avatarUrl} 
                alt={userData.name} 
                className="w-8 h-8 rounded-full border border-slate-200"
              />
              <div className="hidden sm:block text-left mr-1">
                <div className="text-[13px] font-bold text-slate-900 leading-tight">
                  {userData.name}
                </div>
              </div>
              <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100 mb-2">
                  <p className="text-[13px] font-bold text-slate-900">{userData.name}</p>
                  <p className="text-[12px] font-medium text-slate-500 truncate">{userData.email}</p>
                </div>
              
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                
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
        </div>

      </div>
    </header>
  )
}

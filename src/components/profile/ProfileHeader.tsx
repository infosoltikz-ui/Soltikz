'use client'

import { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut } from 'lucide-react'

export function ProfileHeader({ profile }: { profile?: any }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between py-8 gap-6">
      {/* Left: Titles */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Master Profile</h1>
        <p className="text-[15px] font-bold text-slate-500">
          Build your profile once and use it to create multiple resumes.
        </p>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="flex items-center gap-6">
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img 
              src="https://ui-avatars.com/api/?name=John+Doe&background=16A34A&color=fff&bold=true" 
              alt="John Doe" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            <div className="hidden sm:block">
              <div className="text-[14px] font-black text-slate-900 leading-tight flex items-center gap-1">
                John Doe
                <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <div className="text-[11px] font-bold text-slate-500">Premium Plan</div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 mb-2">
                <p className="text-[13px] font-bold text-slate-900">John Doe</p>
                <p className="text-[12px] font-medium text-slate-500 truncate">john.doe@example.com</p>
              </div>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left">
                <User className="w-4 h-4" />
                Profile Checking
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              
              <div className="h-px bg-slate-100 my-2 mx-4"></div>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors text-left">
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

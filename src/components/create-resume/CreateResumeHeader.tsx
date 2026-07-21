'use client'

import { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut, Bell, HelpCircle } from 'lucide-react'

export function CreateResumeHeader() {
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
    <header className="flex flex-col xl:flex-row xl:items-center justify-between py-6 gap-6 bg-slate-50/50">
      {/* Left: Titles */}
      <div className="flex-1">
        <h1 className="text-2xl font-black text-slate-900 mb-1">Create Resume</h1>
        <p className="text-[14px] font-medium text-slate-500">
          Provide the details and let AI build an ATS-optimized resume for you
        </p>
      </div>



      {/* Right: Profile & Actions */}
      <div className="flex-1 flex justify-end items-center gap-4">
        
        {/* Icons */}
        <div className="flex items-center gap-3 text-slate-500 border-r border-slate-200 pr-4">
          <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" strokeWidth={2.5} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1.5 pr-2 rounded-xl transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img 
              src="https://ui-avatars.com/api/?name=John+Doe&background=16A34A&color=fff&bold=true" 
              alt="John Doe" 
              className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
            />
            <div className="hidden sm:block">
              <div className="text-[13px] font-black text-slate-900 leading-tight flex items-center gap-1">
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

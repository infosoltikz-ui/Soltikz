'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { cn } from '@/utils/cn'
import { Menu } from 'lucide-react'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600"
      >
        <Menu className="w-5 h-5" />
      </button>
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out pt-16 md:pt-0",
          isCollapsed ? "md:pl-[80px]" : "md:pl-[280px]"
        )}
      >
        {children}
      </div>
    </div>
  )
}

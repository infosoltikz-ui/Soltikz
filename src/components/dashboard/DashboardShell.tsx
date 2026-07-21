'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { cn } from '@/utils/cn'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "pl-[80px]" : "pl-[280px]"
        )}
      >
        {children}
      </div>
    </div>
  )
}

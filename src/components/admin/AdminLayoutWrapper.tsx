'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Left Sidebar Fixed */}
      <AdminSidebar />
      
      {/* Main Content Wrapper */}
      <div className="pl-[280px] flex flex-col min-h-screen">
        <AdminHeader />
        
        {/* Children will contain the center content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

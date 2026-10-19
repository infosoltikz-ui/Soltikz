import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { SessionManager } from '@/components/auth/SessionManager'
import { Suspense } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell>
      <Suspense fallback={null}>
        <SessionManager />
      </Suspense>
      {children}
    </DashboardShell>
  )
}

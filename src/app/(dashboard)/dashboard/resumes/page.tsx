import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ResumeStats } from '@/components/dashboard/resumes/ResumeStats'
import { ResumeToolbar } from '@/components/dashboard/resumes/ResumeToolbar'
import { ResumeGrid } from '@/components/dashboard/resumes/ResumeGrid'
export default function MyResumesPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Top Header */}
      <DashboardHeader 
        title="My Resumes" 
        subtitle="Manage, organize, optimize, and download all your resumes from one place." 
      />

      {/* Stats Row */}
      <ResumeStats />

      {/* Main Content Area */}
      <div className="w-full">
        <ResumeToolbar />
        <ResumeGrid />
      </div>

    </div>
  )
}

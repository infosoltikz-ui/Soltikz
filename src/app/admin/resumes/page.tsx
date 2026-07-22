'use client'

import { useState } from 'react'
import { ResumeAnalyticsCards } from '@/components/admin/resumes/ResumeAnalyticsCards'
import { ResumeActionToolbar } from '@/components/admin/resumes/ResumeActionToolbar'
import { ResumeTable } from '@/components/admin/resumes/ResumeTable'
import { ResumePreviewDrawer } from '@/components/admin/resumes/ResumePreviewDrawer'
import { ResumeCharts } from '@/components/admin/resumes/ResumeCharts'
import { TopAtsResumes } from '@/components/admin/resumes/TopAtsResumes'
import { ResumeActivityTimeline } from '@/components/admin/resumes/ResumeActivityTimeline'

export default function ResumesManagementPage() {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

  return (
    <div className="flex">
      {/* Main Center Content */}
      <div className="flex-1 p-8 overflow-x-hidden">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[22px] font-black text-slate-900 tracking-tight">Resume Management</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5">Monitor, review, organize, and manage all resumes created by platform users.</p>
        </div>

        {/* Analytics Grid */}
        <ResumeAnalyticsCards />

        {/* Toolbar & Filters */}
        <ResumeActionToolbar />

        {/* Core Data Table */}
        <ResumeTable onRowClick={(id) => setSelectedResumeId(id)} />

        {/* Visual Analytics */}
        <ResumeCharts />

        {/* Top ATS Performers */}
        <TopAtsResumes />

        {/* Timeline */}
        <div className="mt-6">
          <ResumeActivityTimeline />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-bold text-slate-400">
          <div>Soltikz Admin Portal v1.0</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </footer>
      </div>

      {/* Sliding Drawer for Resume Preview */}
      {selectedResumeId !== null && (
        <ResumePreviewDrawer 
          resumeId={selectedResumeId} 
          onClose={() => setSelectedResumeId(null)} 
        />
      )}
    </div>
  )
}

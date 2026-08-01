'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { ProfileCompletionBanner } from '@/components/profile/ProfileCompletionBanner'
import { ProfileView } from '@/components/profile/ProfileView'

// Form Components
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm'
import { EducationForm } from '@/components/profile/EducationForm'
import { EmploymentForm } from '@/components/profile/EmploymentForm'
import { SkillsForm } from '@/components/profile/SkillsForm'
import { ProjectsForm } from '@/components/profile/ProjectsForm'
import { CertificationsForm } from '@/components/profile/CertificationsForm'

export function ProfileContent({ initialProfile }: { initialProfile: any }) {
  const [activeTab, setActiveTab] = useState('personal')
  const [profile, setProfile] = useState(initialProfile)
  const [viewMode, setViewMode] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)  // false = editing, true = view after save

  // Called by SkillsForm after Final Save
  const handleFinalSave = (savedProfile: any) => {
    setProfile(savedProfile)
    setViewMode(true)
  }

  // Called by ProfileView Edit buttons
  const handleEdit = (tab: string) => {
    setActiveTab(tab)
    setViewMode(false)
  }

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('education')} />
      case 'education': return <EducationForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('employment')} />
      case 'employment': return <EmploymentForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('projects')} />
      case 'projects': return <ProjectsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('certifications')} />
      case 'certifications': return <CertificationsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('skills')} />
      case 'skills': return <SkillsForm profile={profile} setProfile={setProfile} onFinalSave={handleFinalSave} />
      default: return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('education')} />
    }
  }

  return (
    <>
      <ProfileHeader profile={profile} />

      {!viewMode && (
        <div className="mb-2">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      )}

      <main>
        {viewMode ? (
          <ProfileView profile={profile} onEdit={handleEdit} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Area */}
            <div className="flex-1 min-w-0">
              {renderActiveForm()}
            </div>

            {/* Sidebar with toggle */}
            <div className="relative shrink-0" style={{ width: sidebarVisible ? undefined : '40px' }}>
              {/* Toggle button */}
              <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                title={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
                className="absolute -left-4 top-4 z-10 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary hover:text-primary text-slate-400 transition-all hidden lg:flex"
              >
                {sidebarVisible ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </button>

              {/* Sidebar content */}
              <div className={`w-full lg:w-[260px] xl:w-[280px] transition-all duration-300 overflow-hidden ${sidebarVisible ? 'opacity-100 max-w-[280px]' : 'opacity-0 max-w-0 pointer-events-none'}`}>
                <ProfileSidebar profile={profile} />
              </div>
            </div>
          </div>
        )}

        {!viewMode && <ProfileCompletionBanner profile={profile} />}
      </main>
    </>
  )
}

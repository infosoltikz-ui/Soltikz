'use client'

import { useState } from 'react'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { ProfileCompletionBanner } from '@/components/profile/ProfileCompletionBanner'

// Form Components
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm'
import { EducationForm } from '@/components/profile/EducationForm'
import { EmploymentForm } from '@/components/profile/EmploymentForm'
import { SkillsForm } from '@/components/profile/SkillsForm'
import { ProjectsForm } from '@/components/profile/ProjectsForm'
import { CertificationsForm } from '@/components/profile/CertificationsForm'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal')

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm />
      case 'education': return <EducationForm />
      case 'employment': return <EmploymentForm />
      case 'skills': return <SkillsForm />
      case 'projects': return <ProjectsForm />
      case 'certifications': return <CertificationsForm />
      default: return <PersonalInfoForm />
    }
  }

  return (
    <div className="px-8 pb-8 max-w-[1600px] mx-auto">
      <ProfileHeader />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Form Area */}
          <div className="flex-1 min-w-0">
            {renderActiveForm()}
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0">
            <ProfileSidebar />
          </div>
        </div>

        <ProfileCompletionBanner />
      </main>
    </div>
  )
}

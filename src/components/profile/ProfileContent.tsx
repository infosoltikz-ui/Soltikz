'use client'

import { useState, useEffect } from 'react'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'

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
  const [importVersion, setImportVersion] = useState(0)

  // If master_resume_data already has content (user has saved before),
  // start in view mode so they see their profile — not a blank form — on refresh.
  const hasExistingData = !!(
    initialProfile?.master_resume_data?.personal_info?.firstName ||
    initialProfile?.master_resume_data?.employment?.length > 0 ||
    initialProfile?.master_resume_data?.education?.length > 0 ||
    initialProfile?.master_resume_data?.skills?.length > 0
  )
  const [viewMode, setViewMode] = useState(hasExistingData)

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

  // Called after a successful LinkedIn PDF import - merges parsed data into the
  // forms' initial state. The user still reviews and saves each step themselves;
  // nothing is written to the database here.
  const handleLinkedInImport = (parsedData: any) => {
    setProfile((prev: any) => ({
      ...prev,
      full_name: [parsedData.personal_info?.firstName, parsedData.personal_info?.lastName].filter(Boolean).join(' ') || prev.full_name,
      master_resume_data: {
        ...prev.master_resume_data,
        personal_info: { ...prev.master_resume_data?.personal_info, ...parsedData.personal_info },
        employment: parsedData.employment?.length > 0 ? parsedData.employment : prev.master_resume_data?.employment,
        education: parsedData.education?.length > 0 ? parsedData.education : prev.master_resume_data?.education,
        skills: parsedData.skills?.length > 0 ? parsedData.skills : prev.master_resume_data?.skills,
      }
    }))
    setViewMode(false)
    setActiveTab('personal')
    setImportVersion(v => v + 1)
  }

  // Scroll to top whenever tab changes or view mode toggles
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab, viewMode])

  const renderActiveForm = () => {
    const onCancel = hasExistingData ? () => setViewMode(true) : undefined
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('education')} onCancel={onCancel} />
      case 'education': return <EducationForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('employment')} onCancel={onCancel} />
      case 'employment': return <EmploymentForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('projects')} onCancel={onCancel} />
      case 'projects': return <ProjectsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('certifications')} onCancel={onCancel} />
      case 'certifications': return <CertificationsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('skills')} onCancel={onCancel} />
      case 'skills': return <SkillsForm profile={profile} setProfile={setProfile} onFinalSave={handleFinalSave} onCancel={onCancel} />
      default: return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('education')} onCancel={onCancel} />
    }
  }

  return (
    <>
      <ProfileHeader />

      {!viewMode && (
        <div className="mb-2">
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onPreview={hasExistingData ? () => setViewMode(true) : undefined}
          />
        </div>
      )}

      <main>
        {viewMode ? (
          <ProfileView profile={profile} onEdit={handleEdit} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Area */}
            <div className="flex-1 min-w-0" key={`${activeTab}-${importVersion}`}>
              {renderActiveForm()}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0">
              <ProfileSidebar profile={profile} onImport={handleLinkedInImport} />
            </div>
          </div>
        )}


      </main>
    </>
  )
}

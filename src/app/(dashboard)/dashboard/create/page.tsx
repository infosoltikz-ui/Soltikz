'use client'

import { useState } from 'react'
import { CreateResumeHeader } from '@/components/create-resume/CreateResumeHeader'
import { ResumeTypeSelector } from '@/components/create-resume/ResumeTypeSelector'
import { PersonalInfoSection } from '@/components/create-resume/PersonalInfoSection'
import { CompanyDetailsSection } from '@/components/create-resume/CompanyDetailsSection'
import { CreateResumeSidebar } from '@/components/create-resume/CreateResumeSidebar'
import { HowItWorks } from '@/components/create-resume/HowItWorks'
import { WorkspaceSection } from '@/components/create-resume/WorkspaceSection'
import { DownloadSidebar } from '@/components/create-resume/DownloadSidebar'
import { Button } from '@/components/ui/Button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function CreateResumePage() {
  const [step, setStep] = useState(1)

  return (
    <div className="px-8 pb-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
      <CreateResumeHeader />
      
      <main className="mt-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <HowItWorks />
            
            <div className="flex flex-col gap-6">
              <ResumeTypeSelector />
              <PersonalInfoSection />
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => setStep(2)}
                className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all text-[15px]"
              >
                <div className="flex items-center gap-2">
                  Next Step: Job Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <Button 
                onClick={() => setStep(1)}
                className="h-10 px-6 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-transparent"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Step 1
                </div>
              </Button>
              <div className="text-[14px] font-bold text-slate-800">
                Step 2 of 3: Job Details
              </div>
              <div className="w-[130px]"></div> {/* Spacer to keep title perfectly centered */}
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0 space-y-6">
                <CompanyDetailsSection onGenerate={() => setStep(3)} />
              </div>
              
              {/* Sidebar */}
              <div className="w-full xl:w-[400px] shrink-0 space-y-6">
                <CreateResumeSidebar />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <Button 
                onClick={() => setStep(2)}
                className="h-10 px-6 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-transparent"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Details
                </div>
              </Button>
              <div className="text-[14px] font-bold text-slate-800">
                Final Step: Review & Download
              </div>
              <div className="w-[130px]"></div> {/* Spacer */}
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0 space-y-6">
                <WorkspaceSection />
              </div>
              
              {/* Sidebar */}
              <DownloadSidebar />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

'use client'

import React, { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import { RESUME_TEMPLATES, getTemplateById } from '@/components/create-resume/templates/registry'
import { buildResumeDataFromProfile } from '@/components/create-resume/templates/buildResumeDataFromProfile'
import { TemplatePreviewModal } from '@/components/create-resume/TemplatePreviewModal'

interface TemplateCardProps {
  id: string
  name: string
  description: string
  badgeText?: string
  onPreview: (id: string) => void
}

function RealTemplatePreview({ id }: { id: string }) {
  const TemplateComponent = getTemplateById(id).component
  const { profileData, resumeData } = buildResumeDataFromProfile(undefined, id)

  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex justify-center">
      <div
        className="absolute top-0 origin-top pointer-events-none select-none"
        style={{ width: '850px', transform: 'scale(0.34)' }}
      >
        <Suspense fallback={<div className="w-full h-[1100px] bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
          <TemplateComponent
            resumeData={resumeData}
            profileData={profileData}
          />
        </Suspense>
      </div>
    </div>
  )
}

function TemplateCard({ id, name, description, badgeText = '100% Parser-Safe', onPreview }: TemplateCardProps) {
  return (
    <div className="group flex flex-col bg-white dark:bg-[#151D28] rounded-2xl border border-[#D8DEE7] dark:border-[#26313F] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Top Preview Canvas */}
      <div className="relative w-full h-[360px] sm:h-[380px] bg-[#F8FAFC] dark:bg-[#0D131B] border-b border-[#D8DEE7] dark:border-[#26313F] overflow-hidden">
        <RealTemplatePreview id={id} />

        {/* Floating Quick Preview on Hover */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 backdrop-blur-[1px]">
          <button
            type="button"
            onClick={() => onPreview(id)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A2330] text-[#16202E] dark:text-[#E4EAF2] rounded-xl font-bold text-[13px] shadow-lg border border-[#D8DEE7] dark:border-[#26313F] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#0A6E4E] dark:text-[#3FA57C]" />
            Full Size Preview
          </button>
        </div>
      </div>

      {/* Card Info and Action */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-[17px] font-bold text-[#16202E] dark:text-[#E4EAF2] tracking-tight">
              {name}
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6F4EA] dark:bg-[#123227] text-[#0A6E4E] dark:text-[#8FD3B6] border border-[#CEEAD6] dark:border-[#3FA57C]/30 shrink-0">
              <ShieldCheck className="w-3 h-3" />
              {badgeText}
            </span>
          </div>
          <p className="text-[13px] text-[#4B5768] dark:text-[#9FACBE] leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-[14px] bg-[#0A6E4E] hover:bg-[#0D8A62] text-white shadow-sm hover:shadow transition-all group-hover:scale-[1.01]"
          >
            Use this Template
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function LandingTemplatesShowcase() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'fulltime' | 'c2c'>('fulltime')
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)

  const activeTemplates = RESUME_TEMPLATES.filter((t) =>
    activeTab === 'c2c' ? t.id.startsWith('c2c') : !t.id.startsWith('c2c')
  )

  const handleSelectTemplate = (id: string) => {
    setPreviewTemplateId(null)
    router.push('/login')
  }

  return (
    <>
      <div className="mt-8">
        {/* Toggle between Full-Time and C2C Templates */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-[#F1F5F9] dark:bg-[#151D28] border border-[#D8DEE7] dark:border-[#26313F] rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('fulltime')}
              className={`px-5 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'fulltime'
                  ? 'bg-white dark:bg-[#1A2330] text-[#16202E] dark:text-white shadow-sm'
                  : 'text-[#4B5768] dark:text-[#9FACBE] hover:text-[#16202E] dark:hover:text-white'
              }`}
            >
              Full-Time Templates (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('c2c')}
              className={`px-5 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'c2c'
                  ? 'bg-white dark:bg-[#1A2330] text-[#16202E] dark:text-white shadow-sm'
                  : 'text-[#4B5768] dark:text-[#9FACBE] hover:text-[#16202E] dark:hover:text-white'
              }`}
            >
              C2C Contractor Templates (3)
            </button>
          </div>
        </div>

        {/* Grid of Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {activeTemplates.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              id={tpl.id}
              name={tpl.name}
              description={tpl.description}
              badgeText="ATS Verified"
              onPreview={(id) => setPreviewTemplateId(id)}
            />
          ))}
        </div>
      </div>

      {/* Full-size interactive preview modal */}
      {previewTemplateId && (
        <TemplatePreviewModal
          templateId={previewTemplateId}
          onClose={() => setPreviewTemplateId(null)}
          onSelect={handleSelectTemplate}
        />
      )}
    </>
  )
}

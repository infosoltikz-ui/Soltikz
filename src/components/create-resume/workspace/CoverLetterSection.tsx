'use client'

import { useState } from 'react'
import { FileSignature, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CoverLetterViewer } from '../CoverLetterViewer'
import { toast } from 'react-hot-toast'
import type { CoverLetterResponseData } from '../coverLetterTypes'

interface CoverLetterSectionProps {
  resumeId: string | null
  candidateName?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  companyName?: string
  jobTitle?: string
}

export function CoverLetterSection({
  resumeId,
  candidateName,
  email,
  phone,
  location,
  linkedin,
  companyName,
  jobTitle
}: CoverLetterSectionProps) {
  const [coverLetterRes, setCoverLetterRes] = useState<CoverLetterResponseData | null>(null)
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false)

  const handleGenerateCoverLetter = async () => {
    if (!resumeId) {
      toast.error('No resume selected to write a cover letter for.')
      return
    }
    setIsGeneratingCoverLetter(true)
    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to generate cover letter')
      setCoverLetterRes(data.cover_letter)
      toast.success('Cover letters generated!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate cover letter')
    } finally {
      setIsGeneratingCoverLetter(false)
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] flex items-center justify-center text-[#0F2744]">
            <FileSignature className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-slate-900">Tailored Cover Letter</h3>
            <p className="text-[12px] font-medium text-slate-500">Grounded in your real experience, matched to this JD</p>
          </div>
        </div>
      </div>

      {!coverLetterRes ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-[#F8FAFC] border border-dashed border-slate-200">
          <p className="text-[13.5px] text-slate-600 font-medium max-w-md mx-auto mb-5 leading-relaxed">
            Generate a cover letter written from your Master Profile and tailored directly to this job description&apos;s priorities.
          </p>
          <Button
            onClick={handleGenerateCoverLetter}
            disabled={isGeneratingCoverLetter}
            className="h-11 px-7 rounded-xl font-extrabold bg-[#0F2744] hover:bg-[#0A1C33] text-white shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {isGeneratingCoverLetter ? <Loader2 className="w-4 h-4 animate-spin text-[#F59E0B]" /> : <Sparkles className="w-4 h-4 text-[#F59E0B]" />}
              {isGeneratingCoverLetter ? 'Generating...' : 'Generate Cover Letter'}
            </div>
          </Button>
        </div>
      ) : (
        <CoverLetterViewer
          content={coverLetterRes}
          candidateName={candidateName}
          email={email}
          phone={phone}
          location={location}
          linkedin={linkedin}
          companyName={companyName}
          jobTitle={jobTitle}
          documentTitle="Cover_Letter"
        />
      )}
    </div>
  )
}

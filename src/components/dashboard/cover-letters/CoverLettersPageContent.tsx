'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FileSignature,
  Loader2,
  Sparkles,
  Trash2,
  Eye,
  X,
  Building2,
  Calendar,
  FilePlus2,
  ArrowRight,
} from 'lucide-react'
import { formatDistanceToNow, differenceInDays } from 'date-fns'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { CoverLetterViewer } from '@/components/create-resume/CoverLetterViewer'
import type { CoverLetterResponseData } from '@/components/create-resume/coverLetterTypes'

interface EligibleResume {
  id: string
  title: string
  company_name?: string
  job_title?: string
}

interface CoverLetterRow {
  id: string
  content: CoverLetterResponseData
  created_at: string
  resume_title: string
  company_name?: string
}

function extractCompanyFromTitle(title?: string): string {
  if (!title) return 'Target Employer'
  const parts = title.split('-').map((s) => s.trim())
  if (parts.length > 1) {
    const rawComp = parts.slice(1).join(' - ').trim()
    if (rawComp && !rawComp.toLowerCase().includes('unknown') && rawComp !== 'Draft') {
      return rawComp
    }
  }
  return 'Target Employer'
}

export function CoverLettersPageContent() {
  const [loading, setLoading] = useState(true)
  const [coverLetters, setCoverLetters] = useState<CoverLetterRow[]>([])
  const [eligibleResumes, setEligibleResumes] = useState<EligibleResume[]>([])
  const [candidateName, setCandidateName] = useState('')
  const [candidateContact, setCandidateContact] = useState({
    email: '',
    phone: '',
    location: '',
    linkedin: '',
  })

  const [selectedResumeId, setSelectedResumeId] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewing, setViewing] = useState<CoverLetterRow | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const fetchData = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: profile }, { data: letters }, { data: resumes }] = await Promise.all([
      supabase
        .from('profiles')
        .select('full_name, email, phone, location, master_resume_data')
        .eq('id', user.id)
        .single(),
      supabase
        .from('cover_letters')
        .select(
          'id, content, created_at, resumes_v2 ( title, parsed_job_descriptions ( company_name, job_title ) )'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('resumes_v2')
        .select('id, title, parsed_job_descriptions ( company_name, job_title )')
        .eq('user_id', user.id)
        .not('parsed_jd_id', 'is', null)
        .order('created_at', { ascending: false }),
    ])

    const master = (profile?.master_resume_data as any) || {}
    const pInfo = master.personal_info || master.contact || {}
    const fullName =
      profile?.full_name ||
      `${pInfo.firstName || ''} ${pInfo.lastName || ''}`.trim() ||
      'Candidate'

    setCandidateName(fullName)
    setCandidateContact({
      email: profile?.email || user.email || pInfo.email || '',
      phone: profile?.phone || pInfo.phone || '',
      location: profile?.location || pInfo.location || '',
      linkedin: pInfo.linkedin || '',
    })

    setCoverLetters(
      (letters || []).map((l: any) => {
        const resume = Array.isArray(l.resumes_v2) ? l.resumes_v2[0] : l.resumes_v2
        const jd = Array.isArray(resume?.parsed_job_descriptions)
          ? resume.parsed_job_descriptions[0]
          : resume?.parsed_job_descriptions

        let compName = jd?.company_name
        if (
          !compName ||
          compName.toLowerCase().includes('unknown') ||
          compName === 'N/A' ||
          compName === 'Draft'
        ) {
          compName = extractCompanyFromTitle(resume?.title)
        }

        return {
          id: l.id,
          content: l.content,
          created_at: l.created_at,
          resume_title: resume?.title || 'Untitled Resume',
          company_name: compName,
        }
      })
    )

    setEligibleResumes(
      (resumes || []).map((r: any) => {
        const jd = Array.isArray(r.parsed_job_descriptions)
          ? r.parsed_job_descriptions[0]
          : r.parsed_job_descriptions

        let compName = jd?.company_name
        if (
          !compName ||
          compName.toLowerCase().includes('unknown') ||
          compName === 'N/A' ||
          compName === 'Draft'
        ) {
          compName = extractCompanyFromTitle(r.title)
        }

        return {
          id: r.id,
          title: r.title,
          company_name: compName,
          job_title: jd?.job_title,
        }
      })
    )

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleGenerate = async () => {
    if (!selectedResumeId) {
      toast.error('Pick a resume to base the cover letter on first.')
      return
    }
    setIsGenerating(true)
    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: selectedResumeId }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to generate cover letter')
      toast.success('Cover letter generated!')
      setSelectedResumeId('')
      fetchData()
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate cover letter')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const supabase = createClient()
    await supabase.from('cover_letters').delete().eq('id', id)
    if (viewing?.id === id) setViewing(null)
    await fetchData()
    setDeletingId(null)
    setDeleteConfirmId(null)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-20 flex flex-col items-center justify-center gap-3 shadow-xs">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F2744]" />
        <p className="text-xs font-bold text-slate-500">Loading your cover letters...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Generate Composer Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15.5px] font-extrabold text-slate-900">
                Generate a Tailored Cover Letter
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Pick one of your tailored resumes to draft a matching executive letter.
              </p>
            </div>
          </div>

          <span className="text-xs font-extrabold text-[#0F2744] bg-[#EEF4FA] border border-[#0F2744]/10 px-3 py-1 rounded-lg tabular-nums self-start md:self-auto">
            {coverLetters.length} Saved
          </span>
        </div>

        {eligibleResumes.length === 0 ? (
          <div className="bg-slate-50/80 rounded-xl border border-slate-200/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs font-medium text-slate-600">
              You don&apos;t have any tailored resumes with a job description yet. Create a tailored resume first to unlock cover letter generation.
            </p>
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-[#0F2744] hover:bg-[#0A1C33] px-4 py-2 rounded-xl shrink-0 transition-colors self-start sm:self-auto"
            >
              <FilePlus2 className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Create Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              fullWidth={false}
              className="sm:flex-1 max-w-xl h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white text-xs font-semibold"
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              placeholder="Select a tailored resume..."
              options={eligibleResumes.map((r) => ({
                value: r.id,
                label: `${r.title}${r.company_name ? ` - ${r.company_name}` : ''}`,
              }))}
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !selectedResumeId}
              className="h-11 px-6 rounded-xl font-extrabold text-xs bg-[#0F2744] hover:bg-[#0A1C33] disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#F59E0B]" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              )}
              <span>{isGenerating ? 'Writing Letter...' : 'Generate Cover Letter'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Saved Cover Letters Grid */}
      {coverLetters.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 sm:p-16 flex flex-col items-center justify-center text-center shadow-2xs">
          <div className="w-16 h-16 bg-[#EEF4FA] border border-[#0F2744]/10 rounded-2xl flex items-center justify-center mb-5">
            <FileSignature className="w-8 h-8 text-[#0F2744]" strokeWidth={1.9} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">No cover letters yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs font-medium leading-relaxed">
            Choose any tailored resume above to generate a matching narrative cover letter in seconds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {coverLetters.map((letter) => {
            const daysOld = differenceInDays(new Date(), new Date(letter.created_at))
            const daysRemaining = 20 - daysOld
            return (
              <div
                key={letter.id}
                className="group bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col shadow-xs hover:shadow-xl hover:shadow-slate-900/[0.04] hover:border-[#0F2744]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] border border-[#0F2744]/10 flex items-center justify-center text-[#0F2744] group-hover:bg-[#0F2744] group-hover:text-[#F59E0B] transition-colors">
                    <FileSignature className="w-5 h-5" />
                  </div>
                  {candidateName && (
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                      {candidateName}
                    </span>
                  )}
                </div>

                <h3 className="text-[15.5px] font-extrabold text-slate-900 mb-1 line-clamp-1 group-hover:text-[#0F2744] transition-colors">
                  {letter.resume_title}
                </h3>

                {letter.company_name && (
                  <div className="flex items-center gap-1.5 text-xs text-[#0F2744] font-bold mb-3">
                    <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{letter.company_name}</span>
                  </div>
                )}

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4 flex-1 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  {letter.content.variations?.[0]?.paragraphs?.[0] || 'No preview available.'}
                </p>

                <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                      <Calendar className="w-3 h-3 shrink-0" />
                      {formatDistanceToNow(new Date(letter.created_at), { addSuffix: true })}
                    </span>
                    {daysRemaining <= 5 && daysRemaining > 0 && (
                      <span className="text-[10px] font-bold text-amber-600 mt-0.5">
                        Expires in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
                      </span>
                    )}
                    {daysRemaining <= 0 && (
                      <span className="text-[10px] font-bold text-rose-600 mt-0.5">
                        Pending cleanup
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setViewing(letter)}
                      className="px-3 py-1.5 rounded-xl bg-[#EEF4FA] hover:bg-[#0F2744] text-[#0F2744] hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(letter.id)}
                      disabled={deletingId === letter.id}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50 cursor-pointer"
                      title="Delete Cover Letter"
                    >
                      {deletingId === letter.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Viewer Modal */}
      {viewing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 py-8">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setViewing(null)}
          />
          <div className="relative bg-[#F8FAFC] rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-full overflow-y-auto z-10 p-5 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5 bg-[#0F2744] text-white px-5 py-4 rounded-2xl shadow-sm">
              <div>
                <h3 className="text-base font-extrabold">{viewing.resume_title}</h3>
                {viewing.company_name && (
                  <p className="text-xs font-bold text-[#F59E0B] mt-0.5">
                    {viewing.company_name}
                  </p>
                )}
              </div>
              <button
                onClick={() => setViewing(null)}
                aria-label="Close cover letter viewer"
                className="text-slate-300 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <CoverLetterViewer
              content={viewing.content}
              candidateName={candidateName}
              email={candidateContact.email}
              phone={candidateContact.phone}
              location={candidateContact.location}
              linkedin={candidateContact.linkedin}
              companyName={viewing.company_name}
              documentTitle={`Cover_Letter_${viewing.resume_title}`}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-sm p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1.5">
              Delete Cover Letter?
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">
              This action cannot be undone. Are you sure you want to permanently remove this cover letter?
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 h-10 rounded-xl font-bold text-xs cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={!!deletingId}
                className="flex-1 h-10 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white border-transparent cursor-pointer"
              >
                {deletingId === deleteConfirmId ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                ) : null}
                {deletingId === deleteConfirmId ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

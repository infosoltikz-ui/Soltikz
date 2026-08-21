'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileSignature, Loader2, Sparkles, Trash2, Eye, X, Building2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { CoverLetterViewer } from '@/components/create-resume/CoverLetterViewer'
import type { CoverLetterData } from '@/components/create-resume/coverLetterTypes'

interface EligibleResume {
  id: string
  title: string
  company_name?: string
  job_title?: string
}

interface CoverLetterRow {
  id: string
  content: CoverLetterData
  created_at: string
  resume_title: string
  company_name?: string
}

export function CoverLettersPageContent() {
  const [loading, setLoading] = useState(true)
  const [coverLetters, setCoverLetters] = useState<CoverLetterRow[]>([])
  const [eligibleResumes, setEligibleResumes] = useState<EligibleResume[]>([])
  const [candidateName, setCandidateName] = useState('')

  const [selectedResumeId, setSelectedResumeId] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewing, setViewing] = useState<CoverLetterRow | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: profile }, { data: letters }, { data: resumes }] = await Promise.all([
      supabase.from('profiles').select('full_name').eq('id', user.id).single(),
      supabase
        .from('cover_letters')
        .select('id, content, created_at, resumes_v2 ( title, parsed_job_descriptions ( company_name ) )')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('resumes_v2')
        .select('id, title, parsed_job_descriptions ( company_name, job_title )')
        .eq('user_id', user.id)
        .not('parsed_jd_id', 'is', null)
        .order('created_at', { ascending: false }),
    ])

    setCandidateName(profile?.full_name || '')

    setCoverLetters((letters || []).map((l: any) => {
      const resume = Array.isArray(l.resumes_v2) ? l.resumes_v2[0] : l.resumes_v2
      const jd = Array.isArray(resume?.parsed_job_descriptions) ? resume.parsed_job_descriptions[0] : resume?.parsed_job_descriptions
      return {
        id: l.id,
        content: l.content,
        created_at: l.created_at,
        resume_title: resume?.title || 'Untitled Resume',
        company_name: jd?.company_name,
      }
    }))

    setEligibleResumes((resumes || []).map((r: any) => {
      const jd = Array.isArray(r.parsed_job_descriptions) ? r.parsed_job_descriptions[0] : r.parsed_job_descriptions
      return {
        id: r.id,
        title: r.title,
        company_name: jd?.company_name,
        job_title: jd?.job_title,
      }
    }))

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
    if (!window.confirm('Delete this cover letter?')) return
    setDeletingId(id)
    const supabase = createClient()
    await supabase.from('cover_letters').delete().eq('id', id)
    if (viewing?.id === id) setViewing(null)
    await fetchData()
    setDeletingId(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center p-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      {/* Generate New */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="text-[15px] font-black text-slate-900 mb-1">Generate a New Cover Letter</h3>
        <p className="text-[13px] font-medium text-slate-500 mb-4">
          Pick one of your tailored resumes — the cover letter is written to match that resume's job description.
        </p>

        {eligibleResumes.length === 0 ? (
          <div className="text-[13px] font-medium text-slate-500">
            You don't have any tailored resumes yet.{' '}
            <Link href="/dashboard/create" className="text-primary font-bold hover:underline">Create one first</Link>, then come back here.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              fullWidth={false}
              className="sm:w-96"
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              placeholder="Select a resume..."
              options={eligibleResumes.map((r) => ({
                value: r.id,
                label: `${r.title}${r.company_name ? ` — ${r.company_name}` : ''}`,
              }))}
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedResumeId}
              className="h-10 px-5 rounded-xl font-bold shrink-0"
              leftIcon={isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        )}
      </div>

      {/* List */}
      {coverLetters.length === 0 ? (
        <div className="bg-[#FAFAF8] rounded-2xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
            <FileSignature className="w-10 h-10 text-primary" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">No cover letters yet</h3>
          <p className="text-[14px] text-slate-500 max-w-[320px]">
            Generate one above from any resume you've already created.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {coverLetters.map((letter) => (
            <div key={letter.id} className="bg-[#FAFAF8] rounded-2xl border border-slate-200 p-5 flex flex-col hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <FileSignature className="w-5 h-5" />
              </div>
              <h3 className="text-[15px] font-black text-slate-900 mb-1 line-clamp-1">{letter.resume_title}</h3>
              {letter.company_name && (
                <div className="flex items-center gap-1.5 text-[13px] text-slate-500 font-medium mb-3">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {letter.company_name}
                </div>
              )}
              <p className="text-[12px] text-slate-500 line-clamp-2 mb-4 flex-1">
                {letter.content.paragraphs?.[0]}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400">
                  {formatDistanceToNow(new Date(letter.created_at), { addSuffix: true })}
                </span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setViewing(letter)} className="text-slate-400 hover:text-slate-900 transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(letter.id)} disabled={deletingId === letter.id} className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50" title="Delete">
                    {deletingId === letter.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Viewer Modal */}
      {viewing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setViewing(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-2xl max-h-[85vh] overflow-y-auto z-10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[16px] font-black text-slate-900">{viewing.resume_title}</h3>
                {viewing.company_name && <p className="text-[12px] font-medium text-slate-500">{viewing.company_name}</p>}
              </div>
              <button onClick={() => setViewing(null)} className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <CoverLetterViewer content={viewing.content} candidateName={candidateName} documentTitle={`Cover_Letter_${viewing.resume_title}`} />
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'
import { ResumeStats } from './ResumeStats'
import { ResumeToolbar, ResumeFilterType, ResumeSortBy } from './ResumeToolbar'
import { ResumeGrid, ResumeRow } from './ResumeGrid'

export function ResumesPageContent() {
  const [resumes, setResumes] = useState<ResumeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [togglingShareId, setTogglingShareId] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<ResumeFilterType>('all')
  const [sortBy, setSortBy] = useState<ResumeSortBy>('newest')

  const fetchResumes = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('resumes_v2')
      .select(`
        *,
        ats_analyses ( overall_score ),
        parsed_job_descriptions ( company_name, job_title )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setResumes(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return
    const supabase = createClient()
    await supabase.from('resumes_v2').delete().eq('id', id)
    fetchResumes()
  }

  const handleDuplicate = async (resume: ResumeRow) => {
    setDuplicatingId(resume.id)
    const supabase = createClient()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not signed in')

      const { data: newResume, error: insertError } = await supabase
        .from('resumes_v2')
        .insert({
          user_id: user.id,
          parent_id: resume.id,
          parsed_jd_id: (resume as any).parsed_jd_id,
          strategy_id: (resume as any).strategy_id,
          resume_type: resume.resume_type,
          status: resume.status,
          version_number: (resume.version_number || 1) + 1,
          title: `${resume.title} (Copy)`,
        })
        .select()
        .single()

      if (insertError || !newResume) throw insertError || new Error('Failed to create duplicate')

      const { data: sections } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('resume_id', resume.id)

      if (sections && sections.length > 0) {
        const clonedSections = sections.map((s: any) => ({
          resume_id: newResume.id,
          section_type: s.section_type,
          content: s.content,
          is_locked: s.is_locked,
          is_ai_generated: s.is_ai_generated,
          confidence_score: s.confidence_score,
          jd_match_score: s.jd_match_score,
        }))
        await supabase.from('resume_sections').insert(clonedSections)
      }

      toast.success('Resume duplicated')
      fetchResumes()
    } catch (error: any) {
      console.error('Duplicate failed:', error)
      toast.error(error.message || 'Failed to duplicate resume')
    } finally {
      setDuplicatingId(null)
    }
  }

  const handleToggleShare = async (resume: ResumeRow) => {
    setTogglingShareId(resume.id)
    const supabase = createClient()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not signed in')

      if (resume.is_public) {
        // Turning off: just flip the flag, keep the slug in case they re-enable later
        const { error } = await supabase.from('resumes_v2').update({ is_public: false }).eq('id', resume.id)
        if (error) throw error
        toast.success('Resume is now private')
      } else {
        // Turning on: snapshot the current profile display fields (never expose the
        // profiles table itself to public viewers) and generate a slug if needed
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        const personalInfo = profile?.master_resume_data?.personal_info || {}
        const publicSnapshot = {
          full_name: profile?.full_name || '',
          email: profile?.email || '',
          phone: profile?.phone || '',
          location: personalInfo.location || '',
          linkedin: personalInfo.linkedin || '',
        }

        const slug = resume.share_slug || crypto.randomUUID().replace(/-/g, '').slice(0, 10)

        const { error } = await supabase
          .from('resumes_v2')
          .update({ is_public: true, share_slug: slug, public_snapshot: publicSnapshot })
          .eq('id', resume.id)
        if (error) throw error

        const publicUrl = `${window.location.origin}/r/${slug}`
        await navigator.clipboard.writeText(publicUrl)
        toast.success('Public link copied to clipboard!')
      }
      fetchResumes()
    } catch (error: any) {
      console.error('Toggle share failed:', error)
      toast.error(error.message || 'Failed to update sharing settings')
    } finally {
      setTogglingShareId(null)
    }
  }

  const filteredResumes = useMemo(() => {
    let result = [...resumes]

    if (filterType !== 'all') {
      result = result.filter((r) => r.resume_type === filterType)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((r) => {
        const jd = r.parsed_job_descriptions
        return (
          r.title?.toLowerCase().includes(q) ||
          jd?.company_name?.toLowerCase().includes(q) ||
          jd?.job_title?.toLowerCase().includes(q)
        )
      })
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        case 'ats-desc':
          return (b.ats_analyses?.[0]?.overall_score || 0) - (a.ats_analyses?.[0]?.overall_score || 0)
        case 'ats-asc':
          return (a.ats_analyses?.[0]?.overall_score || 0) - (b.ats_analyses?.[0]?.overall_score || 0)
        case 'newest':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

    return result
  }, [resumes, searchQuery, filterType, sortBy])

  return (
    <>
      <ResumeStats />

      <div className="w-full">
        <ResumeToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterChange={setFilterType}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ResumeGrid
          resumes={filteredResumes}
          loading={loading}
          hasAnyResumes={resumes.length > 0}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          duplicatingId={duplicatingId}
          onToggleShare={handleToggleShare}
          togglingShareId={togglingShareId}
          lastUpdatedLabel={(iso) => formatDistanceToNow(new Date(iso), { addSuffix: true })}
        />
      </div>
    </>
  )
}

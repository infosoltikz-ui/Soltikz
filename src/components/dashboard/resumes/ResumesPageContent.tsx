'use client'

import { useEffect, useMemo, useState, useRef, Suspense, lazy } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'
import { exportToPdf } from '@/utils/exportPdf'
import { getTemplateById } from '@/components/create-resume/templates/registry'
import { ResumeStats } from './ResumeStats'
import { ResumeToolbar, ResumeFilterType, ResumeSortBy } from './ResumeToolbar'
import { ResumeGrid, ResumeRow } from './ResumeGrid'
// Lazy-load heavy modals — not bundled until user opens them
const ResumePreviewModal = lazy(() => import('./ResumePreviewModal').then(m => ({ default: m.ResumePreviewModal })))
const ResumeEditorModal = lazy(() => import('./ResumeEditorModal').then(m => ({ default: m.ResumeEditorModal })))

function extractCompanyFromTitle(title?: string): string {
  if (!title) return 'Target Employer'
  const parts = title.split('-').map(s => s.trim())
  if (parts.length > 1) {
    const rawComp = parts.slice(1).join(' - ').trim()
    if (rawComp && !rawComp.toLowerCase().includes('unknown') && rawComp !== 'Draft') {
      return rawComp
    }
  }
  return 'Target Employer'
}

export function ResumesPageContent() {
  const [resumes, setResumes] = useState<ResumeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [togglingShareId, setTogglingShareId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<ResumeFilterType>('all')
  const [sortBy, setSortBy] = useState<ResumeSortBy>('newest')
  const [previewResume, setPreviewResume] = useState<ResumeRow | null>(null)
  const [editingResume, setEditingResume] = useState<ResumeRow | null>(null)

  const [printableResume, setPrintableResume] = useState<{
    resumeData: any
    profileData: any
    templateId: string
    themeColor?: string
    fontFamily?: string
    sectionStyles?: Record<string, any>
    title: string
  } | null>(null)

  const printRef = useRef<HTMLDivElement>(null)

  // Print state is no longer needed for html2pdf in the same way,
  // but we still need a ref for the off-screen template.

  const fetchResumes = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    try {
      let resumesList: any[] = []

      // First attempt: full relational query
      const { data, error } = await supabase
        .from('resumes_v2')
        .select(`
          *,
          ats_analyses ( overall_score ),
          parsed_job_descriptions ( company_name, job_title )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        resumesList = data
      } else {
        // Fallback: fetch resumes directly
        const { data: rawResumes, error: rawError } = await supabase
          .from('resumes_v2')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (rawResumes && rawResumes.length > 0) {
          const resumeIds = rawResumes.map((r: any) => r.id)
          const [atsResult, jdResult] = await Promise.all([
            supabase.from('ats_analyses').select('resume_id, overall_score').in('resume_id', resumeIds),
            supabase.from('parsed_job_descriptions').select('id, company_name, job_title').eq('user_id', user.id)
          ])

          const atsMap: Record<string, number> = {}
          atsResult.data?.forEach((a: any) => {
            if (!atsMap[a.resume_id] || a.overall_score > atsMap[a.resume_id]) {
              atsMap[a.resume_id] = a.overall_score
            }
          })

          const jdMap: Record<string, { company_name?: string; job_title?: string }> = {}
          jdResult.data?.forEach((jd: any) => {
            jdMap[jd.id] = { company_name: jd.company_name, job_title: jd.job_title }
          })

          resumesList = rawResumes.map((r: any) => ({
            ...r,
            ats_analyses: atsMap[r.id] != null ? [{ overall_score: atsMap[r.id] }] : [],
            parsed_job_descriptions: r.parsed_jd_id ? jdMap[r.parsed_jd_id] || null : null
          }))
        }
      }

      // Batch fetch sections and profile data for all resumes
      const resumeIds = resumesList.map((r: any) => r.id)
      let sectionsByResumeId: Record<string, Record<string, any>> = {}
      let candidateName = 'Candidate'
      let profileInfo: any = {}

      if (resumeIds.length > 0) {
        const [sectionsResult, profileResult] = await Promise.all([
          supabase
            .from('resume_sections')
            .select('resume_id, section_type, content')
            .in('resume_id', resumeIds),
          supabase
            .from('profiles')
            .select('full_name, master_resume_data')
            .eq('id', user.id)
            .single()
        ])

        if (sectionsResult.data) {
          sectionsResult.data.forEach((sec: any) => {
            if (!sectionsByResumeId[sec.resume_id]) {
              sectionsByResumeId[sec.resume_id] = {}
            }
            const key = (sec.section_type || '').toLowerCase()
            sectionsByResumeId[sec.resume_id][key] = sec.content
          })
        }

        if (profileResult.data) {
          const prof = profileResult.data
          const pInfo = prof.master_resume_data?.personal_info || {}
          profileInfo = pInfo
          candidateName = prof.full_name || `${pInfo.firstName || ''} ${pInfo.lastName || ''}`.trim() || pInfo.fullName || 'Candidate'
        }
      }

      // Ensure every resume has a valid ATS score, clean company/role metadata, and real content
      const processedResumes = resumesList.map((r: any) => {
        const rawScore = Array.isArray(r.ats_analyses)
          ? r.ats_analyses[0]?.overall_score
          : r.ats_analyses?.overall_score

        // Use only the real ATS score from DB - never fake it
        let finalScore = rawScore || 0
        let jdObj = Array.isArray(r.parsed_job_descriptions) ? r.parsed_job_descriptions[0] : r.parsed_job_descriptions
        let compName = jdObj?.company_name
        if (!compName || compName.toLowerCase().includes('unknown') || compName === 'N/A' || compName === 'Draft') {
          compName = extractCompanyFromTitle(r.title)
        }

        // Extract real section data
        const sec = sectionsByResumeId[r.id] || {}

        // 1. Summary
        let summaryText = ''
        if (Array.isArray(sec.summary) && sec.summary.length > 0) {
          const raw = typeof sec.summary[0] === 'string' ? sec.summary[0] : ''
          summaryText = raw.replace(/\*\*/g, '').trim()
        } else if (typeof sec.summary === 'string') {
          summaryText = sec.summary.replace(/\*\*/g, '').trim()
        }

        // 2. Experience
        let experienceRole = ''
        let experienceCompany = ''
        let experienceBullet = ''
        if (Array.isArray(sec.experience) && sec.experience.length > 0) {
          const firstExp = sec.experience[0]
          if (firstExp) {
            experienceRole = firstExp.role || ''
            experienceCompany = firstExp.company || ''
            if (Array.isArray(firstExp.bullets) && firstExp.bullets.length > 0) {
              const rawB = typeof firstExp.bullets[0] === 'string' ? firstExp.bullets[0] : ''
              experienceBullet = rawB.replace(/\*\*/g, '').trim()
            }
          }
        }

        // 3. Skills
        let skillsList: string[] = []
        if (Array.isArray(sec.skills)) {
          sec.skills.forEach((item: any) => {
            if (typeof item === 'string') {
              skillsList.push(item)
            } else if (item && Array.isArray(item.items)) {
              skillsList.push(...item.items)
            }
          })
        }
        // Deduplicate and filter empty
        skillsList = Array.from(new Set(skillsList.filter(Boolean))).slice(0, 6)

        return {
          ...r,
          candidate_name: candidateName,
          summary_text: summaryText,
          experience_role: experienceRole,
          experience_company: experienceCompany,
          experience_bullet: experienceBullet,
          skills_list: skillsList,
          full_resume_data: sec,
          profile_data: profileInfo,
          ats_analyses: [{ overall_score: finalScore }],
          parsed_job_descriptions: {
            company_name: compName,
            job_title: jdObj?.job_title || experienceRole || 'Senior Software Engineer'
          }
        }
      })

      setResumes(processedResumes)
    } catch (err) {
      console.error('Error in fetchResumes:', err)
      setResumes([])
    } finally {
      setLoading(false)
    }
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

  const handleDownload = async (resume: ResumeRow) => {
    setDownloadingId(resume.id)
    const supabase = createClient()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not signed in')

      // 1. Fetch user profile
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      const pInfo = prof?.master_resume_data?.personal_info || {}
      const fullName = prof?.full_name || `${pInfo.firstName || ''} ${pInfo.lastName || ''}`.trim() || pInfo.fullName || 'Resume'
      const userProfile = {
        ...prof,
        full_name: fullName,
        email: prof?.email || pInfo.email || '',
        phone: prof?.phone || pInfo.phone || '',
        location: pInfo.location || prof?.location || '',
        linkedin: pInfo.linkedin || prof?.linkedin || ''
      }

      // 2. Fetch sections
      const { data: sections } = await supabase
        .from('resume_sections')
        .select('section_type, content')
        .eq('resume_id', resume.id)

      const reconstructed: any = {
        summary: [],
        skills: [],
        experience: [],
        education: [],
        certifications: []
      }

      if (sections && sections.length > 0) {
        sections.forEach((sec: any) => {
          const key = (sec.section_type || '').toLowerCase()
          reconstructed[key] = sec.content
        })
      }

      const isC2C = String(resume.resume_type || '').toLowerCase().includes('c2c')
      // Use the exact saved template_id — never fall back to a generic one
      const resolvedTemplateId =
        resume.template_id ||
        (isC2C ? 'c2c-modern' : 'modern')

      const savedThemeColor = resume.theme_color || undefined
      const savedFontFamily = resume.font_family || undefined
      const savedSectionStyles = resume.section_styles || undefined
      const docTitle = `${fullName.replace(/\s+/g, '_')}_${(resume.title || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '_')}`

      setPrintableResume({
        resumeData: reconstructed,
        profileData: userProfile,
        templateId: resolvedTemplateId,
        themeColor: savedThemeColor,
        fontFamily: savedFontFamily,
        sectionStyles: savedSectionStyles,
        title: docTitle
      })

      // Give React a tick to mount the template into printRef, then trigger PDF print dialog
      // Give React a tick to mount the template into printRef, then trigger PDF generation
      setTimeout(async () => {
        try {
          if (printRef.current) {
            toast.loading('Generating PDF...', { id: 'pdf-gen' })
            await exportToPdf(printRef.current, docTitle + '.pdf')
            toast.success('PDF downloaded successfully!', { id: 'pdf-gen' })
          } else {
            toast.error('Failed to locate resume layout for export')
          }
        } catch (err) {
          console.error('Print trigger error:', err)
          toast.error('Failed to generate PDF', { id: 'pdf-gen' })
        } finally {
          setDownloadingId(null)
          setPrintableResume(null) // Clean up
        }
      }, 150)
    } catch (err: any) {
      console.error('Download failed:', err)
      toast.error(err.message || 'Failed to download resume')
      setDownloadingId(null)
    }
  }

  const filteredResumes = useMemo(() => {
    let result = [...resumes]

    if (filterType !== 'all') {
      const isFilterC2C = filterType.toLowerCase().includes('c2c')
      result = result.filter((r) => {
        const isC2C = String(r.resume_type || '').toLowerCase().includes('c2c')
        return isFilterC2C ? isC2C : !isC2C
      })
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((r) => {
        const jd = Array.isArray(r.parsed_job_descriptions) ? r.parsed_job_descriptions[0] : r.parsed_job_descriptions
        return (
          r.title?.toLowerCase().includes(q) ||
          jd?.company_name?.toLowerCase().includes(q) ||
          jd?.job_title?.toLowerCase().includes(q)
        )
      })
    }

    result.sort((a, b) => {
      const aScore = Array.isArray(a.ats_analyses) ? a.ats_analyses[0]?.overall_score || 0 : (a.ats_analyses as any)?.overall_score || 0
      const bScore = Array.isArray(b.ats_analyses) ? b.ats_analyses[0]?.overall_score || 0 : (b.ats_analyses as any)?.overall_score || 0
      const aDate = new Date(a.updated_at || a.created_at || 0).getTime()
      const bDate = new Date(b.updated_at || b.created_at || 0).getTime()

      switch (sortBy) {
        case 'oldest':
          return aDate - bDate
        case 'ats-desc':
          return bScore - aScore
        case 'ats-asc':
          return aScore - bScore
        case 'newest':
        default:
          return bDate - aDate
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
          onDownload={handleDownload}
          downloadingId={downloadingId}
          onPreview={(resume) => setPreviewResume(resume)}
          onEdit={(resume) => setEditingResume(resume)}
          lastUpdatedLabel={(iso) => formatDistanceToNow(new Date(iso), { addSuffix: true })}
        />
      </div>

      {previewResume && (
        <Suspense fallback={null}>
          <ResumePreviewModal
            resume={previewResume}
            onClose={() => setPreviewResume(null)}
            onEdit={() => {
              const target = previewResume
              setPreviewResume(null)
              setEditingResume(target)
            }}
          />
        </Suspense>
      )}

      {editingResume && (
        <Suspense fallback={null}>
          <ResumeEditorModal
            resume={editingResume}
            onClose={() => setEditingResume(null)}
            onSaved={() => fetchResumes()}
          />
        </Suspense>
      )}

      {/* Hidden Print Container for High-Fidelity Exact Template PDF Export */}
      {printableResume && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-99999px',
            top: 0,
            width: '794px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -9999
          }}
        >
          <div ref={printRef}>
            {(() => {
              const template = getTemplateById(printableResume.templateId)
              const TemplateComponent = template.component
              return (
                <Suspense fallback={<div className="w-[794px] h-[1123px] bg-white" />}>
                  <TemplateComponent
                    resumeData={printableResume.resumeData}
                    profileData={printableResume.profileData}
                    themeColor={printableResume.themeColor}
                    fontFamily={printableResume.fontFamily}
                    sectionStyles={printableResume.sectionStyles}
                  />
                </Suspense>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}

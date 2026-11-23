import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { FileText, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Plus } from 'lucide-react'
import { ResumeSelector } from '@/components/dashboard/match-report/ResumeSelector'

export const dynamic = 'force-dynamic'

export default async function MatchReportPage(props: {
  searchParams?: Promise<{ id?: string }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fetch all resumes of the user to populate the selector
  const { data: allResumes } = await supabase
    .from('resumes_v2')
    .select('id, title, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  const resumesList = allResumes || []

  // If user has zero resumes, show clean empty state
  if (resumesList.length === 0) {
    return (
      <section className="view on p-6 max-w-4xl mx-auto" id="v-studio">
        <div className="bg-[#151D28] border border-[#26313F] rounded-3xl p-12 text-center shadow-lg my-10">
          <div className="w-16 h-16 rounded-2xl bg-[#123227] text-[#3FA57C] border border-[#3FA57C]/30 flex items-center justify-center mx-auto mb-5">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#E4EAF2] mb-3">No Tailored Resumes Found</h2>
          <p className="text-sm text-[#9FACBE] max-w-md mx-auto mb-8 leading-relaxed">
            Create your first job-matched resume in Resume Studio. Our ATS engine will analyze your qualifications against the job description and generate your comprehensive match score here.
          </p>
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A6E4E] hover:bg-[#0D8A62] text-white text-sm font-extrabold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#D9A441]" />
            <span>Create Tailored Resume</span>
          </Link>
        </div>
      </section>
    )
  }

  // 2. Determine target resume
  const selectedResumeId = searchParams?.id || resumesList[0]?.id

  const { data: targetResume } = await supabase
    .from('resumes_v2')
    .select(`
      id,
      title,
      resume_type,
      updated_at,
      created_at,
      parsed_job_descriptions ( company_name, job_title ),
      ats_analyses ( overall_score, category_scores, missing_keywords, improvement_suggestions )
    `)
    .eq('id', selectedResumeId)
    .eq('user_id', user.id)
    .single()

  const activeResume: any = targetResume || resumesList[0]
  const ats = activeResume?.ats_analyses?.[0]
  const hasAtsData = !!ats

  const score = ats?.overall_score ?? 0
  const categories = ats?.category_scores || {}
  const missingKeywords: string[] = Array.isArray(ats?.missing_keywords) ? ats.missing_keywords : []
  const suggestions: string[] = Array.isArray(ats?.improvement_suggestions) ? ats.improvement_suggestions : []

  const jdObj: any = Array.isArray(activeResume?.parsed_job_descriptions)
    ? activeResume?.parsed_job_descriptions[0]
    : activeResume?.parsed_job_descriptions

  let jobTitle = jdObj?.job_title
  let company = jdObj?.company_name

  if (!company || company.toLowerCase().includes('unknown') || company === 'N/A') {
    if (activeResume?.title && activeResume.title.includes(' - ')) {
      const parts = activeResume.title.split(' - ')
      jobTitle = jobTitle || parts[0].trim()
      company = parts.slice(1).join(' - ').trim()
    }
  }

  jobTitle = jobTitle || activeResume?.title || 'Target Position'
  company = company && !company.toLowerCase().includes('unknown') ? company : 'Target Employer'

  return (
    <section className="view on" id="v-studio">
      {/* Head */}
      <div className="head flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--line-soft)]">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>
              {jobTitle} - {company}
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[var(--brand-wash)] text-[var(--brand)] border border-[var(--line)]">
              {activeResume?.resume_type || 'Full-Time'}
            </span>
          </div>
          <p className="sub text-sm mt-1" style={{ color: 'var(--ink-2)' }}>
            Match Report: ATS Compatibility & Semantic Alignment Analysis
          </p>
        </div>

        <div className="head-actions flex flex-wrap items-center gap-2.5">
          {/* Resume Switcher Dropdown */}
          <ResumeSelector resumes={resumesList} selectedId={activeResume?.id} />

          <Link
            href={`/dashboard/create?id=${activeResume?.id || ''}`}
            className="btn text-xs font-bold px-3.5 py-2 rounded-xl"
            style={{ color: 'var(--ink)', border: '1px solid var(--line)' }}
          >
            Open in Editor
          </Link>
          <Link href="/dashboard/resumes" className="btn btn-primary text-xs font-bold px-4 py-2 rounded-xl">
            All Resumes
          </Link>
        </div>
      </div>

      {!hasAtsData ? (
        <div className="panel p-8 my-6 text-center rounded-2xl border border-[var(--line)]">
          <AlertCircle className="w-10 h-10 text-[var(--amber)] mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--ink)' }}>
            ATS Analysis In Progress
          </h3>
          <p className="text-xs max-w-md mx-auto mb-5" style={{ color: 'var(--ink-2)' }}>
            This resume was saved without a finalized ATS calculation. Open it in the editor and click "Check ATS Score" to evaluate compatibility against the job description.
          </p>
          <Link
            href={`/dashboard/create?id=${activeResume?.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:bg-[var(--brand-ink)] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calculate ATS Score Now</span>
          </Link>
        </div>
      ) : (
        /* Main Studio Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column: Score Breakdown */}
          <div className="panel p-6 lg:col-span-1 rounded-2xl border border-[var(--line)]">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--line-soft)]">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl num shrink-0"
                style={{
                  background: score >= 85 ? 'var(--brand-wash)' : score >= 70 ? 'var(--amber-wash)' : 'var(--flag-wash)',
                  color: score >= 85 ? 'var(--brand)' : score >= 70 ? 'var(--amber)' : 'var(--flag)',
                  border: '1px solid var(--line)',
                }}
              >
                {score}
              </div>
              <div>
                <b className="text-base block" style={{ color: 'var(--ink)' }}>Overall ATS Match</b>
                <span className="text-xs" style={{ color: 'var(--ink-2)' }}>
                  {score >= 85
                    ? 'High match: Tier-1 recruiter ready'
                    : score >= 70
                    ? 'Good match: minor keyword tuning recommended'
                    : 'Low match: add core skills from the job posting'}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>Category Scoring</h3>
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--ink-2)' }}>Keyword Match</span>
                  <span className="font-semibold num" style={{ color: 'var(--ink)' }}>
                    {categories?.keywordMatch ?? score}%
                  </span>
                </div>
                <div className="meter">
                  <i style={{ width: `${categories?.keywordMatch ?? score}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--ink-2)' }}>Skills Coverage</span>
                  <span className="font-semibold num" style={{ color: 'var(--ink)' }}>
                    {categories?.skillsCoverage ?? score}%
                  </span>
                </div>
                <div className="meter">
                  <i style={{ width: `${categories?.skillsCoverage ?? score}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--ink-2)' }}>Experience Relevance</span>
                  <span className="font-semibold num" style={{ color: 'var(--ink)' }}>
                    {categories?.experienceRelevance ?? score}%
                  </span>
                </div>
                <div className="meter">
                  <i style={{ width: `${categories?.experienceRelevance ?? score}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--ink-2)' }}>Formatting & ATS Safety</span>
                  <span className="font-semibold num" style={{ color: 'var(--ink)' }}>
                    {categories?.formatting ?? 100}%
                  </span>
                </div>
                <div className="meter">
                  <i style={{ width: `${categories?.formatting ?? 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Keyword Matches & Recommendations */}
          <div className="space-y-6 lg:col-span-2">
            {/* Missing Keywords */}
            <div className="panel p-6 rounded-2xl border border-[var(--line)]">
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                Identified Keyword Opportunities
              </h3>
              <p className="text-xs mb-4" style={{ color: 'var(--ink-2)' }}>
                {missingKeywords.length > 0
                  ? 'Adding these keywords into your experience bullet points can further optimize ATS keyword density.'
                  : 'Great job! No critical keyword omissions detected against this job posting.'}
              </p>
              {missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((kw: string, i: number) => (
                    <span key={i} className="chip chip-miss text-xs font-medium">
                      + {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[var(--brand)] font-semibold bg-[var(--brand-wash)] p-3 rounded-xl border border-[var(--line)]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>All major skills and technical requirements matched cleanly in the resume!</span>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="panel p-6 rounded-2xl border border-[var(--line)]">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>
                AI Optimization Recommendations
              </h3>
              <div className="space-y-3">
                {suggestions.length > 0 ? (
                  suggestions.map((sug: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                      <span style={{ color: 'var(--ink-2)' }}>{sug}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-3 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                      <span style={{ color: 'var(--ink-2)' }}>
                        Strong alignment with core competencies, technologies, and responsibilities in the job posting.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                      <span style={{ color: 'var(--ink-2)' }}>
                        Quantitative metrics and active action verbs are well positioned for recruiter screening.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                      <span style={{ color: 'var(--ink-2)' }}>
                        All standard ATS sections (Summary, Technical Skills, Experience, Education) verified.
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

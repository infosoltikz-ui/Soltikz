import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function ProfileCompletionBanner({ profile, onAction }: { profile?: any; onAction?: (tab: string) => void }) {
  const masterData = profile?.master_resume_data || {}
  const personalInfo = masterData?.personal_info || {}

  let completedPoints = 0
  const totalPoints = 5

  if (profile?.full_name || personalInfo?.firstName) completedPoints++
  if (profile?.email || personalInfo?.email) completedPoints++
  if (personalInfo?.summary || personalInfo?.targetRole) completedPoints++
  if ((masterData?.employment && masterData.employment.length > 0) || (masterData?.experience && masterData.experience.length > 0)) completedPoints++
  if (masterData?.education?.length > 0 && masterData?.skills?.length > 0) completedPoints++

  const completion = Math.round((completedPoints / totalPoints) * 100)

  // Determine next step
  let nextTab = 'personal'
  let nextLabel = 'Add Personal Details'
  let nextDesc = 'Provide your contact details and executive title.'

  if (!(masterData?.employment?.length > 0 || masterData?.experience?.length > 0)) {
    nextTab = 'employment'
    nextLabel = 'Add Work Experience'
    nextDesc = 'List your recent job roles with measurable achievements.'
  } else if (!masterData?.education?.length) {
    nextTab = 'education'
    nextLabel = 'Add Education'
    nextDesc = 'Add your university degree or highest qualification.'
  } else if (!masterData?.skills?.length) {
    nextTab = 'skills'
    nextLabel = 'Add Core Skills'
    nextDesc = 'Add key technical tools and competencies for ATS keyword matching.'
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mt-6 hover:border-slate-300 transition-colors">
      {/* Left: Score & Progress */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={completion >= 80 ? "text-emerald-600" : "text-primary"}
              strokeWidth="3.5"
              strokeDasharray={`${completion}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[12px] font-bold text-slate-900">{completion}%</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-[13px] font-bold text-slate-900">Profile Readiness</h4>
          <p className="text-[12px] text-slate-500 font-medium">
            {completion >= 80 
              ? 'Profile complete! Ready to generate high-scoring ATS resumes.' 
              : 'Complete your profile to maximize AI accuracy and match rates.'}
          </p>
        </div>
      </div>

      {/* Right: Next Step Action */}
      {completion < 100 && (
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <div className="hidden sm:block text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Recommended Next Step</span>
            <span className="text-[12px] font-semibold text-slate-700">{nextLabel}</span>
          </div>
          <button 
            onClick={() => onAction?.(nextTab)}
            className="h-8 px-3.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{nextLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

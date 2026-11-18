import { ArrowRight } from 'lucide-react'

export function ProfileCompletionBanner({
  profile,
  onAction,
}: {
  profile?: any
  onAction?: (tab: string) => void
}) {
  const masterData = profile?.master_resume_data || {}
  const personalInfo = masterData?.personal_info || {}

  let completedPoints = 0
  const totalPoints = 5

  if (profile?.full_name || personalInfo?.firstName) completedPoints++
  if (profile?.email || personalInfo?.email) completedPoints++
  if (personalInfo?.summary || personalInfo?.targetRole) completedPoints++
  if (
    (masterData?.employment && masterData.employment.length > 0) ||
    (masterData?.experience && masterData.experience.length > 0)
  ) {
    completedPoints++
  }
  if (masterData?.education?.length > 0 && masterData?.skills?.length > 0) completedPoints++

  const completion = Math.round((completedPoints / totalPoints) * 100)

  let nextTab = 'personal'
  let nextLabel = 'Add Personal Details'

  if (!(masterData?.employment?.length > 0 || masterData?.experience?.length > 0)) {
    nextTab = 'employment'
    nextLabel = 'Add Work Experience'
  } else if (!masterData?.education?.length) {
    nextTab = 'education'
    nextLabel = 'Add Education'
  } else if (!masterData?.skills?.length) {
    nextTab = 'skills'
    nextLabel = 'Add Core Skills'
  }

  return (
    <div className="bg-[#151D28] rounded-2xl border border-[#26313F] shadow-xs p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mt-6 hover:border-[#3FA57C]/40 transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#26313F]"
              strokeWidth="3.8"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={completion >= 80 ? 'text-[#3FA57C]' : 'text-[#D9A441]'}
              strokeWidth="3.8"
              strokeDasharray={`${completion}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-black text-[#E4EAF2] tabular-nums">{completion}%</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-[#E4EAF2]">Profile Readiness</h4>
          <p className="text-xs text-[#9FACBE] font-medium mt-0.5">
            {completion >= 80
              ? 'Profile complete! Ready to generate high-scoring ATS resumes.'
              : 'Complete your profile to maximize AI accuracy and match rates.'}
          </p>
        </div>
      </div>

      {completion < 100 && (
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#26313F]">
          <div className="hidden sm:block text-right">
            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#78859A] block">
              Recommended Next
            </span>
            <span className="text-xs font-bold text-[#E4EAF2]">{nextLabel}</span>
          </div>
          <button
            onClick={() => onAction?.(nextTab)}
            className="h-9 px-4 rounded-xl bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span>{nextLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
          </button>
        </div>
      )}
    </div>
  )
}

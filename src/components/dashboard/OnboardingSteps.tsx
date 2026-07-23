import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function OnboardingSteps({ profileCompletion, resumesCreated }: { profileCompletion: number, resumesCreated: number }) {
  // If they have completed the profile and generated a resume, they don't need onboarding anymore.
  if (profileCompletion === 100 && resumesCreated > 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-[16px] font-black text-indigo-950">Getting Started Guide</h2>
        <p className="text-[13px] font-medium text-indigo-700">Follow these 3 simple steps to generate your first ATS-optimized resume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className={`bg-white rounded-xl p-4 border ${profileCompletion === 100 ? 'border-green-200' : 'border-indigo-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Step 1</span>
            {profileCompletion === 100 ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-indigo-300" />
            )}
          </div>
          <h3 className="text-[14px] font-bold text-slate-900 mb-1">Complete Master Profile</h3>
          <p className="text-[12px] text-slate-500 mb-3">Fill in your experience, education, and skills once.</p>
          {profileCompletion < 100 && (
            <Link href="/dashboard/profile" className="inline-flex items-center text-[12px] font-bold text-primary hover:text-primary-dark transition-colors">
              Go to Profile <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          )}
        </div>

        {/* Step 2 */}
        <div className={`bg-white rounded-xl p-4 border ${resumesCreated > 0 ? 'border-green-200' : 'border-indigo-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Step 2</span>
            {resumesCreated > 0 ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-indigo-300" />
            )}
          </div>
          <h3 className="text-[14px] font-bold text-slate-900 mb-1">Find a Job Description</h3>
          <p className="text-[12px] text-slate-500 mb-3">Find your dream job online and copy the description.</p>
          {resumesCreated === 0 && profileCompletion === 100 && (
            <Link href="/dashboard/resumes" className="inline-flex items-center text-[12px] font-bold text-primary hover:text-primary-dark transition-colors">
              Create Resume <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          )}
        </div>

        {/* Step 3 */}
        <div className={`bg-white rounded-xl p-4 border ${resumesCreated > 0 ? 'border-green-200' : 'border-indigo-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Step 3</span>
            {resumesCreated > 0 ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-indigo-300" />
            )}
          </div>
          <h3 className="text-[14px] font-bold text-slate-900 mb-1">Generate AI Resume</h3>
          <p className="text-[12px] text-slate-500 mb-3">Let the AI rewrite your bullets to match the JD perfectly.</p>
        </div>
      </div>
    </div>
  )
}

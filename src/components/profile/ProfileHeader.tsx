import { User, ShieldCheck } from 'lucide-react'
import { UserMenu } from '@/components/dashboard/UserMenu'

export function ProfileHeader() {
  return (
    <header className="mb-6 pl-12 md:pl-0 pb-5 border-b border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight leading-tight">
              Master Career Profile
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Encrypted &amp; Private
            </span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">
            Maintain your centralized career history, credentials, and skills to power all AI-tailored resumes.
          </p>
        </div>

        <UserMenu />
      </div>
    </header>
  )
}

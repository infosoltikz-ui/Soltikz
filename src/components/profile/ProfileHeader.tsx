import { User } from 'lucide-react'
import { UserMenu } from '@/components/dashboard/UserMenu'

export function ProfileHeader() {
  return (
    <header className="mb-8">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        {/* Left: Titles */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-slate-900">Master Profile</h1>
          </div>
          <p className="text-[15px] font-medium text-slate-500 ml-[52px]">
            Build your profile once and use it to create multiple resumes.
          </p>
        </div>

        <UserMenu />
      </div>
    </header>
  )
}

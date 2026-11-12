import Link from 'next/link'
import { ShieldCheck, IdCard, Crown, ArrowUpRight, Sparkles } from 'lucide-react'

export function SettingsSidebar() {
  return (
    <div className="w-full xl:w-[320px] shrink-0 space-y-5">
      {/* Workspace Security & Tips Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#0F2744]" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] text-[#0F2744] flex items-center justify-center shrink-0 border border-slate-200/60">
            <ShieldCheck className="w-5 h-5" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
              Account &amp; Privacy
            </h3>
            <p className="text-[11.5px] font-medium text-slate-500">
              How your details are used
            </p>
          </div>
        </div>

        <ul className="space-y-3 text-[12.5px] text-slate-600 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
            <span>
              Your display name and phone populate resume headers automatically unless overridden in your Master Profile.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-2 shrink-0" />
            <span>
              Payment processing uses Razorpay encrypted checkout. Card details never touch our servers.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2744] mt-2 shrink-0" />
            <span>
              Keep your career timeline updated so AI bullets stay grounded in verified experience.
            </span>
          </li>
        </ul>

        <Link
          href="/dashboard/profile"
          className="mt-5 w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EEF4FA] border border-slate-200/80 text-[12.5px] font-bold text-[#0F2744] transition-colors group"
        >
          <span className="flex items-center gap-2">
            <IdCard className="w-4 h-4 text-[#0F2744]" />
            Edit Master Profile
          </span>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F2744] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Pro Upgrade Callout Card */}
      <div className="bg-[#0F2744] rounded-3xl p-6 text-white shadow-lg shadow-slate-900/10 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#F59E0B] text-[10.5px] font-extrabold uppercase tracking-wider mb-3">
            <Crown className="w-3 h-3" />
            <span>Soltkiz Pro</span>
          </div>

          <h4 className="text-[16px] font-extrabold text-white tracking-tight mb-1.5">
            Unlimited Tailored Resumes
          </h4>
          <p className="text-[12.5px] text-slate-300 leading-relaxed mb-5">
            Unlock Word (.docx) downloads, full ATS keyword gap reports, Cover Letter Studio, and STAR interview prep.
          </p>

          <Link
            href="/dashboard/pricing"
            className="w-full h-10 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0F2744] text-[13px] font-extrabold inline-flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compare Plans</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

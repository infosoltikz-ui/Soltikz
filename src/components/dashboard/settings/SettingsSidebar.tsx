import { Lightbulb } from 'lucide-react'

export function SettingsSidebar() {
  return (
    <div className="w-full xl:w-[320px] shrink-0 space-y-6">

      {/* Quick Tips */}
      <div className="bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-[15px] font-black text-slate-900 mb-5 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-orange-500 fill-orange-500" />
          Quick Tips
        </h3>

        <ul className="space-y-4">
          {[
            'Complete your profile to improve ATS results.',
            'Enable Two-Factor Authentication.',
            'Connect LinkedIn.',
            'Upgrade storage.',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span className="text-[13px] font-medium text-slate-600 leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

import { 
  CheckCircle2, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Eye, 
  Lightbulb,
  Circle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ProfileSidebar({ profile }: { profile?: any }) {
  const summaryItems = [
    { label: 'Name', value: profile?.full_name || 'User', icon: User },
    { label: 'Email', value: profile?.contact_email || 'Not provided', icon: Mail },
    { label: 'Location', value: profile?.location || 'Not provided', icon: MapPin },
    { label: 'LinkedIn', value: profile?.linkedin_url || 'Not provided', isSvg: true, svgPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  ]

  const tips = [
    { text: 'Add a professional summary', done: true },
    { text: 'Add at least one work experience', done: true },
    { text: 'Add skills relevant to your target role', done: true },
    { text: 'Add education details', done: true },
    { text: 'Add certifications (if any)', done: false },
  ]

  return (
    <div className="space-y-6">
      
      {/* Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-[16px] font-black text-slate-900 mb-5">Profile Summary</h3>
        
        <div className="bg-[#F0FDF4] rounded-xl p-4 flex items-start gap-3 border border-primary/20 mb-6">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <div>
            <div className="text-[13px] font-black text-slate-900">Great job!</div>
            <div className="text-[12px] font-medium text-slate-600 mt-0.5">Your profile is 95% complete.</div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {summaryItems.map((item, idx) => {
            return (
              <div key={idx} className="flex items-center gap-3">
                {item.isSvg ? (
                  <svg className="w-[18px] h-[18px] text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d={item.svgPath} />
                  </svg>
                ) : (
                  item.icon && <item.icon className="w-[18px] h-[18px] text-primary shrink-0" strokeWidth={2} />
                )}
                <div className="w-24 text-[12.5px] font-bold text-slate-700">{item.label}</div>
                <div className="flex-1 text-[12.5px] font-medium text-slate-500 truncate">{item.value}</div>
              </div>
            )
          })}
        </div>

        <Button 
          variant="outline" 
          className="w-full h-11 text-[13px] font-bold border-primary text-primary hover:bg-primary/5 rounded-xl"
          leftIcon={<Eye className="w-4 h-4" />}
        >
          Preview Full Profile
        </Button>
      </div>

      {/* Tips Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <Lightbulb className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />
          <h3 className="text-[14px] font-black text-slate-900">Tips for Better Profile</h3>
        </div>
        
        <div className="space-y-3.5">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {tip.done ? (
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" strokeWidth={2.5} />
              )}
              <span className={`text-[12.5px] leading-snug ${tip.done ? 'font-medium text-slate-600' : 'font-medium text-slate-400'}`}>
                {tip.text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

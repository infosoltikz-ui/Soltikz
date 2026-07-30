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
  const masterData = profile?.master_resume_data || {}
  const personalInfo = masterData?.personal_info || {}

  // Real data from profile
  const email = profile?.email || personalInfo?.email || null
  const location = personalInfo?.location || profile?.location || null
  const linkedin = personalInfo?.linkedin || profile?.linkedin_url || null
  const phone = profile?.phone || null

  // Calculate real profile completion
  let completion = 0
  if (profile?.full_name) completion += 20
  if (email) completion += 20
  if (phone) completion += 10
  if (location) completion += 10
  if (masterData?.experience?.length > 0) completion += 20
  if (masterData?.education?.length > 0) completion += 10
  if (masterData?.skills?.length > 0) completion += 10

  const summaryItems = [
    { label: 'Name', value: profile?.full_name || null, icon: User },
    { label: 'Email', value: email, icon: Mail },
    { label: 'Location', value: location, icon: MapPin },
    { label: 'LinkedIn', value: linkedin, isSvg: true, svgPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  ]

  // Dynamic tips based on real data
  const tips = [
    { text: 'Add your full name', done: !!profile?.full_name },
    { text: 'Add email & phone number', done: !!(email && phone) },
    { text: 'Add at least one work experience', done: masterData?.experience?.length > 0 },
    { text: 'Add education details', done: masterData?.education?.length > 0 },
    { text: 'Add skills relevant to your target role', done: masterData?.skills?.length > 0 },
    { text: 'Add certifications (if any)', done: masterData?.certifications?.length > 0 },
  ]

  return (
    <div className="space-y-4">
      
      {/* Profile Summary Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <h3 className="text-[14px] font-black text-slate-900 mb-3">Profile Summary</h3>
        
        <div className={`rounded-lg p-3 flex items-start gap-2.5 border mb-4 ${completion >= 80 ? 'bg-[#F0FDF4] border-primary/20' : completion >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${completion >= 80 ? 'bg-primary' : completion >= 50 ? 'bg-amber-500' : 'bg-red-400'}`}>
            <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
          <div>
            <div className="text-[12px] font-black text-slate-900">{completion >= 80 ? 'Great job!' : completion >= 50 ? 'Keep going!' : 'Just getting started!'}</div>
            <div className="text-[11px] font-medium text-slate-600 mt-0.5">Your profile is {completion}% complete.</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {summaryItems.map((item, idx) => {
            return (
              <div key={idx} className="flex items-center gap-2.5">
                {item.isSvg ? (
                  <svg className="w-[15px] h-[15px] text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d={item.svgPath} />
                  </svg>
                ) : (
                  item.icon && <item.icon className="w-[15px] h-[15px] text-primary shrink-0" strokeWidth={2} />
                )}
                <div className="w-16 text-[11.5px] font-bold text-slate-700">{item.label}</div>
                <div className={`flex-1 text-[11.5px] truncate ${item.value ? 'font-medium text-slate-700' : 'font-medium text-slate-300 italic'}`}>
                  {item.value || 'Not provided'}
                </div>
              </div>
            )
          })}
        </div>

        <Button 
          variant="outline" 
          className="w-full h-9 text-[12px] font-bold border-primary text-primary hover:bg-primary/5 rounded-lg"
          leftIcon={<Eye className="w-3.5 h-3.5" />}
        >
          Preview Full Profile
        </Button>
      </div>

      {/* Tips Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-yellow-500" strokeWidth={2.5} />
          <h3 className="text-[13px] font-black text-slate-900">Tips for Better Profile</h3>
        </div>
        
        <div className="space-y-2.5">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              {tip.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" strokeWidth={3} />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" strokeWidth={2.5} />
              )}
              <span className={`text-[11.5px] leading-snug ${tip.done ? 'font-medium text-slate-600' : 'font-medium text-slate-400'}`}>
                {tip.text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

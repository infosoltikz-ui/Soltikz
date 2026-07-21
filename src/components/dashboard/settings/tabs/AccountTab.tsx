import { User, Camera, Mail, Phone, Globe, Clock, Languages } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BottomActionBar } from '../BottomActionBar'

export function AccountTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Picture & Basic Info */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Profile Picture</h3>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
              <User className="w-10 h-10 text-slate-400" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/30 shadow-sm transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <div className="text-[14px] font-bold text-slate-900 mb-1">Upload a new photo</div>
            <div className="text-[13px] text-slate-500 mb-4">Recommended size is 256x256px. Max 2MB.</div>
            <Button variant="outline" className="h-9 px-4 text-[13px] font-bold rounded-lg border-slate-200">
              Choose File
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                defaultValue="Alexander Wright"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                defaultValue="alex.wright@example.com"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="tel" 
                defaultValue="+1 (555) 123-4567"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Country</label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <select className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Timezone</label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <select className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                <option>Pacific Time (PT)</option>
                <option>Eastern Time (ET)</option>
                <option>Central European Time (CET)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Language</label>
            <div className="relative">
              <Languages className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <select className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      <BottomActionBar />

    </div>
  )
}

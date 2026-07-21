import { Camera, MapPin, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PersonalInfoForm() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900 mb-1">Personal Information</h2>
        <p className="text-[13px] font-medium text-slate-500">Add your basic details here.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Avatar Upload */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative mb-4">
            <img 
              src="https://ui-avatars.com/api/?name=John+Doe&background=16A34A&color=fff&size=150" 
              alt="Avatar" 
              className="w-32 h-32 rounded-full border-4 border-slate-50 object-cover shadow-sm"
            />
            <button className="absolute bottom-1 right-1 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors shadow-sm">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-slate-500">JPG, PNG or WEBP</div>
            <div className="text-[10px] font-medium text-slate-400">Max size 2MB</div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                First name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                defaultValue="John" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Middle name
              </label>
              <input 
                type="text" 
                defaultValue="" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Last name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                defaultValue="Doe" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                defaultValue="john.doe@example.com" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Linkedin profile
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <input 
                  type="text" 
                  defaultValue="linkedin.com/in/johndoe" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  defaultValue="Bengaluru, Karnataka, India" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <Button className="h-11 px-6 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30">
              Save Changes
            </Button>
            <button className="h-11 px-6 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

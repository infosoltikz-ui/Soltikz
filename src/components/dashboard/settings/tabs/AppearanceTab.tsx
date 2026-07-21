import { Monitor, Moon, Sun, Type, LayoutGrid, Check } from 'lucide-react'
import { BottomActionBar } from '../BottomActionBar'
import { cn } from '@/utils/cn'

export function AppearanceTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Theme Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Theme</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-primary bg-[#F0FDF4] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden transition-all">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Sun className="w-6 h-6 text-primary" />
            </div>
            <div className="text-[14px] font-bold text-slate-900">Light</div>
            <div className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="border-2 border-slate-100 bg-slate-50 opacity-60 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-not-allowed transition-all">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Moon className="w-6 h-6 text-slate-400" />
            </div>
            <div className="text-[14px] font-bold text-slate-500">Dark (Coming Soon)</div>
          </div>

          <div className="border-2 border-slate-100 bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-slate-300 transition-all">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shadow-sm">
              <Monitor className="w-6 h-6 text-slate-600" />
            </div>
            <div className="text-[14px] font-bold text-slate-700">System</div>
          </div>
        </div>
      </div>

      {/* Interface Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Interface Settings</h3>
        
        <div className="space-y-8">
          
          <div>
            <div className="text-[14px] font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Type className="w-4 h-4 text-slate-400" /> Font Size
            </div>
            <div className="text-[13px] text-slate-500 mb-4">
              Adjust the base text size across the application.
            </div>
            <div className="flex gap-4">
              <button className="flex-1 h-12 border border-slate-200 rounded-xl bg-white text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">Small</button>
              <button className="flex-1 h-12 border-2 border-primary bg-[#F0FDF4] rounded-xl text-[14px] font-bold text-primary transition-colors">Medium</button>
              <button className="flex-1 h-12 border border-slate-200 rounded-xl bg-white text-[15px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">Large</button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <div className="text-[14px] font-bold text-slate-900 mb-1 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-slate-400" /> Dashboard Density
            </div>
            <div className="text-[13px] text-slate-500 mb-4">
              Choose how much whitespace is displayed in tables and lists.
            </div>
            <div className="flex gap-4">
              <button className="flex-1 h-12 border-2 border-primary bg-[#F0FDF4] rounded-xl text-[14px] font-bold text-primary transition-colors">Comfortable</button>
              <button className="flex-1 h-12 border border-slate-200 rounded-xl bg-white text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">Compact</button>
            </div>
          </div>
          
        </div>
      </div>

      <BottomActionBar />

    </div>
  )
}

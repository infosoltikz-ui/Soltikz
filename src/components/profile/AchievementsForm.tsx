import { Plus, Trash2, Trophy, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AchievementsForm() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[18px] font-black text-slate-900 mb-1">Achievements & Awards</h2>
          <p className="text-[13px] font-medium text-slate-500">List any notable awards, scholarships, or achievements.</p>
        </div>
        <Button className="h-9 px-4 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md shadow-primary/20" leftIcon={<Plus className="w-4 h-4" />}>
          Add Achievement
        </Button>
      </div>

      <div className="space-y-8">
        
        {/* Item 1 */}
        <div className="relative group p-6 rounded-2xl border border-slate-200 hover:border-primary/50 bg-slate-50/50 transition-colors">
          <button className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 hover:border-red-500 hover:text-red-500 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm">
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Title / Award Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Trophy className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  defaultValue="Employee of the Year" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Date Received
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="month" 
                  defaultValue="2022-12" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">
              Description (Optional)
            </label>
            <textarea 
              rows={3}
              defaultValue="Awarded for outstanding contribution to the core product redesign."
              className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-700 transition-colors resize-none leading-relaxed bg-white"
            ></textarea>
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
  )
}

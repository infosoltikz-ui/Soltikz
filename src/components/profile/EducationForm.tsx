import { Plus, Trash2, GraduationCap, Building } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function EducationForm() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[18px] font-black text-slate-900 mb-1">Education</h2>
          <p className="text-[13px] font-medium text-slate-500">Add your educational background, degrees, and institutions.</p>
        </div>
        <Button className="h-9 px-4 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md shadow-primary/20" leftIcon={<Plus className="w-4 h-4" />}>
          Add Education
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
                Degree / Course <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  defaultValue="Bachelors" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white appearance-none"
                >
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Institution / University <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  defaultValue="XYZ University" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Start Date
              </label>
              <input 
                type="month" 
                defaultValue="2016-08" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                End Date (or Expected)
              </label>
              <input 
                type="month" 
                defaultValue="2020-05" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Grade / CGPA
              </label>
              <input 
                type="text" 
                defaultValue="3.8 / 4.0" 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">
              Description (Optional)
            </label>
            <textarea 
              rows={3}
              defaultValue="Completed coursework in Data Structures, Algorithms, Database Management, and Artificial Intelligence."
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

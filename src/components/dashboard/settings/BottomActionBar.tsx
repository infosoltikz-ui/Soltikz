import { Button } from '@/components/ui/Button'

export function BottomActionBar() {
  return (
    <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
      <Button 
        variant="outline" 
        className="w-full sm:w-auto h-11 px-8 text-[14px] font-bold rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >
        Cancel
      </Button>
      <Button 
        className="w-full sm:w-auto h-11 px-8 text-[14px] font-bold rounded-xl shadow-sm"
      >
        Save All Changes
      </Button>
    </div>
  )
}

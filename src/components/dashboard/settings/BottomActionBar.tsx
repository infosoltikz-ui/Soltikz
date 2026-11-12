import { Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BottomActionBarProps {
  onSave?: () => void
  onCancel?: () => void
  saving?: boolean
}

export function BottomActionBar({ onSave, onCancel, saving }: BottomActionBarProps) {
  return (
    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={saving}
        className="w-full sm:w-auto h-11 px-6 text-[13.5px] font-bold rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
      >
        Reset
      </Button>
      <Button
        onClick={onSave}
        disabled={saving}
        className="w-full sm:w-auto h-11 px-7 text-[13.5px] font-bold rounded-xl bg-[#0F2744] hover:bg-[#0A1C33] text-white shadow-sm cursor-pointer transition-all"
        leftIcon={
          saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
          )
        }
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  )
}

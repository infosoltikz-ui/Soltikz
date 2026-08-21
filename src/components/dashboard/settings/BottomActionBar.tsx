import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BottomActionBarProps {
  onSave?: () => void
  onCancel?: () => void
  saving?: boolean
}

export function BottomActionBar({ onSave, onCancel, saving }: BottomActionBarProps) {
  return (
    <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={saving}
        className="w-full sm:w-auto h-11 px-8 text-[14px] font-bold rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        disabled={saving}
        className="w-full sm:w-auto h-11 px-8 text-[14px] font-bold rounded-xl shadow-sm"
        leftIcon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  )
}

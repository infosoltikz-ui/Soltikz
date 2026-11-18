import { Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BottomActionBarProps {
  onSave?: () => void
  onCancel?: () => void
  saving?: boolean
}

export function BottomActionBar({ onSave, onCancel, saving }: BottomActionBarProps) {
  return (
    <div className="mt-8 pt-6 border-t border-[#26313F] flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={saving}
        className="w-full sm:w-auto h-11 px-6 text-[13.5px] font-bold rounded-xl border-[#26313F] bg-[#1A2330] text-[#E4EAF2] hover:bg-[#222E3F] cursor-pointer"
      >
        Reset
      </Button>
      <Button
        onClick={onSave}
        disabled={saving}
        className="w-full sm:w-auto h-11 px-7 text-[13.5px] font-bold rounded-xl bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 shadow-sm cursor-pointer transition-all"
        leftIcon={
          saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4 text-[#D9A441]" strokeWidth={2.5} />
          )
        }
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  )
}

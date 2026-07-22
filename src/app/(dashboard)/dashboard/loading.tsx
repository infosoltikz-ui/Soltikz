import { Loader2 } from 'lucide-react'

export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-100"></div>
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin absolute inset-0"></div>
      </div>
      <p className="text-slate-500 font-medium text-sm animate-pulse">Loading module...</p>
    </div>
  )
}

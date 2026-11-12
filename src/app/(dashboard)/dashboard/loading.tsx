export default function DashboardLoading() {
  return (
    <div className="px-6 sm:px-8 pt-6 pb-12 max-w-[1600px] mx-auto space-y-6 animate-pulse">
      <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-slate-200 rounded" />
          <div className="h-8 w-52 bg-slate-200 rounded-lg" />
          <div className="h-4 w-64 bg-slate-100 rounded" />
        </div>
        <div className="h-12 w-44 bg-slate-200/80 rounded-2xl" />
      </div>

      <div className="h-14 w-full bg-slate-200/60 rounded-2xl" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="h-36 bg-white border border-slate-200/80 rounded-2xl" />
        <div className="h-36 bg-white border border-slate-200/80 rounded-2xl" />
        <div className="h-36 bg-white border border-slate-200/80 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-white border border-slate-200/80 rounded-2xl" />
        <div className="h-80 bg-white border border-slate-200/80 rounded-2xl" />
      </div>
    </div>
  )
}

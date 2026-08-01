export function PoweredBySoltkiz({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm ${className || ''}`}>
      <span className="text-[12px] font-semibold text-slate-500 leading-none whitespace-nowrap">
        Powered by
      </span>
      <img
        src="/Picture1.jpg"
        alt="SolTikz"
        className="h-6 w-auto object-contain"
      />
    </div>
  )
}

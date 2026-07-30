export function PoweredBySoltkiz() {
  return (
    <div className="fixed bottom-4 right-5 z-[9999] flex items-center gap-2.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full px-5 py-2.5 shadow-md">
      <span className="text-[14px] font-semibold text-slate-500 leading-none whitespace-nowrap">
        Powered by
      </span>
      <img
        src="/Picture1.jpg"
        alt="SolTikz"
        className="h-8 w-auto object-contain"
      />
    </div>
  )
}

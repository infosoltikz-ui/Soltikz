import { Search, Bell, HelpCircle } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between py-8">
      {/* Left: Titles */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Dashboard</h1>
        <p className="text-[15px] font-bold text-slate-700">
          Welcome back, John Doe! <span className="inline-block animate-wave">👋</span>
          <span className="block font-medium text-slate-500 mt-0.5">
            Let's build your best resume today.
          </span>
        </p>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Search */}
        <div className="relative w-64 hidden md:block">
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full h-11 pl-5 pr-10 rounded-full border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-slate-500">
          <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-[22px] h-[22px]" strokeWidth={2.5} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <HelpCircle className="w-[22px] h-[22px]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <img 
            src="https://ui-avatars.com/api/?name=John+Doe&background=16A34A&color=fff&bold=true" 
            alt="John Doe" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <div className="hidden sm:block">
            <div className="text-[14px] font-black text-slate-900 leading-tight">John Doe</div>
            <div className="text-[11px] font-bold text-slate-500">Premium Plan</div>
          </div>
        </div>

      </div>
    </header>
  )
}

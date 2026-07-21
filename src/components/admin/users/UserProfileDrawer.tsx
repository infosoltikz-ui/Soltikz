'use client'

import { X, FileText, Download, Target, HardDrive, LogIn, Calendar, Ban, Trash2, Crown, ExternalLink } from 'lucide-react'
import { USERS_DATA } from './UserTable'
import { Button } from '@/components/ui/Button'

interface UserProfileDrawerProps {
  userId: number | null;
  onClose: () => void;
}

export function UserProfileDrawer({ userId, onClose }: UserProfileDrawerProps) {
  const user = USERS_DATA.find(u => u.id === userId)
  
  if (!user) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] z-[70] animate-in slide-in-from-right duration-300 flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-6 flex items-start justify-between border-b border-slate-100 bg-[#FAFAF8]">
          <div className="flex gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-[20px] font-black shadow-sm border border-white ${user.color}`}>
              {user.initials}
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900">{user.name}</h2>
              <p className="text-[13px] font-medium text-slate-500 mb-2">{user.email}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
                  ${user.plan === 'Pro' ? 'bg-blue-100 text-blue-700' : 
                    user.plan === 'Enterprise' ? 'bg-primary/10 text-primary' : 
                    'bg-orange-100 text-orange-600'}`}
                >
                  {user.plan} Plan
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Resume Statistics */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Resume Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <FileText className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[20px] font-black text-slate-900">{user.totalResumes}</div>
                <div className="text-[11px] font-bold text-slate-500">Total Resumes</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <Download className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[20px] font-black text-slate-900">42</div>
                <div className="text-[11px] font-bold text-slate-500">Downloads</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <Target className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[20px] font-black text-slate-900">{user.atsScore}</div>
                <div className="text-[11px] font-bold text-slate-500">Avg. ATS Score</div>
              </div>
              <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl">
                <HardDrive className="w-5 h-5 text-slate-400 mb-2" />
                <div className="text-[20px] font-black text-slate-900">12 MB</div>
                <div className="text-[11px] font-bold text-slate-500">Storage Used</div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Account Details</h3>
            <div className="space-y-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <LogIn className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[12px] font-medium text-slate-500">Last Login</div>
                  <div className="text-[13px] font-bold text-slate-900">{user.lastLogin}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[12px] font-medium text-slate-500">Registration Date</div>
                  <div className="text-[13px] font-bold text-slate-900">{user.registrationDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[12px] font-medium text-slate-500">LinkedIn Profile</div>
                  <a href="#" className="text-[13px] font-bold text-primary hover:underline">linkedin.com/in/user</a>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log (Mini) */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Recent Activity</h3>
            <div className="relative pl-3 space-y-5 before:content-[''] before:absolute before:left-[4px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              <div className="relative flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-primary relative z-10 border-2 border-white mt-1"></div>
                <div>
                  <p className="text-[13px] font-medium text-slate-700">Downloaded <strong className="text-slate-900">Senior Dev Resume</strong></p>
                  <span className="text-[11px] font-bold text-slate-400">2 hours ago</span>
                </div>
              </div>
              <div className="relative flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 relative z-10 border-2 border-white mt-1"></div>
                <div>
                  <p className="text-[13px] font-medium text-slate-700">Logged in from <strong className="text-slate-900">Mac OS</strong></p>
                  <span className="text-[11px] font-bold text-slate-400">2 hours ago</span>
                </div>
              </div>
              <div className="relative flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 relative z-10 border-2 border-white mt-1"></div>
                <div>
                  <p className="text-[13px] font-medium text-slate-700">Updated profile picture</p>
                  <span className="text-[11px] font-bold text-slate-400">Yesterday</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full text-[13px] h-10">
            <Crown className="w-4 h-4 mr-2" /> Upgrade
          </Button>
          <Button className="w-full text-[13px] h-10">
            View Resumes
          </Button>
          <button className="col-span-2 flex items-center justify-center gap-2 h-10 text-[13px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Ban className="w-4 h-4" /> Block User
          </button>
        </div>

      </div>
    </>
  )
}

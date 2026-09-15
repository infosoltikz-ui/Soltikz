'use client'

import React, { useState } from 'react'
import { Target, CheckCircle, Plus, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'

interface SkillsGapWidgetProps {
  userSkills?: string[]
  targetRole?: string
}

const DEFAULT_HIGH_DEMAND_SKILLS = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Tailwind CSS',
  'REST APIs',
  'Docker',
  'AWS Cloud',
  'PostgreSQL',
  'CI/CD Pipelines',
  'System Design',
  'Microservices',
]

export function SkillsGapWidget({
  userSkills = [],
  targetRole = 'Software Engineer'
}: SkillsGapWidgetProps) {
  const [skillsList, setSkillsList] = useState<string[]>(userSkills)
  const [addingSkill, setAddingSkill] = useState<string | null>(null)

  // Normalize user skills
  const normalizedUserSkills = skillsList.map(s => s.trim().toLowerCase())

  // Matched vs missing
  const matchedSkills = DEFAULT_HIGH_DEMAND_SKILLS.filter(s =>
    normalizedUserSkills.some(us => us === s.toLowerCase() || us.includes(s.toLowerCase()))
  )

  const missingSkills = DEFAULT_HIGH_DEMAND_SKILLS.filter(s =>
    !normalizedUserSkills.some(us => us === s.toLowerCase() || us.includes(s.toLowerCase()))
  ).slice(0, 5)

  const matchPercentage = Math.round((matchedSkills.length / Math.max(1, matchedSkills.length + missingSkills.length)) * 100)

  const handleAddSkill = async (skill: string) => {
    setAddingSkill(skill)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Please log in')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('master_resume_data')
        .eq('id', user.id)
        .single()

      const currentMaster = profile?.master_resume_data || {}
      const existingSkills: string[] = currentMaster.skills || []
      const updatedSkills = Array.from(new Set([...existingSkills, skill]))

      const { error } = await supabase
        .from('profiles')
        .update({
          master_resume_data: {
            ...currentMaster,
            skills: updatedSkills
          }
        })
        .eq('id', user.id)

      if (error) throw error

      setSkillsList(updatedSkills)
      toast.success(`Added "${skill}" to Master Profile!`)
    } catch (e: any) {
      console.error(e)
      toast.error('Failed to update skills')
    } finally {
      setAddingSkill(null)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center">
              <Target className="w-3.5 h-3.5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">ATS Keywords Health</h3>
              <p className="text-[11px] text-slate-500 font-medium">Market alignment for {targetRole}</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
            {matchPercentage}% Target Match
          </span>
        </div>

        {/* Matched Keywords Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Core Competencies in Profile ({matchedSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.length > 0 ? (
              matchedSkills.map(s => (
                <span 
                  key={s}
                  className="inline-flex items-center text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded"
                >
                  <CheckCircle className="w-2.5 h-2.5 mr-1 text-emerald-600" />
                  {s}
                </span>
              ))
            ) : (
              <span className="text-[12px] text-slate-400 font-medium">Add skills to your Master Profile to see matching</span>
            )}
          </div>
        </div>

        {/* High-Impact Keyword Suggestions */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> High-Impact In-Demand Keywords
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.map(s => (
              <button
                key={s}
                disabled={addingSkill === s}
                onClick={() => handleAddSkill(s)}
                className="inline-flex items-center text-[11px] font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 px-2 py-0.5 rounded transition-colors group cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-2.5 h-2.5 mr-1 text-slate-400 group-hover:text-primary transition-colors" />
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Click + to instantly add to Master Profile</span>
        <Link href="/dashboard/profile" className="text-primary hover:text-primary-dark font-semibold inline-flex items-center gap-0.5">
          Edit Profile <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

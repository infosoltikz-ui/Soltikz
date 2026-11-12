'use client'

import React, { useState, useEffect } from 'react'
import { Target, CheckCircle2, Plus, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'

interface SkillsGapWidgetProps {
  userSkills?: any
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

function extractSkillStrings(raw: any): string[] {
  if (!raw) return []
  if (!Array.isArray(raw)) return []

  const results: string[] = []
  for (const item of raw) {
    if (typeof item === 'string' && item.trim()) {
      results.push(item.trim())
    } else if (item && typeof item === 'object') {
      if (Array.isArray(item.items)) {
        for (const sub of item.items) {
          if (typeof sub === 'string' && sub.trim()) {
            results.push(sub.trim())
          }
        }
      } else if (typeof item.name === 'string' && item.name.trim()) {
        results.push(item.name.trim())
      } else if (typeof item.skill === 'string' && item.skill.trim()) {
        results.push(item.skill.trim())
      }
    }
  }
  return Array.from(new Set(results))
}

export function SkillsGapWidget({
  userSkills = [],
  targetRole = 'Software Engineer',
}: SkillsGapWidgetProps) {
  const [skillsList, setSkillsList] = useState<string[]>(() => extractSkillStrings(userSkills))
  const [addingSkill, setAddingSkill] = useState<string | null>(null)

  useEffect(() => {
    setSkillsList(extractSkillStrings(userSkills))
  }, [userSkills])

  const normalizedUserSkills = skillsList.map((s) => String(s).trim().toLowerCase())

  const matchedSkills = DEFAULT_HIGH_DEMAND_SKILLS.filter((s) =>
    normalizedUserSkills.some((us) => us === s.toLowerCase() || us.includes(s.toLowerCase()))
  )

  const missingSkills = DEFAULT_HIGH_DEMAND_SKILLS.filter(
    (s) => !normalizedUserSkills.some((us) => us === s.toLowerCase() || us.includes(s.toLowerCase()))
  ).slice(0, 6)

  const matchPercentage = Math.round(
    (matchedSkills.length / Math.max(1, matchedSkills.length + missingSkills.length)) * 100
  )

  const handleAddSkill = async (skill: string) => {
    setAddingSkill(skill)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
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
      const existingRawSkills = currentMaster.skills || []

      let updatedRawSkills: any

      if (
        Array.isArray(existingRawSkills) &&
        existingRawSkills.length > 0 &&
        typeof existingRawSkills[0] === 'object' &&
        Array.isArray(existingRawSkills[0].items)
      ) {
        updatedRawSkills = existingRawSkills.map((cat: any, idx: number) => {
          if (idx === 0) {
            return {
              ...cat,
              items: Array.from(new Set([...cat.items, skill])),
            }
          }
          return cat
        })
      } else if (Array.isArray(existingRawSkills)) {
        updatedRawSkills = Array.from(new Set([...existingRawSkills, skill]))
      } else {
        updatedRawSkills = [skill]
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          master_resume_data: {
            ...currentMaster,
            skills: updatedRawSkills,
          },
        })
        .eq('id', user.id)

      if (error) throw error

      setSkillsList((prev) => Array.from(new Set([...prev, skill])))
      toast.success(`Added "${skill}" to Master Profile!`)
    } catch (e: any) {
      console.error(e)
      toast.error('Failed to update skills')
    } finally {
      setAddingSkill(null)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center">
              <Target className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-[15px] font-extrabold text-slate-900">
                ATS Keywords Health
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Market alignment for {targetRole}
              </p>
            </div>
          </div>

          <span className="text-xs font-extrabold text-[#0F2744] bg-[#EEF4FA] border border-[#0F2744]/15 px-2.5 py-1 rounded-lg tabular-nums">
            {matchPercentage}% Match
          </span>
        </div>

        {/* Visual Match Meter */}
        <div className="mb-4 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
            <span>Role Keyword Coverage</span>
            <span className="text-[#0F2744] tabular-nums">{matchPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0F2744] to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>

        {/* Matched Keywords Section */}
        <div className="mb-4">
          <div className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Verified in Profile ({matchedSkills.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 text-[11.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-lg"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {s}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                Add core technical skills to your Master Profile to track matching.
              </span>
            )}
          </div>
        </div>

        {/* High-Impact Keyword Suggestions */}
        {missingSkills.length > 0 && (
          <div>
            <div className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              <span>Recommended High-Impact Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((s) => (
                <button
                  key={s}
                  disabled={addingSkill === s}
                  onClick={() => handleAddSkill(s)}
                  className="group inline-flex items-center gap-1.5 text-[11.5px] font-bold bg-white hover:bg-[#0F2744] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0F2744] px-2.5 py-1 rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 shadow-2xs"
                >
                  {addingSkill === s ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Plus className="w-3 h-3 text-[#F59E0B] group-hover:rotate-90 transition-transform" />
                  )}
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Click any + tag to sync directly to Profile</span>
        <Link
          href="/dashboard/profile"
          className="group text-[#0F2744] hover:text-amber-700 font-extrabold inline-flex items-center gap-1 transition-colors"
        >
          <span>Edit Skills</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

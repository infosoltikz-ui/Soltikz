'use client'

import { useRouter } from 'next/navigation'
import { FileText, ChevronDown } from 'lucide-react'

interface ResumeOption {
  id: string
  title: string
  updated_at?: string
}

export function ResumeSelector({
  resumes,
  selectedId,
}: {
  resumes: ResumeOption[]
  selectedId: string
}) {
  const router = useRouter()

  if (!resumes || resumes.length === 0) return null

  return (
    <div className="relative inline-flex items-center">
      <div className="relative">
        <select
          value={selectedId}
          onChange={(e) => {
            router.push(`/dashboard/match-report?id=${e.target.value}`)
          }}
          className="appearance-none bg-[#151D28] text-[#E4EAF2] border border-[#26313F] hover:border-[#3FA57C]/40 text-xs font-bold py-2 pl-8 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#3FA57C]"
        >
          {resumes.map((r) => (
            <option key={r.id} value={r.id} className="bg-[#151D28] text-white">
              {r.title || 'Untitled Resume'}
            </option>
          ))}
        </select>
        <FileText className="w-3.5 h-3.5 text-[#3FA57C] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <ChevronDown className="w-3.5 h-3.5 text-[#78859A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  )
}

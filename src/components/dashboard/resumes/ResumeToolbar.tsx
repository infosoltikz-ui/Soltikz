'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Search, Filter, ArrowUpDown, LayoutGrid, List, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/utils/cn'

export type ResumeFilterType = 'all' | 'Full-Time' | 'C2C'
export type ResumeSortBy = 'newest' | 'oldest' | 'ats-desc' | 'ats-asc'

const FILTER_OPTIONS: { value: ResumeFilterType; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'Full-Time', label: 'Full-Time' },
  { value: 'C2C', label: 'C2C' },
]

const SORT_OPTIONS: { value: ResumeSortBy; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'ats-desc', label: 'ATS Score: High to Low' },
  { value: 'ats-asc', label: 'ATS Score: Low to High' },
]

function Dropdown({
  icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeLabel = options.find((o) => o.value === value)?.label || label

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "h-10 px-4 flex items-center gap-2 text-[13px] font-bold transition-colors rounded-xl",
          value !== options[0].value ? "text-primary bg-primary/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        {icon}
        {activeLabel}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => { onChange(o.value); setOpen(false) }}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left"
            >
              {o.label}
              {value === o.value && <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface ResumeToolbarProps {
  searchQuery: string
  onSearchChange: (v: string) => void
  filterType: ResumeFilterType
  onFilterChange: (v: ResumeFilterType) => void
  sortBy: ResumeSortBy
  onSortChange: (v: ResumeSortBy) => void
}

export function ResumeToolbar({ searchQuery, onSearchChange, filterType, onFilterChange, sortBy, onSortChange }: ResumeToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search resumes..."
            className="pl-9 h-10 bg-slate-50/50 border-transparent rounded-xl text-[13px] focus-visible:bg-white"
          />
        </div>
        <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>
        <div className="flex items-center gap-2">
          <Dropdown
            icon={<Filter className="w-4 h-4 text-slate-400" strokeWidth={2.5} />}
            label="Filter by"
            options={FILTER_OPTIONS}
            value={filterType}
            onChange={(v) => onFilterChange(v as ResumeFilterType)}
          />
          <Dropdown
            icon={<ArrowUpDown className="w-4 h-4 text-slate-400" strokeWidth={2.5} />}
            label="Sort by"
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(v) => onSortChange(v as ResumeSortBy)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-900">
            <LayoutGrid className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title="List view coming soon" disabled>
            <List className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        <Link href="/dashboard/create">
          <Button
            className="h-10 text-[13px] font-bold rounded-xl px-5 shadow-sm hover:shadow-md whitespace-nowrap"
            leftIcon={<Plus className="w-4 h-4" strokeWidth={2.5} />}
          >
            Create New Resume
          </Button>
        </Link>
      </div>
    </div>
  )
}

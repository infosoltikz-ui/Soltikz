'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Search, Filter, ArrowUpDown, LayoutGrid, List, Check } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { cn } from '@/utils/cn'

export type ResumeFilterType = 'all' | 'Full-Time' | 'C2C' | 'claude' | 'gpt'
export type ResumeSortBy = 'newest' | 'oldest' | 'ats-desc' | 'ats-asc'

const FILTER_OPTIONS: { value: ResumeFilterType; label: string }[] = [
  { value: 'all', label: 'All Types & Models' },
  { value: 'Full-Time', label: 'Full-Time' },
  { value: 'C2C', label: 'C2C / Contract' },
  { value: 'claude', label: 'Claude (AI)' },
  { value: 'gpt', label: 'GPT-4o (AI)' },
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
  const isFiltered = value !== options[0].value

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'h-10 px-3.5 flex items-center gap-2 text-xs font-bold transition-all rounded-xl border cursor-pointer whitespace-nowrap',
          isFiltered
            ? 'text-[#3FA57C] bg-[#123227] border-[#3FA57C]/30'
            : 'text-[#C3CCD9] hover:text-[#E4EAF2] bg-[#1A2330] hover:bg-[#222E3F] border-[#26313F]'
        )}
      >
        {icon}
        <span>{activeLabel}</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-52 bg-[#151D28] rounded-2xl shadow-xl shadow-black/40 border border-[#26313F] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2 text-xs font-bold text-[#C3CCD9] hover:bg-[#1A2330] hover:text-[#E4EAF2] transition-colors text-left cursor-pointer"
            >
              <span>{o.label}</span>
              {value === o.value && <Check className="w-3.5 h-3.5 text-[#3FA57C]" strokeWidth={3} />}
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
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (v: 'grid' | 'list') => void
}

export function ResumeToolbar({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
}: ResumeToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#151D28] p-3.5 rounded-2xl border border-[#26313F] shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 flex-1">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78859A]" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, company, or role..."
            className="pl-10 h-10 bg-[#1A2330] border-[#26313F] rounded-xl text-xs font-medium text-[#E4EAF2] placeholder:text-[#68768A] focus-visible:bg-[#151D28] focus-visible:border-[#3FA57C]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Dropdown
            icon={<Filter className="w-3.5 h-3.5 text-[#78859A]" strokeWidth={2.2} />}
            label="Filter by"
            options={FILTER_OPTIONS}
            value={filterType}
            onChange={(v) => onFilterChange(v as ResumeFilterType)}
          />
          <Dropdown
            icon={<ArrowUpDown className="w-3.5 h-3.5 text-[#78859A]" strokeWidth={2.2} />}
            label="Sort by"
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(v) => onSortChange(v as ResumeSortBy)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#1A2330] border border-[#26313F] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onViewModeChange?.('grid')}
            title="Grid View"
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer',
              viewMode === 'grid'
                ? 'bg-[#0A6E4E] text-white shadow-xs'
                : 'text-[#78859A] hover:text-[#E4EAF2]'
            )}
          >
            <LayoutGrid className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange?.('list')}
            title="List View"
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer',
              viewMode === 'list'
                ? 'bg-[#0A6E4E] text-white shadow-xs'
                : 'text-[#78859A] hover:text-[#E4EAF2]'
            )}
          >
            <List className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>

        <Link href="/dashboard/create">
          <button
            type="button"
            className="h-10 text-xs font-extrabold rounded-xl px-4 bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 shadow-sm hover:shadow transition-all whitespace-nowrap inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D9A441]" strokeWidth={2.5} />
            <span>Create New Resume</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

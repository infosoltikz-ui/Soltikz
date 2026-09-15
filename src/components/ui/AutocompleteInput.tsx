'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface AutocompleteInputProps {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  icon?: React.ReactNode
  fetchOptions?: (query: string) => Promise<string[]>
  staticOptions?: string[]
}

export function AutocompleteInput({
  name,
  value,
  onChange,
  placeholder,
  icon,
  fetchOptions,
  staticOptions
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    let active = true

    const loadOptions = async () => {
      if (!value || value.length < 2) {
        setOptions([])
        return
      }

      setLoading(true)
      
      if (staticOptions) {
        const filtered = staticOptions.filter(opt => 
          opt.toLowerCase().includes(value.toLowerCase())
        )
        if (active) setOptions(filtered)
      } else if (fetchOptions) {
        try {
          const results = await fetchOptions(value)
          if (active) setOptions(results)
        } catch (error) {
          console.error('Failed to fetch options', error)
          if (active) setOptions([])
        }
      }
      
      if (active) setLoading(false)
    }

    const timer = setTimeout(() => {
      // Don't fetch if the value exactly matches one of the options (meaning it was just selected)
      if (options.includes(value)) {
         setOptions([])
         setIsOpen(false)
         return
      }
      loadOptions()
      setIsOpen(true)
    }, 300)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [value, fetchOptions, staticOptions])

  return (
    <div className="relative" ref={wrapperRef}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => {
          if (value.length >= 2) setIsOpen(true)
        }}
        type="text"
        placeholder={placeholder}
        className={`w-full h-12 ${icon ? 'pl-11' : 'pl-4'} pr-10 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-[14px] font-medium text-slate-900 transition-all placeholder:text-slate-300`}
        autoComplete="off"
      />
      {loading && (
        <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
      )}
      
      {isOpen && options.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-auto py-1">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className="px-4 py-2 text-[14px] font-medium text-slate-700 hover:bg-slate-50 hover:text-primary cursor-pointer transition-colors"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      
      {isOpen && !loading && value.length >= 2 && options.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-[14px] font-medium text-slate-500 text-center">
          No matches found
        </div>
      )}
    </div>
  )
}

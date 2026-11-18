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
        className={`w-full h-10 ${icon ? 'pl-9' : 'pl-3'} pr-10 rounded-lg border border-[#26313F] bg-[#1A2330] focus:bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-all placeholder:text-[#68768A]`}
        autoComplete="off"
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#78859A] animate-spin" />
      )}
      
      {isOpen && options.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-[#151D28] border border-[#26313F] rounded-xl shadow-xl max-h-60 overflow-auto py-1">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className="px-4 py-2 text-[13px] font-medium text-[#E4EAF2] hover:bg-[#1A2330] hover:text-[#3FA57C] cursor-pointer transition-colors"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      
      {isOpen && !loading && value.length >= 2 && options.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#151D28] border border-[#26313F] rounded-xl shadow-xl px-4 py-3 text-[13px] font-medium text-[#9FACBE] text-center">
          No matches found
        </div>
      )}
    </div>
  )
}

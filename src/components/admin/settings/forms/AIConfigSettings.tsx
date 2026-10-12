'use client'

import { BrainCircuit, Sparkles, Check, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export function AIConfigSettings() {
  const [activeProvider, setActiveProvider] = useState<'openai' | 'claude'>('openai')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch current provider on mount
  useEffect(() => {
    async function loadProvider() {
      try {
        const res = await fetch('/api/admin/ai-provider')
        const data = await res.json()
        if (data.provider === 'claude') {
          setActiveProvider('claude')
        } else {
          setActiveProvider('openai')
        }
      } catch (err) {
        console.error('Failed to load active AI provider:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadProvider()
  }, [])

  const handleSelectProvider = async (provider: 'openai' | 'claude') => {
    if (provider === activeProvider) return
    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/ai-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update provider')

      setActiveProvider(provider)
      toast.success(
        provider === 'claude'
          ? 'Switched to Claude Sonnet for resume generation!'
          : 'Switched to OpenAI GPT-4o for resume generation!'
      )
    } catch (err: any) {
      toast.error(err.message || 'Error updating AI provider')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-500 py-10 font-bold text-[14px]">
        <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
        Loading AI Provider Configuration...
      </div>
    )
  }

  return (
    <div className="max-w-3xl animate-in fade-in duration-300 space-y-8">
      <div>
        <h2 className="text-[20px] font-black text-slate-900 tracking-tight">AI Engine Configuration</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">
          Select which enterprise AI engine powers the resume generation for candidates. Changes take effect instantly across the platform.
        </p>
      </div>

      {/* Main Switch Card */}
      <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center justify-center text-emerald-700 shrink-0">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-black text-slate-900">Active Resume Generation Engine</h3>
            <p className="text-[12px] font-medium text-slate-500">
              Pick the engine that generates full resumes. User requests are routed automatically.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* OpenAI Card */}
          <div
            onClick={() => !isSaving && handleSelectProvider('openai')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
              activeProvider === 'openai'
                ? 'border-emerald-500 bg-emerald-50/30 shadow-md ring-2 ring-emerald-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] font-black text-slate-900 flex items-center gap-2">
                  <span>OpenAI</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                    gpt-4o
                  </span>
                </span>
                {activeProvider === 'openai' && (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-[12px] font-medium text-slate-500 leading-relaxed">
                Uses OpenAI's flagship GPT-4o model with strict Zod structured outputs. Fast, deterministic, and proven for ATS formatting.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-400">Endpoint: /api/ai/generate-resume</span>
              <span className={activeProvider === 'openai' ? 'text-emerald-700' : 'text-slate-400'}>
                {activeProvider === 'openai' ? '● Currently Active' : 'Select'}
              </span>
            </div>
          </div>

          {/* Claude Card */}
          <div
            onClick={() => !isSaving && handleSelectProvider('claude')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
              activeProvider === 'claude'
                ? 'border-emerald-500 bg-emerald-50/30 shadow-md ring-2 ring-emerald-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] font-black text-slate-900 flex items-center gap-2">
                  <span>Anthropic Claude</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800">
                    Claude Sonnet
                  </span>
                </span>
                {activeProvider === 'claude' && (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-[12px] font-medium text-slate-500 leading-relaxed">
                Uses Anthropic Claude 3.5 Sonnet via strict Tool Schema. Produces rich, nuanced professional phrasing with high context precision.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-400">Endpoint: /api/ai/generate-resume-claude</span>
              <span className={activeProvider === 'claude' ? 'text-emerald-700' : 'text-slate-400'}>
                {activeProvider === 'claude' ? '● Currently Active' : 'Select'}
              </span>
            </div>
          </div>
        </div>

        {isSaving && (
          <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 pt-2">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            Updating platform AI routing...
          </div>
        )}
      </div>

      {/* Info Notice */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 text-[13px]">
        <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-800">Seamless Candidate Experience:</div>
          <p className="text-slate-600 leading-relaxed text-[12px]">
            Candidates see the exact same interface, identical templates, and the same PDF download irrespective of the active engine.
            Switching here changes the backend generation model instantly without any page reloads or code modifications.
          </p>
        </div>
      </div>
    </div>
  )
}

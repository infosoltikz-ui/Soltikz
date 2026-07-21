'use client'

import { Input } from '@/components/ui/Input'
import { BrainCircuit } from 'lucide-react'
import { useState } from 'react'

export function AIConfigSettings() {
  const [logging, setLogging] = useState(true)

  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">AI Configuration</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Manage AI models, prompt parameters, and API keys for the core ATS engine.</p>
      </div>

      <div className="space-y-8">
        
        {/* Provider */}
        <div className="bg-[#FAFAF8] border-2 border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary shrink-0">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[16px] font-black text-slate-900">Primary AI Provider</h3>
              <p className="text-[12px] font-medium text-slate-500">All generation and analysis will route through this provider.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 relative z-10">
            <label className="flex items-center gap-3 p-4 bg-white border-2 border-primary rounded-xl cursor-pointer shadow-sm">
              <input type="radio" name="ai_provider" defaultChecked className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">OpenAI</span>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer">
              <input type="radio" name="ai_provider" className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">Anthropic Claude</span>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer">
              <input type="radio" name="ai_provider" className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">Google Gemini</span>
            </label>
          </div>
        </div>

        {/* Model Routing */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Model Routing</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Resume Generation Model</label>
              <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
                <option>gpt-4o</option>
                <option>gpt-4-turbo</option>
                <option>gpt-3.5-turbo</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">ATS Analysis Model</label>
              <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
                <option>gpt-4o-mini</option>
                <option>gpt-3.5-turbo</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Cover Letter Model</label>
              <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
                <option>gpt-4o</option>
                <option>gpt-3.5-turbo</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Default API Key</label>
              <Input type="password" defaultValue="sk-proj-**********************************" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white font-mono" />
            </div>
          </div>
        </div>

        {/* Inference Params */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Inference Parameters</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[13px] font-black text-slate-900">Temperature</label>
                <span className="text-[12px] font-bold text-slate-500">0.7</span>
              </div>
              <input type="range" min="0" max="2" step="0.1" defaultValue="0.7" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
              <p className="text-[11px] font-medium text-slate-400 mt-2">Higher values make output more random.</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[13px] font-black text-slate-900">Max Tokens</label>
                <span className="text-[12px] font-bold text-slate-500">4096</span>
              </div>
              <input type="range" min="256" max="8192" step="256" defaultValue="4096" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
              <p className="text-[11px] font-medium text-slate-400 mt-2">Maximum length of generated response.</p>
            </div>
          </div>

          <label className="flex items-center justify-between p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl cursor-pointer">
            <div>
              <div className="text-[13px] font-bold text-slate-900">Enable AI Prompt Logging</div>
              <div className="text-[12px] font-medium text-slate-500 mt-0.5">Store all prompts and responses in the database for auditing and fine-tuning.</div>
            </div>
            <button 
              type="button"
              onClick={() => setLogging(!logging)}
              className={`w-11 h-6 rounded-full relative transition-colors ${logging ? 'bg-primary' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${logging ? 'left-6' : 'left-1'}`}></div>
            </button>
          </label>
        </div>

      </div>
    </div>
  )
}

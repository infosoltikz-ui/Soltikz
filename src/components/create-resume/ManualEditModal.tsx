import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ManualEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSkills: any[]) => void;
  initialSkills: any[];
}

export function ManualEditModal({ isOpen, onClose, onSave, initialSkills }: ManualEditModalProps) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setJsonText(JSON.stringify(initialSkills || [], null, 2));
      setError(null);
    }
  }, [isOpen, initialSkills]);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error("Skills must be an array of objects");
      }
      onSave(parsed);
      onClose();
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Manually Edit Skills</h2>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Override the generated skills JSON array. Ensure each item retains &apos;category&apos; and &apos;items&apos; keys.
          </p>
        </div>
        
        <div className="p-6 flex-1 overflow-auto">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-[13px] font-semibold">
              {error}
            </div>
          )}
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setError(null);
            }}
            className="w-full h-full min-h-[300px] p-4 bg-[#F8FAFC] focus:bg-white border border-slate-200 rounded-2xl font-mono text-[13px] text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#0F2744]/10 focus:border-[#0F2744]"
            spellCheck={false}
          />
        </div>

        <div className="p-5 px-6 bg-[#F8FAFC] border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onClose} className="rounded-xl font-bold border-slate-200 cursor-pointer">
            Cancel
          </Button>
          <Button onClick={handleSave} className="rounded-xl font-bold bg-[#0F2744] hover:bg-[#0A1C33] text-white cursor-pointer">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

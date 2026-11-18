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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#151D28] rounded-3xl border border-[#26313F] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-[#26313F] bg-[#101722] shrink-0">
          <h2 className="text-[18px] font-black text-[#E4EAF2] tracking-tight" style={{ color: '#E4EAF2' }}>Manually Edit Skills</h2>
          <p className="text-[13px] font-medium text-[#9FACBE] mt-1" style={{ color: '#9FACBE' }}>
            Override the generated skills JSON array. Ensure each item retains &apos;category&apos; and &apos;items&apos; keys.
          </p>
        </div>
        
        <div className="p-6 flex-1 overflow-auto bg-[#151D28]">
          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-[13px] font-semibold">
              {error}
            </div>
          )}
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setError(null);
            }}
            className="w-full h-full min-h-[300px] p-4 bg-[#101722] focus:bg-[#1A2330] border border-[#26313F] rounded-2xl font-mono text-[13px] text-[#E4EAF2] focus:outline-none focus:ring-2 focus:ring-[#3FA57C]/40 focus:border-[#3FA57C]"
            style={{ color: '#E4EAF2' }}
            spellCheck={false}
          />
        </div>

        <div className="p-5 px-6 bg-[#101722] border-t border-[#26313F] flex justify-end gap-3 shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl font-bold bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] border-[#26313F] cursor-pointer"
            style={{ color: '#E4EAF2' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-xl font-bold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 cursor-pointer shadow-xs"
            style={{ color: '#FFFFFF' }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

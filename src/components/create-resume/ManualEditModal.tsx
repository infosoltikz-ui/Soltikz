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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-lg font-bold text-slate-900">Manually Edit Skills</h2>
          <p className="text-sm text-slate-500 mt-1">
            You can override the AI's generated skills here. Ensure the format remains a valid JSON array of objects with 'category' and 'items' properties.
          </p>
        </div>
        
        <div className="p-6 flex-1 overflow-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setError(null);
            }}
            className="w-full h-full min-h-[300px] p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary"
            spellCheck={false}
          />
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

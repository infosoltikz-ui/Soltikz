import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { Modal } from '@/components/ui/Overlay';
import { useUIStore } from '@/store/useUIStore';

interface RegenerateSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: (firstPoint: string) => Promise<void>;
  initialPoint?: string;
}

export function RegenerateSummaryModal({ isOpen, onClose, onRegenerate, initialPoint = '' }: RegenerateSummaryModalProps) {
  const [firstPoint, setFirstPoint] = useState(initialPoint);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // We are not using useUIStore for this specific modal's open state in this simple implementation,
  // but if the app architecture requires it, we'd wrap it in the standard Modal component.
  if (!isOpen) return null;

  const handleRegenerate = async () => {
    if (!firstPoint.trim()) return;
    setIsRegenerating(true);
    try {
      await onRegenerate(firstPoint);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Refine Executive Summary</h2>
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Write your ideal opening line. AI will regenerate supporting summary points matching your framing.
          </p>
        </div>
        
        <div className="p-6">
          <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2">
            Your Opening Line
          </label>
          <textarea
            value={firstPoint}
            onChange={(e) => setFirstPoint(e.target.value)}
            placeholder="e.g. Senior Software Engineer with 8+ years of experience architecting..."
            className="w-full h-32 p-3.5 bg-[#F8FAFC] focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#0F2744]/10 focus:border-[#0F2744] text-[13.5px] font-medium text-slate-900"
          />
          <p className="text-[11.5px] font-medium text-slate-400 mt-2">
            Tip: Combine role seniority, years of experience, and primary core stack.
          </p>
        </div>

        <div className="p-5 px-6 bg-[#F8FAFC] border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isRegenerating} className="rounded-xl font-bold border-slate-200 cursor-pointer">
            Cancel
          </Button>
          <Button
            onClick={handleRegenerate}
            disabled={!firstPoint.trim() || isRegenerating}
            className="rounded-xl font-bold bg-[#0F2744] hover:bg-[#0A1C33] text-white cursor-pointer"
          >
            {isRegenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Regenerating...
              </>
            ) : (
              'Regenerate Summary'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

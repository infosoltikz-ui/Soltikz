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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#151D28] rounded-3xl border border-[#26313F] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[#26313F] bg-[#101722]">
          <h2 className="text-[18px] font-black text-[#E4EAF2] tracking-tight" style={{ color: '#E4EAF2' }}>Refine Executive Summary</h2>
          <p className="text-[13px] font-medium text-[#9FACBE] mt-1" style={{ color: '#9FACBE' }}>
            Write your ideal opening line. AI will regenerate supporting summary points matching your framing.
          </p>
        </div>
        
        <div className="p-6">
          <label className="block text-[12.5px] font-extrabold text-[#E4EAF2] mb-2" style={{ color: '#E4EAF2' }}>
            Your Opening Line
          </label>
          <textarea
            value={firstPoint}
            onChange={(e) => setFirstPoint(e.target.value)}
            placeholder="e.g. Senior Software Engineer with 8+ years of experience architecting..."
            className="w-full h-32 p-3.5 bg-[#101722] focus:bg-[#1A2330] border border-[#26313F] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3FA57C]/40 focus:border-[#3FA57C] text-[13.5px] font-medium text-[#E4EAF2] placeholder:text-[#6F7D8F]"
            style={{ color: '#E4EAF2' }}
          />
          <p className="text-[11.5px] font-medium text-[#78859A] mt-2">
            Tip: Combine role seniority, years of experience, and primary core stack.
          </p>
        </div>

        <div className="p-5 px-6 bg-[#101722] border-t border-[#26313F] flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isRegenerating}
            className="rounded-xl font-bold bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] border-[#26313F] cursor-pointer"
            style={{ color: '#E4EAF2' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRegenerate}
            disabled={!firstPoint.trim() || isRegenerating}
            className="rounded-xl font-bold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 cursor-pointer shadow-xs"
            style={{ color: '#FFFFFF' }}
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

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Regenerate Summary</h2>
          <p className="text-sm text-slate-500 mt-1">
            Write your ideal first bullet point. The AI will generate the remaining points based on your style and tone.
          </p>
        </div>
        
        <div className="p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your First Bullet Point
          </label>
          <textarea
            value={firstPoint}
            onChange={(e) => setFirstPoint(e.target.value)}
            placeholder="e.g. Senior Software Engineer with 8+ years of experience in..."
            className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
          />
          <p className="text-xs text-slate-500 mt-2">
            Tip: Use the Action Verb + Task + Tool + Result format.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isRegenerating}>
            Cancel
          </Button>
          <Button onClick={handleRegenerate} disabled={!firstPoint.trim() || isRegenerating}>
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

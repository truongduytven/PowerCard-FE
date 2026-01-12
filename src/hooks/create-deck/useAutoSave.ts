import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useAutoSave = <T>(formData: T, delay: number = 800) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  const prevSavedSerializedRef = useRef<string | null>(null);
  const scheduledSerializedRef = useRef<string | null>(null);
  const scheduledDataRef = useRef<T | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const hasContent = true; // You can add specific logic here

    if (!hasContent) return;

    const serialized = JSON.stringify(formData);

    if (prevSavedSerializedRef.current === serialized) return;

    scheduledSerializedRef.current = serialized;
    scheduledDataRef.current = formData;
    setIsSaving(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current as unknown as number);
      timerRef.current = null;
    }

    timerRef.current = window.setTimeout(() => {
      try {
        const dataToSave = scheduledDataRef.current;
        if (!dataToSave) return;

        const draft = {
          data: dataToSave,
          timestamp: new Date().toISOString(),
          saveCount: saveCount + 1,
        };

        localStorage.setItem("flashcardDraft", JSON.stringify(draft));
        prevSavedSerializedRef.current = scheduledSerializedRef.current;

        setLastSaved(new Date());
        setSaveCount(prev => prev + 1);
      } catch (error) {
        console.error("Auto-save error:", error);
      } finally {
        setIsSaving(false);
        timerRef.current = null;
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as unknown as number);
        timerRef.current = null;
      }
    };
  }, [formData, delay, saveCount]);

  const recoverDraft = useCallback((): T | null => {
    const draft = localStorage.getItem("flashcardDraft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        const timeDiff = new Date().getTime() - new Date(parsed.timestamp).getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          return parsed.data;
        } else {
          localStorage.removeItem("flashcardDraft");
        }
      } catch (error) {
        console.error("Error recovering draft:", error);
      }
    }
    return null;
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem("flashcardDraft");
    setLastSaved(null);
    setSaveCount(0);
    toast.success("Đã xóa bản nháp");
  }, []);

  return { lastSaved, isSaving, recoverDraft, clearDraft, saveCount };
};
import { useState, useRef, useCallback } from 'react';

export const useHistory = <T>(initialState: T) => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const historyRef = useRef<T[]>([initialState]);
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxHistory = 50;

  const push = useCallback((state: T) => {
    setHistory(prev => {
      const truncated = prev.slice(0, indexRef.current + 1);
      const newHistory = [...truncated, state];

      if (newHistory.length > maxHistory) {
        const sliced = newHistory.slice(-maxHistory);
        historyRef.current = sliced;
        indexRef.current = sliced.length - 1;
        setCurrentIndex(indexRef.current);
        return sliced;
      }

      historyRef.current = newHistory;
      indexRef.current = Math.min(indexRef.current + 1, maxHistory - 1);
      setCurrentIndex(indexRef.current);
      return newHistory;
    });
  }, []);

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current -= 1;
      setCurrentIndex(indexRef.current);
      return historyRef.current[indexRef.current];
    }
    return null;
  }, []);

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current += 1;
      setCurrentIndex(indexRef.current);
      return historyRef.current[indexRef.current];
    }
    return null;
  }, []);

  const clearHistory = useCallback(() => {
    const initial = [initialState];
    historyRef.current = initial;
    indexRef.current = 0;
    setHistory(initial);
    setCurrentIndex(0);
  }, [initialState]);

  return {
    currentState: history[currentIndex],
    push,
    undo,
    redo,
    clearHistory,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    historySize: history.length,
    currentPosition: currentIndex + 1,
  };
};
import { useState, useRef, useCallback } from "react";

export const useHistory = <T>(initialState: T) => {
  const historyRef = useRef<T[]>([initialState]);
  const indexRef = useRef(0);
  const [history, setHistory] = useState<T[]>(historyRef.current);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxHistory = 50;

  const push = useCallback((state: T) => {
    // Avoid pushing duplicate states (no-op)
    try {
      const last = historyRef.current[historyRef.current.length - 1];
      if (last && JSON.stringify(last) === JSON.stringify(state)) {
        return;
      }
    } catch (err) {
      // If stringify fails for some reason, continue and push
    }

    // Operate on refs synchronously to avoid race conditions
    const truncated = historyRef.current.slice(0, indexRef.current + 1);
    let newHistory = [...truncated, state];

    if (newHistory.length > maxHistory) {
      newHistory = newHistory.slice(-maxHistory);
      indexRef.current = newHistory.length - 1;
    } else {
      indexRef.current = Math.min(indexRef.current + 1, newHistory.length - 1);
    }

    historyRef.current = newHistory;
    // update React state so consumers re-render
    setHistory(newHistory);
    setCurrentIndex(indexRef.current);
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
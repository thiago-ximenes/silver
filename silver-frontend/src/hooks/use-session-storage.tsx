import { useEffect, useState } from "react";

export function useSessionStorage<T = unknown>(key: string, initialValue: T) {
  const state = useState(() => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state[0]));
  }, [key, state]);

  return state;
}

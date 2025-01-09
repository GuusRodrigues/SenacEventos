import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T | null) {
  const isBrowser = typeof window !== "undefined";

  const storedValue = isBrowser ? localStorage.getItem(key) : null;
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const [storedValueState, setStoredValueState] = useState<T | null>(parsedValue);

  const setStoredValue = (value: T) => {
    setStoredValueState(value);
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValueState, setStoredValue] as const;
}

export { useLocalStorage };
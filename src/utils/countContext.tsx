import { useState, createContext, useCallback } from "react";

interface CountProviderProps {
  children: React.ReactNode;
}
interface ContextValues {
  count: number;
  setCount: (count: number) => void;
}

export const CountContext = createContext({} as ContextValues);
export const CountProvider = ({ children }: CountProviderProps) => {
  const [count, set] = useState(0);
  const setCount = useCallback((count: number) => set(count), []);
  const value = { count, setCount };

  return (
    <CountContext.Provider value={value as ContextValues}>
      {children}
    </CountContext.Provider>
  );
};

import { useContext } from "react";
import { CountContext } from "../utils/countContext";

export const useTodoCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

import { useContext } from "react";
import { Context, ContextType } from "../context/context";

export const useContextHook = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useContext must be used within a CartProvider");
  return context;
};

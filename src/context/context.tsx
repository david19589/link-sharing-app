import { createContext } from "react";
import { Link, PlatformIconsType } from "./context-provider";

interface FormData {
  firstName: string;
  lastName: string;
  email?: string;
}

export type ContextType = {
  links: Link[];
  setLinks: (status: Link[]) => void;
  platformIcons: PlatformIconsType;
  message: boolean;
  setMessage: (status: boolean) => void;
  personalInfo: FormData;
  setPersonalInfo: React.Dispatch<React.SetStateAction<FormData>>;
};

export const Context = createContext<ContextType | undefined>(undefined);

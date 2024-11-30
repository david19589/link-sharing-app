import githubSvg from "../assets/icons/github";
import youtubeSvg from "../assets/icons/youtube";
import linkedinSvg from "../assets/icons/linkedin";
import facebookSvg from "../assets/icons/facebook";
import devtoSvg from "../assets/icons/devto";
import codewarsSvg from "../assets/icons/codewars";
import freecodecampSvg from "../assets/icons/freecodecamp";
import codepenSvg from "../assets/icons/codepen";
import frontendMentorSvg from "../assets/icons/frontendMentor";
import gitlabSvg from "../assets/icons/gitlab";
import { createContext, SVGProps, useMemo, useState } from "react";

type PlatformType =
  | "GitHub"
  | "YouTube"
  | "LinkedIn"
  | "Facebook"
  | "Dev.to"
  | "CodeWars"
  | "FreeCodeCamp"
  | "CodePen"
  | "FrontendMentor"
  | "GitLab";

type PlatformIconsType = Record<
  PlatformType,
  { icon: React.FC<SVGProps<SVGSVGElement>>; color: string }
>;

interface Link {
  id: number;
  platform: PlatformType;
  url: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
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

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [links, setLinks] = useState<Link[]>(() => {
    try {
      const storedLinks = localStorage.getItem("links");
      return storedLinks ? JSON.parse(storedLinks) : [];
    } catch (err) {
      console.error("Error parsing links from localStorage:", err);
    }
    return [];
  });

  const [personalInfo, setPersonalInfo] = useState(() => {
    const savedInfo = localStorage.getItem("personalInfo");
    return savedInfo
      ? JSON.parse(savedInfo)
      : { firstName: "", lastName: "", email: "" };
  });

  const [message, setMessage] = useState(false);

  const platformIcons = useMemo<PlatformIconsType>(
    () => ({
      GitHub: { icon: githubSvg, color: "#000" },
      YouTube: { icon: youtubeSvg, color: "#EE3939" },
      LinkedIn: { icon: linkedinSvg, color: "#2D68FF" },
      Facebook: { icon: facebookSvg, color: "#2442AC" },
      "Dev.to": { icon: devtoSvg, color: "#333333" },
      CodeWars: { icon: codewarsSvg, color: "#8A1A50" },
      FreeCodeCamp: { icon: freecodecampSvg, color: "#302267" },
      CodePen: { icon: codepenSvg, color: "#000" },
      FrontendMentor: { icon: frontendMentorSvg, color: "#e6e0e0" },
      GitLab: { icon: gitlabSvg, color: "#EB4925" },
    }),
    []
  );

  return (
    <Context.Provider
      value={{
        links,
        setLinks,
        platformIcons,
        message,
        setMessage,
        personalInfo,
        setPersonalInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

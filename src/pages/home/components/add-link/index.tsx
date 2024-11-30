import githubSvg from "../../../../assets/images/icon-github.svg";
import youtubeSvg from "../../../../assets/images/icon-youtube.svg";
import linkedinSvg from "../../../../assets/images/icon-linkedin.svg";
import facebookSvg from "../../../../assets/images/icon-facebook.svg";
import devtoSvg from "../../../../assets/images/icon-devto.svg";
import codewarsSvg from "../../../../assets/images/icon-codewars.svg";
import freecodecampSvg from "../../../../assets/images/icon-freecodecamp.svg";
import codepenSvg from "../../../../assets/images/icon-codepen.svg";
import frontendMentorSvg from "../../../../assets/images/icon-frontend-mentor.svg";
import gitlabSvg from "../../../../assets/images/icon-gitlab.svg";
import arrowDownSvg from "../../../../assets/images/icon-chevron-down.svg";
import linkSvg from "../../../../assets/images/icon-link.svg";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { FieldArrayWithId, useFormContext } from "react-hook-form";

type PlatformType =
  | "GitHub"
  | "YouTube"
  | "LinkedIn"
  | "Dev.to"
  | "CodeWars"
  | "FreeCodeCamp"
  | "CodePen"
  | "FrontendMentor"
  | "GitLab";

function AddLink(props: {
  field: FieldArrayWithId;
  remove: (id: number) => void;
  index: number;
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [rotate, setRotate] = useState(false);
  const [openList, setOpenList] = useState(false);

  const handleChange = () => {
    setRotate(!rotate);
    setOpenList((prev) => !prev);
  };

  const link = watch(`links.${props.index}`);
  const currentPlatform: PlatformType = link?.platform || "GitHub";

  const selectPlatform = (selectedPlatform: string) => {
    setValue(`links.${props.index}.platform`, selectedPlatform);
    setOpenList(false);
  };

  const platformIcons = useMemo(
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

  const error = Array.isArray(errors.links)
    ? errors.links[props.index]?.url
    : undefined;

  return (
    <div className="max-w-[45.5rem] w-full bg-[#FAFAFA] mb-[1.5rem] p-[1.25rem] rounded-md">
      <div className="flex justify-between mb-[0.8rem]">
        <div className="flex gap-[0.5rem]">
          <span className="text-[#737373]">=</span>
          <h2 className="text-[1rem] leading-[1.5rem] font-[700] text-[#737373]">{`Link #${
            props.index + 1
          }`}</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            props.remove(props.index);
          }}
          className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] outline-none"
        >
          Remove
        </button>
      </div>
      <div className="relative mb-[0.75rem]">
        <h3 className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333]">
          Platform
        </h3>
        <div
          onClick={handleChange}
          className="text-[1rem] leading-[1.5rem] font-[400] relative border-[0.0625rem] border-[#D9D9D9] w-full rounded-lg pl-[2.75rem] pr-[7rem] p-[0.75rem] mb-[1rem] outline-none select-none cursor-pointer hover:shadow-custom-purple-shadow"
        >
          <img
            src={platformIcons[currentPlatform].icon}
            alt={`${currentPlatform} icon`}
            className="absolute translate-y-[0.25rem] translate-x-[-1.7rem]"
          />
          <h3>{currentPlatform}</h3>
          <button
            type="button"
            onClick={() => {
              setRotate(!rotate);
            }}
            className={clsx(
              rotate && "rotate-180",
              "absolute w-[1rem] translate-y-[-1rem] right-[2rem] select-none outline-none"
            )}
          >
            <img src={arrowDownSvg} alt="arrowDownSvg" />
          </button>
        </div>
        {openList && (
          <div className="md:h-[10rem] border-[0.0625rem] border-[#D9D9D9] w-full rounded-lg p-[0.75rem] outline-none select-none h-[6.2rem] overflow-y-scroll custom-scrollbar">
            {Object.entries(platformIcons).map(([name, { icon }], index) => (
              <div
                key={name}
                onClick={() => selectPlatform(name as PlatformType)}
                className="cursor-pointer relative mb-[0.75rem]"
              >
                <img
                  src={icon}
                  alt={`${name} icon`}
                  className="absolute translate-x-[0.25rem] translate-y-[0.3rem]"
                />
                <h3
                  className={clsx(
                    currentPlatform === name && "text-[#633CFF]",
                    "pl-[2.75rem]"
                  )}
                >
                  {name}
                </h3>
                {index < Object.keys(platformIcons).length - 1 && (
                  <span className="flex h-[0.0625rem] w-full bg-[#D9D9D9] my-[0.75rem]" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <img
          src={linkSvg}
          alt="linkSvg"
          className="absolute translate-y-[2.15rem] translate-x-[1rem] select-none"
        />
        <h3 className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333]">
          Link
        </h3>
        <input
          {...register(`links.${props.index}.url`)}
          type="text"
          id={`url ${props.index}`}
          placeholder="e.g. https://www.github.com/johnappleseed"
          className={clsx(
            error
              ? "border-[#FF3939]"
              : "border-[#D9D9D9] hover:shadow-custom-purple-shadow hover:border-[#633CFF]",
            "text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] w-full rounded-lg pl-[2.75rem] pr-[7rem] p-[0.75rem] outline-none"
          )}
        />
        {error && (
          <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] absolute translate-x-[-6.5rem] translate-y-[1.2rem] w-max">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}
export default AddLink;

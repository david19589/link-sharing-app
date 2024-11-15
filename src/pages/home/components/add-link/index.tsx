import githubSvg from "../../../../assets/images/icon-github.svg";
import arrowDownSvg from "../../../../assets/images/icon-chevron-down.svg";
import { useState } from "react";
import clsx from "clsx";

function AddLink(props: {
  id: number;
  index: number;
  removeLink: (id: number) => void;
}) {
  const [rotate, setRotate] = useState(false);

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
          onClick={() => {
            props.removeLink(props.id);
          }}
          className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] outline-none"
        >
          Remove
        </button>
      </div>
      <div className="gap-[0.25rem] relative">
        <img
          src={githubSvg}
          alt="githubSvg"
          className="absolute translate-y-[2.15rem] translate-x-[1rem] select-none"
        />
        <h3 className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333]">
          Platform
        </h3>
        <select
          onClick={() => {
            setRotate(!rotate);
          }}
          className="text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] w-full rounded-lg pl-[2.75rem] pr-[7rem] p-[0.75rem] outline-none appearance-none cursor-pointer"
        >
          <option value="github">GitHub</option>
          <option value="youtube">YouTube</option>
          <option value="linkedin">LinkedIn</option>
          <option value="dev.to">Dev.to</option>
          <option value="codeWars">CodeWars</option>
          <option value="freeCodeCamp">freeCodeCamp</option>
        </select>
        <button
          onClick={() => {
            setRotate(!rotate);
          }}
          className={clsx(
            rotate && "rotate-180",
            "absolute w-[1rem] translate-y-[1.2rem] translate-x-[-2.5rem] select-none outline-none"
          )}
        >
          <img src={arrowDownSvg} alt="arrowDownSvg" />
        </button>
      </div>
    </div>
  );
}
export default AddLink;

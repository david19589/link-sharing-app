import phoneMockupSvg from "../../assets/images/illustration-phone-mockup.svg";
import { useState } from "react";
import Header from "./components/header";
import Links from "./links";
import ProfileDetails from "./components/profile-details";
import { useContextHook } from "../../hooks/useContext";
import arrowSvg from "../../assets/images/icon-arrow-right.svg";
import { ImageUpload } from "../../utils/imageUpload";
import clsx from "clsx";

function Home(props: { setLoggedIn: (status: boolean) => void }) {
  const [changeOption, setChangeOption] = useState(false);
  const { links, platformIcons, personalInfo } = useContextHook();
  const { previewUrl } = ImageUpload();

  return (
    <div className="md:p-[1.5rem] flex flex-col items-center">
      <Header changeOption={changeOption} setChangeOption={setChangeOption} setLoggedIn={props.setLoggedIn}/>
      <div className="lg:gap-[1.5rem] flex justify-center max-w-[90rem] w-full">
        <div className="lg:flex hidden relative">
          {links.length > 0 && (
            <span className="flex absolute left-[9rem] top-[18rem] w-[17rem] h-[22rem] bg-[#FFF] rounded-3xl" />
          )}
          {personalInfo?.firstName && (
            <span className="flex absolute left-[9rem] top-[6rem] w-[17rem] h-[12rem] bg-[#FFF] rounded-3xl" />
          )}
          <img
            className="bg-[#FFF] px-[7.90625rem] py-[2.7rem] rounded-lg"
            src={phoneMockupSvg}
            alt="phoneMockupSvg"
          />
          <div
            className={clsx(
              previewUrl
                ? "top-[6.5rem] left-[9.5rem]"
                : "top-[14rem] left-[9.5rem]",
              "flex flex-col items-center absolute w-[16rem]"
            )}
          >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="previewUrl"
                className="w-[6.5rem] h-[6.5rem] object-cover rounded-full border-[0.25rem] border-[#633CFF] mb-[0.99rem] select-none"
              />
            )}
            <h1 className="text-[1.125rem] leading-[1.7rem] font-[700] text-[#333333] mb-[0.15rem]">
              {personalInfo?.firstName}
            </h1>
            <h3 className="text-[0.9rem] leading-[1.35rem] font-[400] text-[#737373]">
              {personalInfo?.email}
            </h3>
          </div>
          <div className="absolute top-[20.25rem] left-[10rem] max-w-[15.35rem] w-full h-[20rem] custom-scrollbar overflow-y-scroll">
            {links.map((link, index) => {
              const IconComponent = platformIcons[link.platform].icon;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between mb-[1.25rem] p-[0.8125rem] rounded-lg max-w-[15.35rem] w-full cursor-default"
                  style={{
                    backgroundColor: platformIcons[link.platform].color,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-[1rem] h-[1rem] select-none" />
                    <h2 className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#FFF]">
                      {link.platform}
                    </h2>
                  </div>
                  <img src={arrowSvg} alt="arrowSvg" className="select-none" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:max-w-[50.5rem] md:p-0 max-w-[45.0625rem] w-full p-[1rem]">
          {changeOption ? <ProfileDetails /> : <Links />}
        </div>
      </div>
    </div>
  );
}

export default Home;

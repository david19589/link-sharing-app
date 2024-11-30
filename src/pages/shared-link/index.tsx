import { Link } from "react-router-dom";
import { ImageUpload } from "../../utils/imageUpload";
import { useContextHook } from "../../hooks/useContext";
import arrowSvg from "../../assets/images/icon-arrow-right.svg";
import userVsg from "../../assets/images/icon-upload-image.svg";

function SharedLink() {
  const { links, platformIcons, personalInfo } = useContextHook();
  const { previewUrl } = ImageUpload();

  return (
    <>
      <span className="md:flex hidden absolute top-0 left-0 right-0 h-[22.5rem] bg-[#633CFF] rounded-b-3xl z-[-10]" />
      <div className="md:px-[1.5rem] flex flex-col items-center mt-[7rem]">
        <div className="lg:max-w-[28rem] md:bg-[#FFF] md:rounded-xl md:shadow-custom-purple-shadow md:px-[3.5rem] md:py-[3rem] flex flex-col items-center max-w-[21.875rem] w-full">
          <img
            src={previewUrl ? previewUrl : userVsg}
            alt="previewUrl"
            className="w-[6.5rem] h-[6.5rem] object-cover rounded-full border-[0.25rem] border-[#633CFF] mb-[1.5rem] select-none"
          />
          <div className="flex flex-col items-center w-full">
            <h1 className="text-[2rem] leading-[3rem] font-[700] text-[#333333] mb-[0.5rem]">
              {personalInfo.firstName}
            </h1>
            <h3 className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373]">
              {personalInfo.email}
            </h3>
            <h2 className="text-[2rem] leading-[3rem] font-[700] text-[#333333] mb-[3.5rem]"></h2>
            <div className="lg:max-w-[20rem] max-w-[15rem] w-full h-[14rem] custom-scrollbar overflow-y-scroll">
              {links.map((link) => {
                const IconComponent = platformIcons[link.platform].icon;

                return (
                  <Link
                    to={link.url}
                    key={link.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <div
                      className="lg:max-w-[20rem] flex items-center justify-between mb-[1.25rem] p-[1rem] rounded-lg max-w-[15rem] w-full cursor-pointer"
                      style={{
                        backgroundColor: platformIcons[link.platform].color,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-[1rem] h-[1rem] select-none" />
                        <h2 className="text-[1rem] leading-[1.5rem] font-[400] text-[#FFF]">
                          {link.platform}
                        </h2>
                      </div>
                      <img
                        src={arrowSvg}
                        alt="arrowSvg"
                        className="select-none"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SharedLink;

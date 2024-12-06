import { Link } from "react-router-dom";
import { ImageUpload } from "../../utils/imageUpload";
import { useContextHook } from "../../hooks/useContext";
import arrowSvg from "../../assets/images/icon-arrow-right.svg";
import userVsg from "../../assets/images/icon-upload-image.svg";
import savedSvg from "../../assets/images/icon-changes-saved.svg";
import clsx from "clsx";
import { v4 as uuid } from "uuid";

function Preview() {
  const { links, platformIcons, message, setMessage, personalInfo } =
    useContextHook();
  const { profilePicture } = ImageUpload();

  const copyLinkToClipboard = async () => {
    const currentUrl = window.location.href;
    const cleanUrl = currentUrl.replace("/preview", "");

    const uniqueId = uuid();
    const modifiedLink = `${cleanUrl}/shared-link/${personalInfo.firstName}?ID=$${uniqueId}`;

    try {
      await navigator.clipboard.writeText(modifiedLink);
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy link.");
    }
  };

  return (
    <>
      <span className="md:flex hidden absolute top-0 left-0 right-0 h-[22.5rem] bg-[#633CFF] rounded-b-3xl z-[-10]" />
      <div className="md:px-[1.5rem] flex flex-col items-center">
        <div className="md:justify-between md:bg-[#FFF] md:px-[1.5rem] md:py-[1rem] md:rounded-lg flex justify-center gap-[1rem] mt-[1rem] mb-[4rem] p-[0.5rem] max-w-[87rem] w-full">
          <Link to="/home" className="w-max">
            <button className="md:px-[1rem] px-[0.5rem] py-[0.7rem] max-w-[10rem] w-full border-[0.0625rem] border-[#633CFF] text-[1rem] leading-[1.5rem] font-[600] text-[#633CFF] rounded-lg outline-none">
              Back to Editor
            </button>
          </Link>
          <button
            onClick={copyLinkToClipboard}
            className="md:px-[1rem] px-[0.5rem] py-[0.7rem] max-w-[10rem] w-full border-[0.0625rem] border-[#633CFF] text-[1rem] leading-[1.5rem] font-[600] text-[#FFF] bg-[#633CFF] rounded-lg outline-none"
          >
            Share Link
          </button>
        </div>
        <div className="lg:max-w-[28rem] md:bg-[#FFF] md:rounded-xl md:shadow-custom-purple-shadow md:px-[3.5rem] md:py-[3rem] flex flex-col items-center max-w-[21.875rem] w-full">
          <img
            src={profilePicture ? profilePicture : userVsg}
            alt="previewUrl"
            className="w-[6.5rem] h-[6.5rem] object-cover rounded-full border-[0.25rem] border-[#633CFF] mb-[1.5rem] select-none"
          />
          <div className="flex flex-col items-center w-full">
            <h1 className="text-[2rem] leading-[3rem] font-[700] text-[#333333] mb-[0.5rem]">
              {personalInfo.firstName}
            </h1>
            <h3 className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] break-all">
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
        <div
          className={clsx(
            message ? "flex" : "hidden",
            "fixed bottom-[1rem] gap-[0.5rem] bg-[#333333] px-[1.5rem] py-[1rem] rounded-lg w-max self-center"
          )}
        >
          <img src={savedSvg} alt="savedSvg" />
          <span className="text-[1rem] leading-[1.25rem] font-[600] text-[#FAFAFA]">
            Link saved to clipboard!
          </span>
        </div>
      </div>
    </>
  );
}
export default Preview;

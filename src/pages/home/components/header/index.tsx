import logo from "../../../../assets/images/logo-devlinks-small.svg";
import logoLarge from "../../../../assets/images/logo-devlinks-large.svg";
import linkSvg from "../../../../assets/images/icon-link.svg";
import userSvg from "../../../../assets/images/icon-profile-details-header.svg";
import LinkSvg from "../../../../assets/icons/linkSvg";
import ProfileSvg from "../../../../assets/icons/profileSvg";
import previewSvg from "../../../../assets/images/icon-preview-header.svg";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Header(props: {
  changeOption: boolean;
  setChangeOption: (status: boolean) => void;
}) {
  return (
    <div className="md:rounded-lg flex items-center justify-between bg-[#FFF] py-[1rem] px-[1.5rem] rounded-b-lg mb-[1rem] max-w-[87rem] w-full">
      <Link to="/">
        <button className="md:hidden  outline-none h-max">
          <img src={logo} alt="logo" />
        </button>
        <button className="md:flex hidden outline-none h-max">
          <img className="w-[9.625rem]" src={logoLarge} alt="logoLarge" />
        </button>
      </Link>
      {props.changeOption ? (
        <div className="flex items-center">
          <button
            onClick={() => {
              props.setChangeOption(false);
            }}
            className="md:w-[7.625rem] flex items-center justify-center gap-[0.5rem] sm:w-[5.625rem] w-[3.4rem] h-[2.625rem] outline-none"
          >
            <img className="rounded-lg" src={linkSvg} alt="linkSvg" />
            <h3
              className={clsx(
                props.changeOption ? "text-[#737373]" : "text-[#633CFF]",
                "md:flex hidden text-[1rem] leading-[1.5rem] font-[600]"
              )}
            >
              Links
            </h3>
          </button>
          <button
            onClick={() => {
              props.setChangeOption(true);
            }}
            className="md:w-[11.6875rem] flex items-center justify-center bg-[#EFEBFF] gap-[0.5rem] sm:w-[5.625rem] w-[3.4rem] h-[2.625rem] rounded-lg outline-none"
          >
            <ProfileSvg />
            <h3
              className={clsx(
                props.changeOption ? "text-[#633CFF]" : "text-[#737373]",
                "md:flex hidden text-[1rem] leading-[1.5rem] font-[600]"
              )}
            >
              Profile Details
            </h3>
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            onClick={() => {
              props.setChangeOption(false);
            }}
            className="md:w-[7.625rem] flex items-center justify-center bg-[#EFEBFF] gap-[0.5rem] sm:w-[5.625rem] w-[3.4rem] h-[2.625rem] rounded-lg outline-none"
          >
            <LinkSvg />
            <h3
              className={clsx(
                props.changeOption ? "text-[#737373]" : "text-[#633CFF]",
                "md:flex hidden text-[1rem] leading-[1.5rem] font-[600]"
              )}
            >
              Links
            </h3>
          </button>
          <button
            onClick={() => {
              props.setChangeOption(true);
            }}
            className="md:w-[11.6875rem] flex items-center justify-center gap-[0.5rem] sm:w-[5.625rem] w-[3.4rem] h-[2.625rem] outline-none"
          >
            <img className="rounded-lg" src={userSvg} alt="userSvg" />
            <h3
              className={clsx(
                props.changeOption ? "text-[#633CFF]" : "text-[#737373]",
                "md:flex hidden text-[1rem] leading-[1.5rem] font-[600]"
              )}
            >
              Profile Details
            </h3>
          </button>
        </div>
      )}
      <button className="md:hidden px-[1.1rem] py-[0.62rem] border-[0.0625rem] border-[#633CFF] rounded-lg hover:bg-[#EFEBFF] transition-all duration-200">
        <img src={previewSvg} alt="previewSvg" />
      </button>

      <button className="md:flex hidden text-[1rem] leading-[1.5rem] font-[600] text-[#633CFF] border-[0.0625rem] px-[1.1rem] py-[0.62rem] border-[#633CFF] rounded-lg hover:bg-[#EFEBFF] transition-all duration-200">
        Preview
      </button>
    </div>
  );
}
export default Header;

import emptySvg from "../../assets/images/illustration-empty.svg";
import phoneMockupSvg from "../../assets/images/illustration-phone-mockup.svg";
import { useState } from "react";
import Header from "./components/header";
import AddLink from "./components/add-link";

interface Link {
  id: number;
  platform: string;
  url: string;
}

function Home() {
  const [changeOption, setChangeOption] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);

  const addLink = () => {
    setLinks([...links, { id: Date.now(), platform: "", url: "" }]);
  };

  const removeLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="md:p-[1.5rem] flex flex-col items-center">
      <Header changeOption={changeOption} setChangeOption={setChangeOption} />
      <div className="lg:gap-[1.5rem] flex justify-center max-w-[90rem] w-full">
        <img
          className="lg:flex hidden bg-[#FFF] px-[7.90625rem] py-[2.7rem] rounded-lg"
          src={phoneMockupSvg}
          alt="phoneMockupSvg"
        />
        <div className="lg:max-w-[50.5rem] md:p-0 max-w-[45.0625rem] w-full p-[1rem]">
          <div className="flex flex-col items-center p-[1.5rem] w-full bg-[#FFF] rounded-lg">
            <div className="max-w-[45.5rem] w-full mb-[1.5rem]">
              <h2 className="md:text-[2rem] md:leading-[3rem] text-[1.5rem] leading-[2.25rem] font-[700] text-[#333333] mb-[0.5rem]">
                Customize your links
              </h2>
              <p className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] mb-[2.5rem]">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
              <button
                onClick={addLink}
                className="text-[1rem] leading-[1.5rem] font-[600] text-[#633CFF] bg-[#FFF] border-[0.0625rem] border-[#633CFF] max-w-[45.5rem] w-full p-[0.75rem] rounded-lg cursor-pointer outline-none hover:bg-[#EFEBFF] transition-all duration-200"
              >
                + Add new link
              </button>
            </div>
            {links.length < 1 ? (
              <div className="flex flex-col items-center gap-[1.5rem] px-[1.25rem] py-[2.75rem] bg-[#FAFAFA] max-w-[45.5rem] w-full rounded-md">
                <img className="w-[7.75rem]" src={emptySvg} alt="emptySvg" />
                <h2 className="md:text-[2rem] md:leading-[3rem] text-[1.5rem] leading-[2.25rem] font-[700] text-center text-[#333333] mb-[0.5rem]">
                  Let's get you started
                </h2>
                <p className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] mb-[2.5rem] max-w-[30.5rem] w-full text-center">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We're here
                  to help you share your profiles with everyone!
                </p>
              </div>
            ) : (
              <div className="md:h-[23.5rem] w-full h-[15rem] overflow-y-scroll custom-scrollbar">
                {links.map((link, index) => (
                  <AddLink
                    key={link.id}
                    id={link.id}
                    index={index}
                    removeLink={removeLink}
                  />
                ))}
              </div>
            )}
            <span className="flex h-[0.0625rem] w-full bg-[#D9D9D9] my-[1.5rem]"></span>
            <button className="md:max-w-[5.6875rem] md:self-end text-[1rem] leading-[1.5rem] font-[600] text-[#FFF] bg-[#633CFF] max-w-[24.75rem] w-full p-[0.75rem] rounded-lg cursor-pointer outline-none opacity-[25%] hover:bg-[#BEADFF] hover:opacity-1">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

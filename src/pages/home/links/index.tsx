import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import AddLink from "../components/add-link";
import emptySvg from "../../../assets/images/illustration-empty.svg";
import savedSvg from "../../../assets/images/icon-changes-saved.svg";
import { useContextHook } from "../../../hooks/useContext";
import clsx from "clsx";

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

type FormData = {
  links: {
    url: string;
    id: number;
    platform: PlatformType;
  }[];
};

const schema = z.object({
  links: z.array(
    z.object({
      url: z
        .string()
        .nonempty({ message: "Can't be empty" })
        .regex(/^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/, {
          message: "Invalid format",
        }),
    })
  ),
});

function Links() {
  const { message, setMessage, setLinks } = useContextHook();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      links: JSON.parse(localStorage.getItem("formData") || "[]"),
    },
  });

  const { handleSubmit, control, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const removeLink = (id: number) => {
    const index = fields.findIndex((filed) => filed.id === id);

    if (index !== -1) {
      remove(index);
      const updatedLinks = fields.filter((field) => field.id !== id);
      setLinks(updatedLinks);
      localStorage.setItem("formData", JSON.stringify(updatedLinks));
    }
  };

  const onSubmit = () => {
    const formData = watch();
    const updatedLinks = formData.links || [];

    setLinks(updatedLinks);
    localStorage.setItem("formData", JSON.stringify(updatedLinks));
    localStorage.setItem("links", JSON.stringify(updatedLinks));

    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center p-[1.5rem] w-full bg-[#FFF] rounded-lg">
          <div className="max-w-[45.5rem] w-full mb-[1.5rem]">
            <h2 className="md:text-[2rem] md:leading-[3rem] text-[1.5rem] leading-[2.25rem] font-[700] text-[#333333] mb-[0.5rem]">
              Customize your links
            </h2>
            <p className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] mb-[2.5rem]">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            <button
              type="button"
              onClick={() => {
                append({ id: Date.now(), platform: "GitHub", url: "" });
              }}
              className="text-[1rem] leading-[1.5rem] font-[600] text-[#633CFF] bg-[#FFF] border-[0.0625rem] border-[#633CFF] max-w-[45.5rem] w-full p-[0.75rem] rounded-lg cursor-pointer outline-none hover:bg-[#EFEBFF] transition-all duration-200"
            >
              + Add new link
            </button>
          </div>
          {fields.length < 1 ? (
            <div className="flex flex-col items-center gap-[1.5rem] px-[1.25rem] py-[2.75rem] bg-[#FAFAFA] max-w-[45.5rem] w-full rounded-md">
              <img className="w-[7.75rem]" src={emptySvg} alt="emptySvg" />
              <h2 className="md:text-[2rem] md:leading-[3rem] text-[1.5rem] leading-[2.25rem] font-[700] text-center text-[#333333] mb-[0.5rem]">
                Let's get you started
              </h2>
              <p className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] mb-[2.5rem] max-w-[30.5rem] w-full text-center">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!
              </p>
            </div>
          ) : (
            <div className="md:h-[23.992rem] w-full h-[15rem] overflow-y-scroll custom-scrollbar">
              {fields.map((field, index) => (
                <AddLink
                  key={field.id}
                  field={field}
                  remove={() => removeLink(field.id)}
                  index={index}
                />
              ))}
            </div>
          )}
          <span className="flex h-[0.0625rem] w-full bg-[#D9D9D9] my-[1.5rem]" />
          {fields.length < 1 ? (
            <button
              type="button"
              className="md:max-w-[5.6875rem] md:self-end text-[1rem] leading-[1.5rem] font-[600] text-[#FFF] bg-[#633CFF] opacity-[25%] cursor-default max-w-[24.75rem] w-full p-[0.75rem] rounded-lg outline-none"
            >
              Save
            </button>
          ) : (
            <button
              type="submit"
              className="md:max-w-[5.6875rem] md:self-end text-[1rem] leading-[1.5rem] font-[600] text-[#FFF] bg-[#633CFF] opacity-1 cursor-pointer hover:bg-[#BEADFF] max-w-[24.75rem] w-full p-[0.75rem] rounded-lg outline-none"
            >
              Save
            </button>
          )}
          <div
            className={clsx(
              message ? "flex" : "hidden",
              "fixed bottom-[1rem] gap-[0.5rem] bg-[#333333] px-[1.5rem] py-[1rem] rounded-lg w-max self-center"
            )}
          >
            <img src={savedSvg} alt="savedSvg" />
            <span className="text-[1rem] leading-[1.25rem] font-[600] text-[#FAFAFA]">
              Your changes have been successfully saved!
            </span>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
export default Links;

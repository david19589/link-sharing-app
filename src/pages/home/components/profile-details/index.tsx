import { z, ZodType } from "zod";
import uploadImageSvg from "../../../../assets/images/icon-upload-image.svg";
import savedSvg from "../../../../assets/images/icon-changes-saved.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { ImageUpload } from "../../../../utils/imageUpload";
import { useRef } from "react";
import { useContextHook } from "../../../../hooks/useContext";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
};

const schema: ZodType<FormData> = z.object({
  email: z
    .string()
    .nonempty({ message: "Can't be empty" })
    .email({ message: "invalid format." })
    .max(20, { message: "max 20 char." }),
  firstName: z
    .string()
    .nonempty({ message: "Can't be empty" })
    .max(12, { message: "max 12 char." }),
  lastName: z
    .string()
    .nonempty({ message: "Can't be empty" })
    .max(20, { message: "max 20 char." }),
});

function ProfileDetails() {
  const { message, setMessage, personalInfo, setPersonalInfo } =
    useContextHook();

  const { handleImage, previewUrl, setPreviewUrl } = ImageUpload();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: personalInfo,
  });

  const onSubmit = (data: FormData) => {
    if (previewUrl) {
      localStorage.setItem("previewUrl", previewUrl);
      setPreviewUrl(previewUrl);
    }

    setPersonalInfo(data);
    localStorage.setItem("personalInfo", JSON.stringify(data));
    localStorage.setItem("previewUrl", previewUrl);

    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center p-[1.5rem] w-full bg-[#FFF] rounded-lg">
      <div className="max-w-[45.5rem] w-full mb-[1.5rem]">
        <h2 className="md:text-[2rem] md:leading-[3rem] text-[1.5rem] leading-[2.25rem] font-[700] text-[#333333] mb-[0.5rem]">
          Profile Details
        </h2>
        <p className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] mb-[2.5rem]">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <div className="md:flex-row md:items-center md:justify-between flex flex-col items-start p-[1.25rem] w-full bg-[#FAFAFA] rounded-lg mb-[1.341rem]">
        <h3 className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373] mb-[1rem]">
          Profile picture
        </h3>
        <div className="md:flex-row md:items-center md:gap-[1.5rem] flex flex-col items-start">
          <div
            onClick={triggerFileInput}
            style={
              previewUrl ? { backgroundImage: `url(${previewUrl})` } : undefined
            }
            className={clsx(
              previewUrl && "bg-cover bg-center bg-no-repeat",
              "md:mb-0 flex flex-col items-center gap-[0.9rem] py-[2.25rem] px-[1.25rem] bg-[#EFEBFF] rounded-md cursor-pointer mb-[1.5rem]"
            )}
          >
            <input
              className="hidden"
              type="file"
              onChange={handleImage}
              ref={inputRef}
            />
            <img
              className="select-none"
              src={uploadImageSvg}
              alt="uploadImageSvg"
            />
            <h2 className="text-[1rem] leading-[1.25rem] font-[700] text-[#633CFF] text-center select-none">
              + Upload Image
            </h2>
          </div>
          <p className="md:max-w-[8rem] text-[0.75rem] leading-[1.125rem] font-[400] text-[#737373]">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </div>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-start p-[1.25rem] w-full bg-[#FAFAFA] rounded-lg">
          <div className="md:flex-row md:items-center md:justify-between flex flex-col w-full mb-[0.75rem]">
            <h3 className="md:text-[1rem] md:leading-[1.5rem] text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333] mb-[0.25rem]">
              First name*
            </h3>
            <div className="max-w-[27rem] w-full relative">
              <input
                {...register("firstName")}
                type="tel"
                maxLength={12}
                id="first-name"
                placeholder="Ben"
                autoComplete="first-name"
                className="text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] max-w-[27rem] w-full rounded-lg pr-[7rem] p-[0.75rem] outline-none hover:shadow-custom-purple-shadow hover:border-[#633CFF]"
              />
              {errors.firstName && (
                <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] absolute right-[1rem] top-[1rem]">
                  {errors.firstName?.message}
                </span>
              )}
            </div>
          </div>
          <div className="md:flex-row md:items-center md:justify-between flex flex-col w-full mb-[0.75rem]">
            <h3 className="md:text-[1rem] md:leading-[1.5rem] text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333] mb-[0.25rem]">
              Last name*
            </h3>
            <div className="max-w-[27rem] w-full relative">
              <input
                {...register("lastName")}
                type="tel"
                maxLength={20}
                id="last-name"
                placeholder="Wright"
                className="text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] max-w-[27rem] w-full rounded-lg pr-[7rem] p-[0.75rem] outline-none hover:shadow-custom-purple-shadow hover:border-[#633CFF]"
              />
              {errors.lastName && (
                <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] absolute right-[1rem] top-[1rem]">
                  {errors.lastName?.message}
                </span>
              )}
            </div>
          </div>
          <div className="md:flex-row md:items-center md:justify-between flex flex-col w-full mb-[0.75rem] relative">
            <h3 className="md:text-[1rem] md:leading-[1.5rem] text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333] mb-[0.25rem]">
              Email
            </h3>
            <div className="max-w-[27rem] w-full relative">
              <input
                {...register("email")}
                type="tel"
                maxLength={20}
                id="email"
                placeholder="ben@example.com"
                autoComplete="email"
                className="text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] max-w-[27rem] w-full rounded-lg pr-[7rem] p-[0.75rem] outline-none hover:shadow-custom-purple-shadow hover:border-[#633CFF]"
              />
              {errors.email && (
                <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] absolute right-[1rem] top-[1rem]">
                  {errors.email?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <span className="flex h-[0.0625rem] w-full bg-[#D9D9D9] my-[1.5rem]" />
        {errors.firstName || errors.lastName || errors.email ? (
          <button
            type="button"
            className="md:max-w-[5.6875rem] md:self-end text-[1rem] leading-[1.5rem] font-[600] text-[#FFF] cursor-default bg-[#BEADFF] max-w-[24.75rem] w-full p-[0.75rem] rounded-lg outline-none"
          >
            Save
          </button>
        ) : (
          <button
            type="submit"
            className="md:max-w-[5.6875rem] md:self-end text-[1rem] leading-[1.5rem] font-[600] text-[#FFF] cursor-pointer bg-[#633CFF] hover:bg-[#BEADFF] max-w-[24.75rem] w-full p-[0.75rem] rounded-lg outline-none"
          >
            Save
          </button>
        )}
      </form>
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
  );
}
export default ProfileDetails;

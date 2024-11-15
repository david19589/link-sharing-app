import logo from "../../assets/images/logo-devlinks-large.svg";
import emailSvg from "../../assets/images/icon-email.svg";
import passwordSvg from "../../assets/images/icon-password.svg";
import { Link, useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema: ZodType<FormData> = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Can't be empty" })
      .email({ message: "invalid format." })
      .max(40, { message: "max 40 char." }),
    password: z
      .string()
      .nonempty({ message: "Can't be empty" })
      .min(8, { message: "min 8 char." }),
    confirmPassword: z.string().nonempty({ message: "Can't be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "doesn't match",
    path: ["confirmPassword"],
  });

function CreateAccount() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    localStorage.setItem("user_email", data.email);
    localStorage.setItem("user_password", data.password);
    navigate("/");
    return data;
  };

  return (
    <div className="md:justify-center flex flex-col items-center p-[2rem] h-full">
      <div className="md:flex md:flex-col md:items-center md:max-w-[29.75rem] max-w-[24.75rem] w-full">
        <img
          className="md:self-center self-start mb-[4rem] select-none"
          src={logo}
          alt="logo"
        />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:bg-[#FFF] md:rounded-lg md:max-w-[29.75rem] md:p-[2.5rem] max-w-[24.75rem] w-full">
            <div className="mb-[2.5rem]">
              <h2 className="md:text-[2rem] md:leading-[3rem] text-[1.5rem] leading-[2.25rem] font-[700] text-[#333333] mb-[0.5rem]">
                Create account
              </h2>
              <p className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373]">
                Let's get you started sharing your links!
              </p>
            </div>
            <div className="flex flex-col gap-[1.5rem]">
              <div className="flex flex-col gap-[0.25rem] w-full">
                <h3 className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333]">
                  Email address
                </h3>
                <div className="w-[full]">
                  <img
                    src={emailSvg}
                    alt="emailSvg"
                    className="absolute translate-y-[1.15rem] translate-x-[1rem] select-none"
                  />
                  <input
                    {...register("email")}
                    type="tel"
                    id="email-register"
                    autoComplete="email-register"
                    placeholder="e.g.alex@email.com"
                    maxLength={40}
                    className={clsx(
                      errors.email ? "border-[#FF3939]" : "border-[#D9D9D9]",
                      "text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] max-w-[24.75rem] w-full rounded-lg pl-[2.75rem] pr-[7rem] p-[0.75rem] outline-none"
                    )}
                  />
                  {errors.email && (
                    <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] absolute translate-x-[-6.5rem] translate-y-[1.2rem]">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[0.25rem] w-full">
                <h3 className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333]">
                  Create password
                </h3>
                <div className="w-[full]">
                  <img
                    src={passwordSvg}
                    alt="password"
                    className="absolute translate-y-[1.15rem] translate-x-[1rem] select-none"
                  />
                  <input
                    {...register("password")}
                    type="password"
                    id="password-register"
                    placeholder="At least 8 characters"
                    maxLength={60}
                    className={clsx(
                      errors.password ? "border-[#FF3939]" : "border-[#D9D9D9]",
                      "text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] max-w-[24.75rem] w-full rounded-lg pl-[2.75rem] pr-[7rem] p-[0.75rem] outline-none"
                    )}
                  />
                  {errors.password && (
                    <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] absolute translate-x-[-6.5rem] translate-y-[1.2rem]">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[0.25rem] w-full">
                <h3 className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#333333]">
                  Confirm password
                </h3>
                <div className="w-[full]">
                  <img
                    src={passwordSvg}
                    alt="password"
                    className="absolute translate-y-[1.15rem] translate-x-[1rem] select-none"
                  />
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    id="confirm-password"
                    placeholder="At least 8 characters"
                    maxLength={60}
                    className={clsx(
                      errors.confirmPassword
                        ? "border-[#FF3939]"
                        : "border-[#D9D9D9]",
                      "text-[1rem] leading-[1.5rem] font-[400] border-[0.0625rem] max-w-[24.75rem] w-full rounded-lg pl-[2.75rem] pr-[7rem] p-[0.75rem] outline-none"
                    )}
                  />
                  {errors.confirmPassword && (
                    <span className="text-[0.7rem] leading-[1rem] font-[400] text-[#FF3939] absolute translate-x-[-6.5rem] translate-y-[1.2rem]">
                      {errors.confirmPassword?.message}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-[0.75rem] leading-[1.125rem] font-[400] text-[#737373]">
                Password must contain at least 8 characters
              </p>
              <button
                type="submit"
                className="text-[1rem] leading-[1.5rem] font-[600] text-[#FFF] bg-[#633CFF] max-w-[24.75rem] w-full p-[0.75rem] rounded-lg cursor-pointer outline-none"
              >
                Create new account
              </button>
              <div className="md:flex-row md:justify-center md:gap-[0.5rem] flex flex-col items-center">
                <h3 className="text-[1rem] leading-[1.5rem] font-[400] text-[#737373]">
                  Already have an account?
                </h3>
                <Link to="/">
                  <h3 className="text-[1rem] leading-[1.5rem] font-[400] text-[#633CFF] cursor-pointer">
                    Login
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateAccount;

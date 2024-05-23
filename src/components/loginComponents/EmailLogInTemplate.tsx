"use client";

import {
  EmailSVG,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  PasswordSVG,
  LogSVG,
} from "@/components/assets/FormsAsset";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { Inputs } from "@/libs/types/general";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { logIn } from "@/libs/actions/LogInAction";
import { Toaster, toast } from "sonner";

export default function EmailTemplate() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (user) => {
    setIsLoading(true);
    const error = await logIn(user);
    setIsLoading(false);
    if (error) {
      toast.warning(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <div className="w-full flex flex-col gap-8">
          <div>
            <Input
              {...register("email", {
                required: { value: true, message: "Email is required" },
                maxLength: 40,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              variant="underlined"
              type="email"
              label="Email Address"
              labelPlacement="outside"
              placeholder="Enter your email"
              startContent={<EmailSVG />}
            />
            {errors.email && (
              <span className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <Input
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              type={isVisible ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              variant="underlined"
              placeholder="Enter your password"
              startContent={<PasswordSVG />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
            />
            {errors.password && (
              <span className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-row justify-end">
          <Link href="#" className=" my-4 text-sm">
            Forgot your password?
          </Link>
        </div>
        <div>
          <Button
            type="submit"
            startContent={<LogSVG />}
            className="py-2 px-4 rounded-md bg-white text-black font-semibold text-md w-full"
            isLoading={isLoading}
          >
            Log In
          </Button>
        </div>
      </form>
    </>
  );
}

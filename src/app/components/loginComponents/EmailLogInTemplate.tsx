"use client";

import {
  EmailSVG,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  PasswordSVG,
  LogSVG,
} from "@/app/assets/FormsAsset";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { Inputs } from "@/app/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function EmailTemplate() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (user) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    const session = await supabase.auth.getSession();
    console.log(session);
    ({ session });
    if (!error) {
      setErrorMessage("");
      router.push("/");
    } else {
      setErrorMessage(error.message);
    }
  };

  return (
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
      <div className="w-full flex flex-row justify-between">
        <Checkbox size="sm">Remeber me</Checkbox>
        <Link href="#" className=" my-4 text-sm">
          Forgot your password?
        </Link>
      </div>
      <div>
        <Button
          type="submit"
          startContent={<LogSVG />}
          className="py-2 px-4 rounded-md bg-white text-black font-semibold text-md w-full"
        >
          Log In
        </Button>
        {errorMessage && (
          <div
            className={`w-full py-3 flex justify-center bg-red-600 border border-red-600 boder-2 rounded-3xl font-semibold  mt-3`}
          >
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </form>
  );
}

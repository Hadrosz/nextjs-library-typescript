"use client";
import { EmailSVG, LogSVG, PasswordSVG } from "@/app/assets/FormsAsset";

import { Button, Input } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Inputs } from "@/app/types/type";

export function EmailSignInTemplate() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (user) => {
    if (user.confirmPassword !== user.password) {
      setPasswordMatch(true);
      return;
    }
    setPasswordMatch(false);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          user_name: user.username,
        },
      },
    });

    if (!error) {
      setErrorMessage(false);
      router.push("/auth/login");
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2 "
    >
      <div className="w-full flex flex-col gap-10">
        <div>
          {" "}
          <Input
            {...register("username", {
              required: { value: true, message: "Username is required" },
              maxLength: 40,
            })}
            variant="underlined"
            type="text"
            label="Username"
            labelPlacement="outside"
            placeholder="Enter your username"
            startContent={<EmailSVG />}
          />
          {errors.username && (
            <span className="text-red-400 text-xs mt-1">
              {errors.username.message}
            </span>
          )}
        </div>

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
              maxLength: 20,
              minLength: {
                value: 8,
                message: "Min characters 8",
              },
            })}
            type={"password"}
            label="Password"
            labelPlacement="outside"
            variant="underlined"
            placeholder="Enter your password"
            startContent={<PasswordSVG />}
          />

          {errors.password && (
            <span className="text-red-400 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <Input
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Password don't match",
              },
              maxLength: 20,
              minLength: {
                value: 8,
                message: "Min characters 8",
              },
            })}
            type={"password"}
            label="Confirm Password"
            labelPlacement="outside"
            variant="underlined"
            placeholder="Confirm your password"
            startContent={<PasswordSVG />}
          />
          {passwordMatch && (
            <span className="text-red-400 text-xs mt-1">
              Passwords don't match
            </span>
          )}
        </div>
      </div>
      <div>
        <Button
          type="submit"
          startContent={<LogSVG />}
          className="py-2 px-4 rounded-md bg-white text-black font-semibold text-md my-4 w-full"
        >
          Sign Up
        </Button>
        {errorMessage && (
          <div className="w-full py-3 flex justify-center bg-red-600 border border-red-600 boder-2 rounded-3xl font-semibold">
            <span>Error sending the data</span>
          </div>
        )}
      </div>
    </form>
  );
}

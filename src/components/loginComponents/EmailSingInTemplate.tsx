"use client";
import { EmailSVG, LogSVG, PasswordSVG } from "@/components/assets/FormsAsset";

import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Inputs } from "@/libs/types/general";
import { toast } from "sonner";
import { createClient } from "@/libs/supabase/client";

export function EmailSignInTemplate() {
  const supabaseClient = createClient();

  const [passwordMatch, setPasswordMatch] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (user) => {
    if (user.confirmPassword !== user.password) {
      setPasswordMatch(true);
      return;
    }
    setPasswordMatch(false);
    setIsLoading(true);

    const { data, error } = await supabaseClient.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          user_name: user.username,
          full_name: user.fullname,
        },
      },
    });
    setIsLoading(false);
    if (!error) {
      router.push("/auth/login");
    } else {
      toast.warning(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2 "
    >
      <div className="w-full flex flex-col gap-10">
        <div>
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
            {...register("fullname", {
              required: { value: true, message: "FullName is required" },
              maxLength: 70,
            })}
            variant="underlined"
            type="text"
            label="Full Name"
            labelPlacement="outside"
            placeholder="Enter your full name"
            startContent={<EmailSVG />}
          />
          {errors.fullname && (
            <span className="text-red-400 text-xs mt-1">
              {errors.fullname.message}
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
          isLoading={isLoading}
          type="submit"
          startContent={<LogSVG />}
          className="py-2 px-4 rounded-md bg-white text-black font-semibold text-md my-4 w-full"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}

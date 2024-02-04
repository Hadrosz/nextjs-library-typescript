"use client";
import {
  EmailSVG,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LogSVG,
  PasswordSVG,
} from "@/app/assets/FormsAsset";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export function EmailSignInTemplate() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-full flex flex-col gap-2"
    >
      <div className="w-full flex flex-col gap-8">
        <Input
          variant="underlined"
          type="text"
          label="Username"
          labelPlacement="outside"
          placeholder="Enter your username"
          startContent={<EmailSVG />}
        />
        <Input
          variant="underlined"
          type="email"
          label="Email Address"
          labelPlacement="outside"
          placeholder="Enter your email"
          startContent={<EmailSVG />}
        />
        <Input
          type={"password"}
          label="Password"
          labelPlacement="outside"
          variant="underlined"
          placeholder="Enter your password"
          startContent={<PasswordSVG />}
        />
        <Input
          type={"password"}
          label="Confirm Password"
          labelPlacement="outside"
          variant="underlined"
          placeholder="Confirm your password"
          startContent={<PasswordSVG />}
        />
      </div>
      <Button
        type="submit"
        startContent={<LogSVG />}
        className="py-2 px-4 rounded-md bg-white text-black font-semibold text-md  my-4"
      >
        Log In
      </Button>
    </form>
  );
}

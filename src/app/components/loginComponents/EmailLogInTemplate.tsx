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

export default function EmailTemplate() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
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
          type="email"
          label="Email Address"
          labelPlacement="outside"
          placeholder="Enter your email"
          startContent={<EmailSVG />}
        />
        <Input
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
      </div>
      <div className="w-full flex flex-row justify-between">
        <Checkbox size="sm">Remeber me</Checkbox>
        <Link href="#" className=" my-4 text-sm">
          Forgot your password?
        </Link>
      </div>
      <Button
        type="submit"
        startContent={<LogSVG />}
        className="py-2 px-4 rounded-md bg-white text-black font-semibold text-md"
      >
        Log In
      </Button>
    </form>
  );
}

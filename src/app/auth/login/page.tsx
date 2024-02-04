import EmailTemplate from "@/app/components/loginComponents/EmailLogInTemplate";
import { Divider } from "@nextui-org/react";
import {
  GitHubButton,
  GoogleButton,
} from "@/app/components/loginComponents/LoginButtons";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className=" flex place-content-center place-items-center h-[calc(100vh-8rem)] ">
      <article className="xl:w-1/3 sm:w-2/3  w-full flex flex-col place-content-center place-items-center h-[600px] rounded-2xl border border-gray-400 gap-6 p-16">
        <h1 className="text-md w-full">Log In with:</h1>
        <section className="flex justify-center flex-col w-full">
          <GoogleButton />
          <GitHubButton />
        </section>
        <Divider />
        <span className="text-gray-400">Log in with Email</span>
        <EmailTemplate />
        <Link href="/auth/signin" className="text-gray-400 text-sm">
          Sing in with Email
        </Link>
      </article>
    </section>
  );
}

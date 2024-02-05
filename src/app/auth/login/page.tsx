import EmailTemplate from "@/app/components/loginComponents/EmailLogInTemplate";
import { Divider } from "@nextui-org/react";
import {
  GitHubButton,
  DiscordButton,
} from "@/app/components/loginComponents/LoginButtons";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className=" flex place-content-center place-items-center h-[calc(100vh-8rem)] ">
      <article className="relative xl:w-1/3 sm:w-2/3  w-full flex flex-col place-content-center place-items-center sm:h-[700px] h-svh rounded-2xl border border-gray-400 gap-6 sm:p-16 p-8">
        <div className="flex place-items-center before:absolute before:h-[550px] before:w-full sm:before:w-[70px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[230px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[230px] z-[-1] absolute bottom-1/4" />
        <div className="flex place-items-center before:absolute before:h-[100px] before:w-full sm:before:w-[70px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[150px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-500 before:dark:opacity-10 after:dark:from-purple-500 after:dark:via-[#8d01ff] after:dark:opacity-40 before:lg:h-[160px] z-[-1] absolute top-1/4 left-0" />
        <h1 className="text-md w-full">Log In with:</h1>
        <section className="flex justify-center flex-col w-full">
          <DiscordButton />
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

import { Skeleton } from "@nextui-org/react";

export default function SkeletonLogIn() {
  return (
    <section className=" flex place-content-center place-items-center h-[calc(100vh-8rem)] ">
      <article className="relative xl:w-1/3 sm:w-2/3  w-full flex flex-col place-content-center place-items-center sm:h-[700px] h-auto rounded-2xl border border-gray-400 gap-6 sm:p-16 p-8 bg-transparent">
        <div className="absolute z-[-1] -left-1/2 top-0 w-[50%] h-[50%] rounded-full blue__gradient" />
        <div className="absolute z-[-1] bottom-1/4  -right-1/3 purple__gradient w-[40%] h-[30%]" />
        <Skeleton>
          <h1 className="text-md w-10 h-3">Log In with:</h1>
        </Skeleton>
        <section className="flex justify-center flex-col w-full">
          <Skeleton>
            <div className="text-white  bg-[#7289DA] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center me-2 mb-2 justify-center"></div>
          </Skeleton>
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

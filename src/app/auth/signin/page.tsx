import { EmailSignInTemplate } from "@/app/components/loginComponents/EmailSingInTemplate";

export default function SignInPage() {
  return (
    <section className=" flex place-content-center place-items-center h-[calc(100vh-8rem)] ">
      <article className=" relative xl:w-1/3 sm:w-2/3  w-full flex flex-col place-content-center place-items-center sm:h-[700px] h-svh rounded-2xl border border-gray-400 gap-6 sm:p-16 p-8">
        <div className="absolute z-[-1] left-3/4 top-0 w-[39%] h-[42%] rounded-full blue__gradient" />
        <div className="absolute z-[-1] bottom-1/4 left-0   w-[40%] h-[30%] purple__gradient" />
        <h1 className="text-3xl font-semibold mb-4 ">Sign In with Email </h1>
        <EmailSignInTemplate />
      </article>
    </section>
  );
}

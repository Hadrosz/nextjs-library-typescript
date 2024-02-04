import { EmailSignInTemplate } from "@/app/components/loginComponents/EmailSingInTemplate";

export default function SignInPage() {
  return (
    <section className=" flex place-content-center place-items-center h-[calc(100vh-8rem)] ">
      <article className="xl:w-1/3 sm:w-2/3  w-full flex flex-col place-content-center place-items-center h-[600px] rounded-2xl border border-gray-400 gap-6 p-16">
        <h1 className="text-3xl font-semibold mb-4">Sign In with Email</h1>
        <EmailSignInTemplate />
      </article>
    </section>
  );
}

import { ThemeSwitcher } from "@/components/client-components/ThemeSwitcher";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default async function Home() {
  return (
    <BackgroundGradientAnimation>
      <section className="mx-auto max-w-screen-2xl px-6 py-8">
        <ThemeSwitcher />

        <article className="relative flex flex-col place-content-center place-items-center h-[calc(100vh-8rem)] text-balance	gap-16 ">
          <h1 className="lg:text-9xl md:text-7xl  text-6xl font-semibold text-center text-gradient">
            Empower Your Mind, One Step at a Time
          </h1>
          <h2 className="md:text-5xl text-2xl leading-tight  font-semi text-center text-balance">
            Get your next favorite adventure with just a click
          </h2>
        </article>
      </section>
    </BackgroundGradientAnimation>
  );
}

//<div className="absolute z-[-1] left-2/4 top-0 w-[39%] h-[42%] rounded-full blue__gradient" />
//<div className="absolute z-[-1] bottom-0 left-0   w-[40%] h-[30%] purple__gradient" />

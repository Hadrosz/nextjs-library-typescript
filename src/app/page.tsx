export default async function Home() {
  return (
    <section className="">
      <article className="relative flex flex-col place-content-center place-items-center h-[calc(100vh-8rem)] text-balance	gap-16 ">
        <div className="absolute z-[-1] left-2/4 top-0 w-[39%] h-[42%] rounded-full blue__gradient" />
        <div className="absolute z-[-1] bottom-0 left-0   w-[40%] h-[30%] purple__gradient" />
        <h1 className="text-9xl font-semibold text-center text-gradient">
          Empower Your Mind, One Step at a Time
        </h1>
        <h2 className="text-5xl  leading-tight  font-semi text-center text-balance">
          Get your next favorite adventure with just a click
        </h2>
      </article>
    </section>
  );
}

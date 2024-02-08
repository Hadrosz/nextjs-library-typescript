import ListCardBook from "@/components/cards/ListCardBook";
import { getBooks, getBooksBySerie, getSeries } from "@/libs/supabase/queries";

export default async function seriesPage() {
  const series = await getSeries();

  return (
    <section className="relative">
      <div className="absolute z-[-1] left-2/4 top-0 w-[39%] h-[42%] rounded-full blue__gradient" />
      <div className="absolute z-[-1] bottom-0 left-0   w-[40%] h-[30%] purple__gradient" />
      <h1 className="text-6xl mb-5  font-semibold">Series</h1>
      {series?.map(async (serie) => {
        const books = await getBooksBySerie(serie.id);

        return (
          <>
            <h2 className="text-4xl mb-5  font-semibold mt-12 text-yellow-400">
              {serie?.Name}
            </h2>
            <ul className="flex flex-row justify-start flex-wrap gap-3 items-stretch ">
              {books?.map((book) => {
                return <ListCardBook book={book} />;
              })}
            </ul>
          </>
        );
      })}
    </section>
  );
}

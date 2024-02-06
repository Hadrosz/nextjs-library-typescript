import ListCardBook from "@/app/components/ListCardBook";
import { Database } from "@/app/types/database";
import { createClient } from "@supabase/supabase-js";

export default async function booksPage() {
  const supabaseDB = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: books } = await supabaseDB
    .from("Books")
    .select(
      `*,link_book,
    Author ( * ),
    Genres ( * ),
    Series ( * )
    `
    )
    .order("dateWritten", { ascending: true });

  return (
    <section className="relative">
      <div className="absolute z-[-1] left-2/4 top-0 w-[39%] h-[42%] rounded-full blue__gradient" />
      <div className="absolute z-[-1] bottom-0 left-0   w-[40%] h-[30%] purple__gradient" />
      <h1 className="text-6xl mb-5  font-semibold">Books</h1>
      <ul className="flex flex-row justify-start flex-wrap gap-3 items-stretch ">
        {books?.map((book) => {
          return <ListCardBook book={book} />;
        })}
      </ul>
    </section>
  );
}

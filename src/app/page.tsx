import ListCardBook from "@/app/components/ListCardBook";
import CardBooks from "@/app/components/ListCardBook";
import { type Database } from "@/app/types/database";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
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

  console.log(typeof books);

  return (
    <section>
      <h1 className="text-3xl mb-2">Books</h1>
      <ul className="flex flex-row justify-center flex-wrap gap-3 items-stretch ">
        {books?.map((book) => {
          return <ListCardBook book={book} />;
        })}
      </ul>
    </section>
  );
}

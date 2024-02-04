import CardBooks from "@/app/components/CardBooks";
import { type Database } from "@/app/types/database";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: books } = await supabase
    .from("Books")
    .select(
      `*,
    Author ( * ),
    Genres ( * ),
    Series ( * )
    `
    )
    .order("dateWritten", { ascending: true });

  const data = await supabase.auth.getSession();
  console.log(data);

  return (
    <section>
      <pre>
        <ul className="flex flex-row justify-center flex-wrap gap-3 items-stretch ">
          {books?.map((book) => {
            return <CardBooks book={book} />;
          })}
        </ul>
      </pre>
    </section>
  );
}

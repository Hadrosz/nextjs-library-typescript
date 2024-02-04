import CardBooks from "@/app/components/CardBooks";
import { type Database } from "@/app/types/database";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createClient as cClient } from "@/app/utils/supabase/server";

export default async function Home() {
  const supabaseDB = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: books } = await supabaseDB
    .from("Books")
    .select(
      `*,
    Author ( * ),
    Genres ( * ),
    Series ( * )
    `
    )
    .order("dateWritten", { ascending: true });

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

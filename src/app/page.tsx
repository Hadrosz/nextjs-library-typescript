import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import CardBooks from "@/app/components/CardBooks";
import { type Database } from "@/app/types/database";

export default async function Home() {
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
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

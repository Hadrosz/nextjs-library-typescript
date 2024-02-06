import { createClient } from "@supabase/supabase-js";
import BookClientPage from "@/components/client-components/BookClientHome";

export default async function IndividualBookPage({ params }) {
  const supabaseDB = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: book } = await supabaseDB
    .from("Books")
    .select(
      `*,
    Author ( * ),
    Genres ( * ),
    Series ( * )
    `
    )
    .eq("id", `${params.bookId}`)
    .single();

  const { data: seriesBook } = await supabaseDB
    .from("Books")
    .select("*, Series( * ), Genres( * ), Author( * )")
    .eq("series", `${book.series}`)
    .order("dateWritten", { ascending: true });

  return <BookClientPage book={book} seriesBook={seriesBook} />;
}

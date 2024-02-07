import { createClient } from "@supabase/supabase-js";
import BookClientPage from "@/components/client-components/BookClientHome";
import { Database } from "@/libs/types/database";
import { getBooksBySerie } from "@/libs/supabase/queries";

export default async function IndividualBookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const { book, seriesBooks } = await getBooksBySerie(params.bookId);
  console.log(book);

  return <BookClientPage book={book} seriesBook={seriesBooks} />;
}

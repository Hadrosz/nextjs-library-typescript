import BookClientPage from "@/components/client-components/BookClientHome";
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

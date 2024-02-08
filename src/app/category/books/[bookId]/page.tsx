import BookClientPage from "@/components/client-components/BookClientHome";
import { getBooksBySerieWithBookId } from "@/libs/supabase/queries";

export default async function IndividualBookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const { book, seriesBooks } = await getBooksBySerieWithBookId(params.bookId);
  console.log(book);

  return <BookClientPage book={book} seriesBook={seriesBooks} />;
}

import BookClientPage from "@/components/client-components/BookClientHome";
import { getBooksBySerieWithBookId, getReviews } from "@/libs/supabase/queries";
import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";

export default async function IndividualBookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const { book, seriesBooks } = await getBooksBySerieWithBookId(params.bookId);
  const reviews = await getReviews(params.bookId);
  const length = reviews?.length;
  let avg;
  let sum = reviews?.reduce(
    (accumulator, reviews) => accumulator + reviews.Stars,
    0
  );

  if (length === undefined || sum === undefined) {
    avg = 0;
  } else {
    if (length == 0) {
      avg = -1;
    } else {
      avg = sum / length;
    }
  }

  return (
    <>
      <BookClientPage
        book={book}
        seriesBook={seriesBooks}
        stars={parseFloat(avg.toFixed(1))}
        reviews={reviews}
      />
    </>
  );
}

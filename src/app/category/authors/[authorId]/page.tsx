import AuthorClientPage from "@/components/client-components/AuthorClientHome";
import { getAuthor, getBooksByAuthor } from "@/libs/supabase/queries";

export default async function IndividualAuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const author = await getAuthor(params.authorId);
  const books = await getBooksByAuthor(params.authorId);

  return <AuthorClientPage AuthorBooks={books} author={author} />;
}

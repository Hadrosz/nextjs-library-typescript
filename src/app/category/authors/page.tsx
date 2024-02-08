import ListCardAuthor from "@/components/cards/ListCardAuthor";
import { getAuthors } from "@/libs/supabase/queries";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <section className="relative">
      <div className="absolute z-[-1] left-0 top-0 w-[39%] h-[42%] rounded-full blue__gradient" />
      <div className="absolute z-[-1] bottom-0 right-0   w-[40%] h-[30%] purple__gradient" />
      <h1 className="text-6xl mb-5  font-semibold">Authors</h1>
      <ul className="flex flex-row justify-start flex-wrap gap-3 items-stretch ">
        {authors?.map((author) => {
          return <ListCardAuthor author={author} />;
        })}
      </ul>
    </section>
  );
}

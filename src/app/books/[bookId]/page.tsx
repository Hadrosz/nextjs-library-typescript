import { type Database } from "@/app/types/database";
import { createClient } from "@supabase/supabase-js";
import { Chip } from "@nextui-org/react";
import { type UUID } from "crypto";
import CardBook from "@/app/components/CardBooks";
import { Details } from "@/app/types/type";
import CardAuthor from "@/app/components/CardAuthor";

export default async function IndividualBookPage({
  params,
}: {
  params: { bookId: UUID };
}) {
  const supabaseDB = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabaseDB
    .from("Books")
    .select(
      `*,
    Author ( * ),
    Genres ( * ),
    Series ( * )
    `
    )
    .eq("id", `${params.bookId}`);

  const book = data[0];

  const author = book?.Author[0];

  const details: Details = {
    show: false,
  };
  return (
    <section className="  h-[calc(100vh-8rem)] justify-center gap-10 flex place-items-center">
      <article className="place-content-center gap-5 grid grid-cols-2">
        <div className="flex gap-5 place-content-center place-items-center items-stretch ">
          <CardBook book={book} styles={details} />
          <CardAuthor author={author} />
        </div>
        <div>
          <h1 className="font-semibold text-5xl ">
            Book details: {book.title}
          </h1>
          <h2 className="font-semibold text-3xl mt-7 mb-3">Description</h2>
          <p className="text-lg text-pretty">{book.description}</p>
          <h2 className="font-semibold text-3xl mt-7 mb-3">Details</h2>
          <ul className="flex gap-3 flex-wrap mb-4">
            <li key={0}>
              <Chip
                size="lg"
                variant="shadow"
                color="warning"
              >{`# ${book?.pages} Pages`}</Chip>
            </li>
            {book?.series && (
              <li key={0}>
                <Chip
                  size="lg"
                  variant="shadow"
                  color="secondary"
                >{`${book.Series?.Name}`}</Chip>
              </li>
            )}
          </ul>
          <ul className="flex gap-3 flex-wrap">
            {book?.Genres?.map((genre) => {
              const colors = [
                "default",
                "primary",
                "secondary",
                "success",
                "warning",
                "danger",
              ];
              const valueColor = Math.floor(Math.random() * colors.length);
              const color = colors[valueColor];
              return (
                <li key={genre.id}>
                  <Chip variant="dot" size="lg" color={color}>
                    {genre.name}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </section>
  );
}

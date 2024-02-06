import { createClient } from "@supabase/supabase-js";
import { Chip } from "@nextui-org/react";
import CardBook from "@/app/components/CardBooks";
import { Details } from "@/app/types/type";
import CardAuthor from "@/app/components/CardAuthor";
import { Book } from "@/app/types/Book";
import ListCardBook from "@/app/components/ListCardBook";

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
  const author = book?.Author[0];

  const { data: seriesBook } = await supabaseDB
    .from("Books")
    .select("*, Series( * ), Genres( * ), Author( * )")
    .eq("series", `${book.series}`)
    .order("dateWritten", { ascending: true });

  console.log(seriesBook);

  const details = {
    show: false,
  };
  return (
    <section className=" h-auto justify-center gap-10 flex flex-col place-items-center mt-16">
      <article className="gap-5 lg:grid lg:grid-cols-2 items-start flex flex-col ">
        <div className="flex flex-col gap-5 justify-center items-center sm:items-stretch sm:flex sm:flex-row ">
          <CardBook book={book} styles={details} />
          <CardAuthor author={author} />
        </div>
        <div>
          <h1 className="font-semibold text-5xl ">
            Book details: {book?.title}
          </h1>
          <h2 className="font-semibold text-3xl mt-7 mb-3">Description</h2>
          <p className="text-lg text-pretty">{book?.description}</p>
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
      {book.Series && (
        <article className="w-full mb-14">
          <h2 className="font-semibold text-4xl">
            Look all books from {book.Series.Name}
          </h2>
          <ul className="flex flex-row flex-wrap gap-3 items-stretch mt-6">
            {seriesBook.map((serieBook) => {
              return <ListCardBook book={serieBook} />;
            })}
          </ul>
        </article>
      )}
    </section>
  );
}

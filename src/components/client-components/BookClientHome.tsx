"use client";
import CardAuthor from "@/components/cards/CardAuthor";
import CardBook from "@/components/cards/CardBooks";
import { Chip } from "@nextui-org/react";
import ListCardBook from "@/components/cards/ListCardBook";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Book, Review } from "@/libs/types/tables";
import BreadCrumbsPath from "./BreadCrumbsPath";
import ReviewsSection from "./ReviewsSection";
import { BackgroundGradient } from "../ui/background-gradient";

export default function BookClientPage({
  book,
  seriesBook,
  stars,
  reviews,
}: {
  book: Book;
  seriesBook: Book[] | null;
  stars: number;
  reviews: Review[] | null;
}) {
  const details = {
    show: false,
  };
  const author = book?.Author?.[0];
  const pathname = usePathname();
  const path = pathname.split("/");
  path.shift();

  return (
    <section className=" h-auto justify-center gap-10 flex flex-col place-items-center mt-8 ">
      <article className="w-full flex justify-end">
        <BreadCrumbsPath id={book?.id} name={book?.title} />
      </article>

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
                color="primary"
              >{`# ${book?.pages} Pages`}</Chip>
            </li>
            <li>
              {stars === -1 ? (
                ""
              ) : (
                <Chip
                  size="lg"
                  variant="shadow"
                  color="warning"
                >{`Stars ${stars}/5`}</Chip>
              )}
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
                  <Chip variant="dot" size="lg" color="secondary">
                    {genre.name}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
      <article className="w-max-4xl">
        {<ReviewsSection elementId={book?.id} reviews={reviews} />}
      </article>
      {book?.Series && (
        <article className="w-full mb-14">
          <h2 className="font-semibold text-4xl">
            Look all books from {book.Series.Name}
          </h2>
          <ul className="flex flex-row flex-wrap gap-3 items-stretch mt-6">
            {seriesBook?.map((serieBook) => {
              return <ListCardBook book={serieBook} />;
            })}
          </ul>
        </article>
      )}
    </section>
  );
}

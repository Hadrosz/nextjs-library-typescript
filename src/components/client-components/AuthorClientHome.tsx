"use client";
import { Author, Book } from "@/libs/types/tables";
import BreadCrumbsPath from "./BreadCrumbsPath";
import CardAuthor from "../cards/CardAuthor";
import ListCardBook from "../cards/ListCardBook";

export default function AuthorClientPage({
  author,
  AuthorBooks,
}: {
  author: Author;
  AuthorBooks: Book[] | null;
}) {
  return (
    <section className=" h-auto justify-center gap-10 flex flex-col place-items-center mt-8 ">
      <article className="w-full flex justify-end">
        <BreadCrumbsPath id={author?.id} name={author?.fullName} />
      </article>
      <article className="gap-5 lg:grid lg:grid-cols-2 items-start flex flex-col ">
        <div className="flex flex-col gap-5 justify-center items-center sm:items-stretch sm:flex sm:flex-row ">
          <CardAuthor author={author} />
        </div>
        <div>
          <h1 className="font-semibold text-5xl ">
            Author: {author?.fullName}
          </h1>
          <h2 className="font-semibold text-3xl mt-7 mb-3">Biography</h2>
          <p className="text-lg text-pretty">{author?.briography}</p>
        </div>
      </article>
      <article className="w-full mb-14">
        <h2 className="font-semibold text-4xl">Look all books</h2>
        <ul className="flex flex-row flex-wrap gap-3 items-stretch mt-6">
          {AuthorBooks?.map((book) => {
            return <ListCardBook book={book} />;
          })}
        </ul>
      </article>
    </section>
  );
}

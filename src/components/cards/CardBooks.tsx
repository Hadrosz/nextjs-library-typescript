"use client";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import TiltComponent from "react-parallax-tilt";
import { Book } from "@/libs/types/tables";
import Image from "next/image";
import { Details } from "@/libs/types/general";

export default function CardBook({
  book,
  styles = { show: true },
}: {
  book: Book | null;
  styles: Details;
}) {
  const author = book?.Author?.[0];

  return (
    <TiltComponent tiltMaxAngleX={3} tiltMaxAngleY={3} className=" max-w-72  ">
      <article className="flex flex-col shadow-2xl  backdrop-blur-3xl bg-black/70 shadow-gray-800 p-4 rounded-xl max-w-72 gap-4 border-gray-700 border  h-full ">
        <div>
          <h2 className="text-2xl text-zinc-200 truncate">{book?.title}</h2>
          <div className="flex ">
            <span className="text-xs text-zinc-400">
              {book?.Series ? `${book.Series.Name}` : "‎ "}
            </span>
          </div>
        </div>

        <Image
          alt={`${book?.title} image`}
          width={400}
          height={400}
          src={`${book?.image_url}`}
          className="rounded-lg h-[400px] object-cover"
        />
        <div className="flex justify-between">
          <div>
            <span className="text-lg block truncate">{author?.fullName}</span>
            <span className="text-sm text-slate-400">{book?.dateWritten}</span>
          </div>
          <div>
            <span className="text-xl my-2 text-yellow-300">{book?.price}$</span>
          </div>
        </div>
        {styles.show && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Link
                href={`/category/books/${book?.id}`}
                className="text-md py-1 px-4 bg-purple-500 rounded-lg just"
              >
                Details
              </Link>
              <Link
                href={`${book?.link_book}`}
                className="text-md py-1 px-4 border border-purple-500 rounded-lg"
              >
                Download
              </Link>
            </div>

            <ul className="flex gap-2 flex-wrap">
              {book?.Genres?.map((genre) => {
                return (
                  <li key={genre.id}>
                    <Chip color="primary" variant="dot">
                      {genre.name}
                    </Chip>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </article>
    </TiltComponent>
  );
}

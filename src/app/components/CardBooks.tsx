"use client";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import TiltComponent from "react-parallax-tilt";
import { Book } from "@/app/types/Book";

export default function CardBooks({ book }: { book: Book }) {
  const colors = [
    "warning",
    "success",
    "danger",
    "primary",
    "secondary",
    "default",
  ];

  const AuthorData = book.Author[0];

  return (
    <TiltComponent tiltMaxAngleX={3} tiltMaxAngleY={3} className=" max-w-72">
      <article className="flex flex-col shadow-2xl shadow-gray-800 p-4 rounded-xl max-w-72 gap-4 border-gray-700 border backdrop-blur-sm h-full ">
        <div>
          <h2 className="text-2xl text-zinc-200 truncate">{book.title}</h2>
          <span className="text-xs text-zinc-400">
            {book.Series ? `${book.Series.Name}` : "‎ "}
          </span>
        </div>

        <img
          src={book.image_url}
          className="rounded-lg h-[400px] object-cover"
        />
        <div className="flex justify-between">
          <div>
            <span className="text-lg block">{AuthorData.fullName}</span>
            <span className="text-sm text-slate-400">{book.dateWritten}</span>
          </div>
          <div>
            <span className="text-xl my-2 text-yellow-300">{book.price}$</span>
          </div>
        </div>
        <div className="flex justify-between">
          <Link
            href="#"
            className="text-md py-1 px-4 bg-purple-500 rounded-lg just"
          >
            Details
          </Link>
          <button className="text-md py-1 px-4 border border-purple-500 rounded-lg">
            Download
          </button>
        </div>
        <ul className="flex gap-2 flex-wrap">
          {book.Genres?.map((genre) => {
            const valueColor = Math.floor(Math.random() * colors.length);
            const color = colors[valueColor];

            return (
              <li key={genre.id}>
                <Chip color="primary" variant="dot">
                  {genre.name}
                </Chip>
              </li>
            );
          })}
        </ul>
      </article>
    </TiltComponent>
  );
}

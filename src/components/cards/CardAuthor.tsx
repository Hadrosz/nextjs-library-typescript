"use client";
import Image from "next/image";
import TiltComponent from "react-parallax-tilt";
import { Author } from "@/libs/types/tables";
import { Button, Link } from "@nextui-org/react";
import { useState } from "react";

export default function CardAuthor({ author }: { author: Author | undefined }) {
  const [isLoading, setIsLoading] = useState(false);

  function calculateAge() {
    if (author?.deathDate) {
      const bornDate = new Date(author.bornDate);
      const deathDate = new Date(author.deathDate);
      const ageMil: number = deathDate.getTime() - bornDate.getTime();
      const age = Math.round(ageMil / (365.25 * 24 * 60 * 60 * 1000));
      return age;
    }
    if (author?.bornDate) {
      const bornDate = new Date(author.bornDate);
      const nowDate = new Date();
      const ageMil: number = nowDate.getTime() - bornDate.getTime();
      const age = Math.round(ageMil / (365.25 * 24 * 60 * 60 * 1000));
      return age;
    }
  }

  return (
    <TiltComponent tiltMaxAngleX={3} tiltMaxAngleY={3} className=" max-w-72">
      <article className="flex flex-col shadow-2xl shadow-gray-800 p-4 rounded-xl max-w-72 gap-4 border-gray-700 border  h-full ">
        <div>
          <h2 className="text-2xl text-zinc-200 truncate">
            {author?.fullName}
          </h2>

          <div className="flex justify-between">
            <span className="text-xs text-zinc-400 ">{author?.bornDate}</span>
            {
              <span className="text-xs text-zinc-400 ">
                {author?.deathDate ? author?.deathDate : "Alive"}
              </span>
            }{" "}
          </div>
        </div>

        <Image
          alt={`${author?.fullName}`}
          width={400}
          height={400}
          src={`${author?.picture_url}`}
          className="rounded-lg h-[400px] object-cover"
        />
        <div className="flex justify-between">
          <div className="flex flex-col"></div>
          <div>
            <span className="text-xl my-2 text-yellow-300">
              {`${calculateAge()} Years Old`}
            </span>
          </div>
        </div>

        <Button
          href={`/category/authors/${author?.id}`}
          as={Link}
          color="secondary"
          className="w-full"
          isLoading={isLoading}
          onClick={() => setIsLoading(true)}
        >
          Details
        </Button>
      </article>
    </TiltComponent>
  );
}

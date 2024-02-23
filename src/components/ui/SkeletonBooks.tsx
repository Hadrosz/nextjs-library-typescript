import React from "react";
import { Card, Chip, Skeleton } from "@nextui-org/react";

export default function SkeletonBooks() {
  return (
    <section className="relative">
      <div className="absolute z-[-1] left-2/4 top-0 w-[39%] h-[42%] rounded-full blue__gradient" />
      <div className="absolute z-[-1] bottom-0 left-0   w-[40%] h-[30%] purple__gradient" />
      <h1 className="text-6xl mb-5  font-semibold">Books</h1>
      <ul className="flex flex-row justify-start flex-wrap gap-3 items-stretch ">
        <SkeletonCardBooks />
        <SkeletonCardBooks />
        <SkeletonCardBooks />
        <SkeletonCardBooks />
        <SkeletonCardBooks />
        <SkeletonCardBooks />
        <SkeletonCardBooks />
        <SkeletonCardBooks />
      </ul>
    </section>
  );
}

export function SkeletonCardBooks() {
  return (
    <li>
      <article className="w-72  flex flex-col shadow-2xl  backdrop-blur-3xl bg-black/70 shadow-gray-800 p-4 rounded-xl gap-4 border-gray-700 border  h-full ">
        <Skeleton className="h-8 rounded-full">
          <div></div>
        </Skeleton>
        <Skeleton className="h-3 rounded-full w-1/3">
          <div></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="rounded-lg h-[400px] object-cover" />
        </Skeleton>
        <div className="flex justify-between">
          <div>
            <Skeleton className="rounded-xl h-6">
              <div className="w-36"></div>
            </Skeleton>
            <Skeleton className="rounded-xl h-4 mt-4">
              <div className="w-5"></div>
            </Skeleton>
          </div>

          <Skeleton className="rounded-xl h-6">
            <div className="w-16"></div>
          </Skeleton>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Skeleton className="rounded-lg">
              <div className="text-md py-1 px-4 bg-purple-500 rounded-lg just">
                Details
              </div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="text-md py-1 px-4 border border-purple-500 rounded-lg">
                Download
              </div>
            </Skeleton>
          </div>

          <ul className="flex gap-2 flex-wrap">
            <Skeleton className="rounded-2xl">
              <li>
                <Chip color="primary" variant="dot" className="w-28"></Chip>
              </li>
            </Skeleton>
            <Skeleton className="rounded-2xl">
              <li>
                <Chip color="primary" variant="dot" className="w-20"></Chip>
              </li>
            </Skeleton>
          </ul>
        </div>
      </article>
    </li>
  );
}

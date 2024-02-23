"use client";

import { Review } from "@/libs/types/tables";
import Image from "next/image";

export default function ReviewsSection({
  reviews,
}: {
  reviews: Review[] | null;
}) {
  return (
    <section className="mt-16">
      <h2 className="font-semibold text-3xl mt-7 mb-3">Reviews and Comments</h2>
      <article>
        {reviews?.length !== 0 ? (
          <ul>
            {reviews?.map((review) => {
              return (
                <li key={review.idBook}>
                  <div className="flex gap-8 items-center">
                    <Image
                      width={40}
                      height={40}
                      src={
                        review.users?.avatar_url ? review.users?.avatar_url : ""
                      }
                      alt={`user ${review.users?.username} picture`}
                    />
                    <span>{review.users?.full_name}</span>
                  </div>
                  <p>{review.Review}</p>
                  <span>Stars: {review.Stars}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col justify-center">
            <span className="font-semibold text-2xl mt-7 mb-3 block">
              No reviews yet, be the first one
            </span>
            <button>Add my comment</button>
          </div>
        )}
      </article>
    </section>
  );
}

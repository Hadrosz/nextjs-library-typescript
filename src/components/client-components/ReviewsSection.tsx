"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  user,
} from "@nextui-org/react";
import { Star } from "@/components/assets/Icons";
import { Review } from "@/libs/types/tables";
import FormComment from "./FormComment";
import { useEffect, useState } from "react";
import getSession from "@/libs/actions/getSession";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReviewsSection({
  elementId,
  reviews,
}: {
  reviews: Review[] | null;
  elementId: String | undefined;
}) {
  const supabase = createClient();
  const router = useRouter();

  const handleEvent = async () => {
    const { data, error } = await supabase
      .from("bookReview")
      .delete()
      .eq("idUser", session?.id)
      .eq("idBook", elementId);
    router.refresh();
  };

  const [session, setSession] = useState<User>();
  useEffect(() => {
    const gettingSession = async () => {
      const user = await getSession();
      setSession(user?.user);
    };

    gettingSession();
  }, []);

  return (
    <>
      <h2 className="font-semibold text-3xl mt-7 mb-3 text-primary-900">
        Reviews and Comments
      </h2>
      <article className="w-full">
        {reviews?.length !== 0 ? (
          <ul className="flex flex-col gap-4 border-l-1 border-r-1 border-b-1 border-gray-600 ">
            {reviews?.map((review) => {
              return (
                <li key={review.idBook} className="border-b-1 border-gray-600">
                  <Card className="max-w-4xl bg-transparent">
                    <CardHeader className="flex justify-between">
                      <Link
                        href={`/users/${review.users?.id}`}
                        className="flex gap-3"
                      >
                        <Image
                          alt="nextui logo"
                          height={40}
                          radius="sm"
                          src={
                            review.users?.avatar_url
                              ? `${review.users?.avatar_url}`
                              : `https://unavatar.io/${review.users?.username}`
                          }
                          width={40}
                        />
                        <div className="flex flex-col">
                          <p className="text-md">{review.users?.full_name}</p>
                          <p className="text-small text-default-500">
                            {review.users?.username}
                          </p>
                        </div>
                      </Link>
                      <div className="flex gap-2">
                        <span>{review.Stars}</span>
                        <Star />
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p>{review.Review}</p>
                      {review.idUser === session?.id ? (
                        <Button
                          color="warning"
                          variant="bordered"
                          className="w-36 mt-5"
                          onClick={handleEvent}
                        >
                          Delete Comment
                        </Button>
                      ) : (
                        ""
                      )}
                    </CardBody>
                  </Card>
                </li>
              );
            })}
            <li className="p-4">
              <h3 className="text-xl mb-2 font-semibold text-secondary-600">
                Add your Review
              </h3>
              <FormComment bookId={elementId} />
            </li>
          </ul>
        ) : (
          <div className="w-full sm:w-[30rem] bg-transparent lg:w-[56rem] md:w-[40rem]">
            <span className="font-semibold text-2xl mt-7 mb-3 block">
              No reviews yet, be the first one
            </span>
            <FormComment bookId={elementId} />
          </div>
        )}
      </article>
    </>
  );
}

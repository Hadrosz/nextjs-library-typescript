"use client";
import getSession from "@/libs/actions/getSession";
import { createClient } from "@/libs/supabase/client";
import { InputsComments } from "@/libs/types/general";
import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

export default function FormComment({
  bookId,
}: {
  bookId: String | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsComments>();

  const onSubmit: SubmitHandler<InputsComments> = async (review) => {
    setIsLoading(true);
    const session = await getSession();
    const userId = session?.user.id;
    const { description, stars: starString } = review;

    const stars = parseInt(starString);
    const { data, error } = await supabase
      .from("bookReview")
      .insert({
        idBook: bookId,
        idUser: userId,
        Review: description,
        Stars: stars,
      })
      .select();

    setIsLoading(false);

    if (error) {
      toast(error.message);
    } else {
      router.refresh();
    }
  };

  const numbers = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 w-full">
      <Toaster />
      <Textarea
        {...register("description", {
          required: { value: true, message: "Review is required" },
        })}
        variant="bordered"
        label="Review"
        placeholder="Enter your review"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0 w-3/4 text-medium"
      />
      <div className="w-1/4 flex flex-col justify-between ">
        <Select
          size="sm"
          label="Select stars"
          className="max-w-xs bg-transparent"
          variant="bordered"
          {...register("stars")}
        >
          {numbers.map((number) => (
            <SelectItem key={number.value} value={number.value}>
              {number.label}
            </SelectItem>
          ))}
        </Select>
        <Button isLoading={isLoading} type="submit" color="secondary">
          Submit
        </Button>
      </div>
    </form>
  );
}

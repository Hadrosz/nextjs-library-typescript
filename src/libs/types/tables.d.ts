import { type Database, Tables } from "@/libs/types/database";

export type Book =
  | (Tables<"Books"> & {
      Author?: Tables<"Author">[];
      Genres: Tables<"Genres">[];
      Series: Tables<"Series"> | null;
    })
  | null;

export type Author = Tables<"Author">;

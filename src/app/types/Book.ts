import { type Database, Tables } from "@/app/types/database";

export type Book = Tables<"Books"> & {
  Author: Tables<"Author">[];
  Genres: Tables<"Genres">[];
  Series: Tables<"Series"> | null;
};

import { type Database } from "@/app/types/database";

type BookEntity = Database["public"]["Tables"]["Books"]["Row"];
type AuthorEntity = Database["public"]["Tables"]["Author"]["Row"];
type GenreEntity = Database["public"]["Tables"]["Genres"]["Row"];
type SeriesEntity = Database["public"]["Tables"]["Series"]["Row"];

export type Book = BookEntity & {
  Author: AuthorEntity[];
  Genres: GenreEntity[];
  Series: SeriesEntity | null;
};

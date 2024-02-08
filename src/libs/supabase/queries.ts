import { Database } from "@/libs/types/database";
import CreateClient from "@/libs/supabase/fetch";

const supabase = CreateClient();

export const getBooks = async () => {
  const { data: books } = await supabase
    .from("Books")
    .select(
      `*,
  Author ( * ),
  Genres ( * ),
  Series ( * )
  `
    )
    .order("dateWritten", { ascending: true });
  return books;
};

export const getBooksBySerie = async (serie_id: string) => {
  const { data: book } = await supabase
    .from("Books")
    .select(
      `*,
  Author ( * ),
  Genres ( * ),
  Series ( * )
  `
    )
    .eq("id", `${serie_id}`)
    .single();

  const { data: seriesBooks } = await supabase
    .from("Books")
    .select("*, Series( * ), Genres( * ), Author( * )")
    .eq("series", `${book?.series}`)
    .order("dateWritten", { ascending: true });
  return { book, seriesBooks };
};

export const getAuthors = async () => {
  const { data: authors } = await supabase.from("Author").select("*");
  return authors;
};

export const getAuthor = async (authorId: string) => {
  const { data: author } = await supabase
    .from("Author")
    .select("*, nationality ( * )")
    .eq("id", authorId)
    .single();
  return author;
};

export const getBooksByAuthor = async (authorId: string) => {
  const { data: libros } = await supabase
    .from("Books")
    .select(
      `*,
    Author!inner ( * ),
    Genres ( * ),
    Series ( * )
    `
    )
    .eq("Author.id", authorId);

  return libros;
};

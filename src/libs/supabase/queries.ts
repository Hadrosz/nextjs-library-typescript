import CreateClient from "@/libs/supabase/fetch";
import { UUID } from "crypto";

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

export const getSeries = async () => {
  const { data: series } = await supabase.from("Series").select(`*`);
  return series;
};

export const getBooksBySerieWithBookId = async (bookId: string) => {
  const supabase = CreateClient();

  const { data: book } = await supabase
    .from("Books")
    .select(
      `*,
  Author ( * ),
  Genres ( * ),
  Series ( * )
  `
    )
    .eq("id", `${bookId}`)
    .single();

  const { data: seriesBooks } = await supabase
    .from("Books")
    .select("*, Series( * ), Genres( * ), Author( * )")
    .eq("series", `${book?.series}`)
    .order("dateWritten", { ascending: true });
  return { book, seriesBooks };
};

export const getBooksBySerie = async (serieId: UUID) => {
  const { data: book } = await supabase
    .from("Books")
    .select(
      `*,
    Author( * ),
    Genres ( * ),
    Series!inner ( * )
    `
    )
    .eq("Series.id", serieId);

  return book;
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

export const getReviews = async (bookId: string) => {
  const { data: reviews } = await supabase
    .from("bookReview")
    .select(`*, Books!inner( * ), users( * )`)
    .eq("idBook", bookId);

  return reviews;
};

import { Book } from "@/app/types/Book";
import CardBook from "./CardBooks";

export default function ListCardBook({ book }: { book: Book }) {
  return <CardBook book={book} styles={{ show: true }} />;
}

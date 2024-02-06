import { Book } from "@/libs/types/tables";
import CardBook from "./CardBooks";

export default function ListCardBook({ book }: { book: Book }) {
  return <CardBook book={book} styles={{ show: true }} />;
}

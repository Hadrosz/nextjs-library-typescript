import { Author } from "@/libs/types/tables";
import CardAuthor from "@/components/cards/CardAuthor";

export default function ListCardAuthor({ author }: { author: Author }) {
  return <CardAuthor author={author} />;
}

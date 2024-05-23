"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbsPath({
  id,
  name,
}: {
  id: number | string | undefined;
  name: string | undefined;
}) {
  const pathname = usePathname();
  const path = pathname.split("/");
  path.shift();
  let newPath: string = "";
  return (
    <Breadcrumbs size="lg">
      {path.map((pathElement, i) => {
        newPath = newPath + "/" + path[i];
        if (pathElement == id?.toString()) {
          return <BreadcrumbItem>{name}</BreadcrumbItem>;
        }
        return (
          <BreadcrumbItem className="capitalize">
            <Link href={newPath}>{pathElement}</Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}

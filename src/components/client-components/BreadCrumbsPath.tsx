"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
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

  return (
    <Breadcrumbs size="lg">
      {path.map((pathElement) => {
        if (pathElement == id?.toString()) {
          return <BreadcrumbItem>{name}</BreadcrumbItem>;
        }
        return (
          <BreadcrumbItem className="capitalize">{pathElement}</BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}

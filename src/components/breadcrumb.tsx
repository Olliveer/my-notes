import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

type Props = {
  breadcrumb: {
    title: string;
    href: string;
  }[];
};

export function BreadcrumbComponent({ breadcrumb }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, index) => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumb.length - 1 && (
              <BreadcrumbSeparator key={index + "separator"} />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

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
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

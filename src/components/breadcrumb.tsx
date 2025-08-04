"use client";

import React, { Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TBreadCrumbProps = {
  homeElement?: string;
  capitalizeLinks?: boolean;
  customLabels?: Record<string, string>;
};

const NextBreadcrumb = ({
  homeElement = "Home",
  capitalizeLinks = true,
  customLabels = {},
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{homeElement}</BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.length > 0 && <BreadcrumbSeparator />}

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = pathNames.length === index + 1;

          // Use custom label or format the link
          let itemLink = customLabels[href] || customLabels[link] || link;
          if (capitalizeLinks && !customLabels[href] && !customLabels[link]) {
            itemLink = link[0].toUpperCase() + link.slice(1);
          }

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NextBreadcrumb;

import * as React from "react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooksByUser } from "@/server/notebooks";
import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const data = await getNotebooksByUser();

  if (!data.notebooks) {
    return null;
  }

  const sidebarData = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      ...data.notebooks.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/notebook/${notebook.id}`,
        isActive: true,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
        })),
      })),
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={sidebarData.versions}
          defaultVersion={sidebarData.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  ShovelIcon,
  SparklesIcon,
} from "lucide-react";

const sidebarData = {
  header: "FrameDaily",
  navMain: [
    {
      label: "Inicio",
      href: "#",
      icon: HomeIcon,
    },
    {
      label: "Warframes",
      href: "#",
      icon: ShovelIcon,
    },
    {
      label: "Habilidades",
      href: "#",
      icon: SparklesIcon,
    },
  ],
};

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold tracking-wide mb-3 px-3 pt-3">
            {sidebarData.header}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navMain.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className="gap-3 px-4 transition-all duration-100"
                    >
                      <item.icon />
                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

AppSidebar.Trigger = SidebarTrigger;

export default AppSidebar;

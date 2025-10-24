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
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {sidebarData.header}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navMain.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="w-5 h-5 text-(--color-primary) opacity-80" />
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

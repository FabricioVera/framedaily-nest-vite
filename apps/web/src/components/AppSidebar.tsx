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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  ShovelIcon,
  SparklesIcon,
} from "lucide-react";
import {
  motion,
  type Variants,
} from "framer-motion";

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

const listVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { staggerChildren: 0 },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.5,
      when: "beforeChildren",
    },
  },
};
const itemVariants: Variants = {
  closed: { opacity: 0, x: 25, y: -10 },
  open: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar className="z-20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold tracking-wide mb-3 px-3 pt-3">
            {sidebarData.header}
            <SidebarTrigger className="mx-2" />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <motion.ul
                initial="hidden"
                animate={open ? "open" : "closed"}
                variants={listVariants}
              >
                {sidebarData.navMain.map(
                  (item) => (
                    <motion.li
                      key={item.label}
                      variants={
                        itemVariants as any
                      }
                    >
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
                    </motion.li>
                  )
                )}
              </motion.ul>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

AppSidebar.Trigger = SidebarTrigger;

export default AppSidebar;

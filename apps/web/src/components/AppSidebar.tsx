import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  ShovelIcon,
  SparklesIcon,
  X,
} from "lucide-react";
import {
  motion,
  type Variants,
} from "framer-motion";
import { Link } from "react-router-dom";

const sidebarData = {
  header: "FrameDaily",
  navMain: [
    {
      label: "Inicio",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "Warframes",
      href: "/guess-the-warframe",
      icon: ShovelIcon,
    },
    {
      label: "Habilidades",
      href: "/guess-abilities-by-picture/",
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
      staggerChildren: 0.25,
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
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
const headerVariants: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.5 },
  }, // Un pequeño delay para que aparezca después de iniciar la barra
};

function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar
      className={`z-20 h-fit w-fit ${
        open ? "sidebar-animation" : ""
      } `}
      variant="floating"
    >
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={headerVariants}
      >
        <SidebarGroupLabel className="text-lg font-bold tracking-wide mx-2 pt-3 ">
          {sidebarData.header}
          <SidebarTrigger
            className="ml-4 opacity-50 hover:bg-sidebar-accent hover:text-white"
            icon={X}
          />
        </SidebarGroupLabel>
      </motion.div>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
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
                      <SidebarMenuButton
                        size="lg"
                        asChild
                      >
                        <Link
                          to={item.href}
                          className="gap-3 px-4"
                        >
                          <item.icon />
                          <span>
                            {item.label}
                          </span>
                        </Link>
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

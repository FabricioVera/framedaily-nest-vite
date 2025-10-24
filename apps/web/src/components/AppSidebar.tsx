import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup } from "./ui/sidebar";

function AppSidebar() {
    return (
        <Sidebar className="shadow-lg">
            <SidebarHeader>
                <h1 className="font-bold">FrameDaily</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup title="Navegación">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Inicio</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Warframes</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Habilidades</a>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default AppSidebar;
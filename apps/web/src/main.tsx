import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 z-50">
            <AppSidebar.Trigger />
          </div>
          <App />
        </div>
      </div>
    </SidebarProvider>
  </StrictMode>
);

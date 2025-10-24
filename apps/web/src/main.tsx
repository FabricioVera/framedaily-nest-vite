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
    <SidebarProvider defaultOpen={false}>
      <div className="relative min-h-screen">
        <AppSidebar />
        <div className="absolute top-4 left-4 z-10">
          <AppSidebar.Trigger />
        </div>
        <div className="relative z-0 flex-1">
          <App />
        </div>
      </div>
    </SidebarProvider>
  </StrictMode>
);

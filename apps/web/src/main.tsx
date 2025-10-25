import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { BrowserRouter } from "react-router-dom";
import App from "./Routes";

function RootContent() {
  const { open } = useSidebar();

  return (
    <div className="relative min-h-screen">
      <AppSidebar />
      <div
        className={`absolute top-4 left-4 z-10 ${
          open ? "hidden" : ""
        }`}
      >
        <AppSidebar.Trigger />
      </div>
      <div className="relative z-0 flex-1">
        <App />
      </div>
    </div>
  );
}

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider defaultOpen={false}>
        <RootContent />
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);

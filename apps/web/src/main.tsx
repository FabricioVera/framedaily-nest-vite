import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SidebarProvider, SidebarTrigger} from './components/ui/sidebar'
import App from './App.tsx'
import AppSidebar from './components/AppSidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarTrigger className='fixed text-teal-100 bg-amber-400'/>
      <App />
    </SidebarProvider>
  </StrictMode>,
)

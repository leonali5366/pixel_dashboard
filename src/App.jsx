import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Header from "./components/Header/Header";
import { BreadcrumbM } from "./components/Header/Breadcrumb";
import WebDevelopment from "./pages/WebDevelopment";

const App = () => {
  return (
    <div className="inline-flex w-full">
      <SidebarProvider
        style={{
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <AppSidebar />
        <div className="w-full flex flex-col h-full relative">
          <div className="inline-flex min-h-[4rem] w-full items-center px-5 sticky top-0 bg-white z-[999]">
            <SidebarTrigger />
            <div className="ml-3 pl-3 border-l">
              <BreadcrumbM />
            </div>
            {/* <Header /> */}
          </div>
          <div className="w-full bg-[#F5F6FA] h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/webdevelopment" element={<WebDevelopment />} />
            </Routes>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default App;

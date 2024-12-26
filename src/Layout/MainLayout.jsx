/* eslint-disable no-unused-vars */
import AppSidebar from "@/components/AppSidebar";
import { BreadcrumbM } from "@/components/Header/Breadcrumb";
import Header from "@/components/Header/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthContext } from "@/Context/UserContext";
import Login from "@/pages/Auth/Login/Login";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div>
          {user?.email ? (
            <div className="inline-flex w-full">
              <SidebarProvider
                style={{
                  "--sidebar-width": "20rem",
                  "--sidebar-width-mobile": "20rem",
                }}
              >
                <AppSidebar />
                <div className="w-full flex flex-col h-full relative">
                  <div className="inline-flex min-h-[4rem] w-full items-center px-5 sticky top-0 bg-white z-[999] border-b">
                    <SidebarTrigger />
                    <Header />
                  </div>
                  <div className="w-full bg-[#F5F6FA] h-full">
                    <Outlet />
                  </div>
                </div>
              </SidebarProvider>
            </div>
          ) : (
            <div>
              <Login />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainLayout;

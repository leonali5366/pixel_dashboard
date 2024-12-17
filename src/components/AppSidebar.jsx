import { PiUsersThree } from "react-icons/pi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import {
  Box,
  ChevronDown,
  Headset,
  PanelsTopLeft,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/Context/UserContext";

export default function AppSidebar() {
  const { user } = useContext(AuthContext);
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-[4rem] px-5 flex justify-center">
        <h1 className="text-2xl text-black font-semibold">PixelWebMakers</h1>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu className="space-y-2">
          <Link to="/">
            <SidebarMenuItem>
              <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                <div className="w-full inline-flex items-center gap-x-3">
                  <PanelsTopLeft size={24} strokeWidth={1.5} />
                  Overview
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          {/* orders */}

          <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                  <div className="w-full inline-flex items-center gap-x-3">
                    <ShoppingCart size={24} strokeWidth={1.5} />
                    Orders
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {/* Orders option for admin */}
              <CollapsibleContent
                className={`${user?.role === "admin" ? "" : "hidden"}`}
              >
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <Link to={"/development"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        Development
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link to={"/seo"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-pink-500"></div>
                        SEO
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link to={"/ppc"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-orange-500"></div>
                        PPC
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link to={"/hosting"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-purple-500"></div>
                        Hosting
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>

              {/* Orders option for client */}
              <CollapsibleContent
                className={`${user?.role === "client" ? "" : "hidden"}`}
              >
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <Link to={"order/client/myOrder"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        My Orders
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link to={"/order/custom"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-red-500"></div>
                        Create Custom order
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* packages */}

          <Collapsible
            className={`${
              user?.role === "admin" ? " group/collapsible" : "hidden"
            }`}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                  <div className="w-full inline-flex items-center gap-x-3">
                    <Box size={24} strokeWidth={1.5} />
                    Packages
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-blue-500"></div>
                      Package List
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-red-500"></div>
                      Add New Packages
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* users */}

          <Collapsible
            className={`${
              user?.role === "admin" ? " group/collapsible" : "hidden"
            }`}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                  <div className="w-full inline-flex items-center gap-x-3">
                    <PiUsersThree size={24} strokeWidth={1.5} />
                    Users
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-blue-500"></div>
                      All User
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-red-500"></div>
                      Add New User
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* support */}

          <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                  <div className="w-full inline-flex items-center gap-x-3">
                    <Headset size={24} strokeWidth={1.5} />
                    Support
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-green-500"></div>
                      Solved
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-red-500"></div>
                      Active Issues
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

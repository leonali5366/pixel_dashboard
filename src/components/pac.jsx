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
import { UserPlus } from "lucide-react";

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
                    <Link to={"/new"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-green-500"></div>
                        New Orders
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    {/* Development */}

                    <Collapsible
                      className={`${
                        user?.role === "admin" ? "group/collapsible" : "hidden"
                      }`}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                            <div className="w-full inline-flex items-center gap-x-3">
                              <ShoppingCart size={24} strokeWidth={1.5} />
                              Development
                            </div>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {/* Orders option for admin */}
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {/* MERN */}
                            <SidebarMenuSubItem>
                              <Link to={"/development/mern"}>
                                <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                                  <div className="size-2 rounded-full bg-blue-500"></div>
                                  MERN
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>

                            {/* Wordpress */}
                            <SidebarMenuSubItem>
                              <Link to={"/development/wordpress"}>
                                <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                                  <div className="size-2 rounded-full bg-green-500"></div>
                                  Wordpress
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>

                            {/* Shopify */}
                            <SidebarMenuSubItem>
                              <Link to={"/development/shopify"}>
                                <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                                  <div className="size-2 rounded-full bg-green-500"></div>
                                  Shopify
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>

                            {/* Wix */}
                            <SidebarMenuSubItem>
                              <Link to={"/development/wix"}>
                                <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                                  <div className="size-2 rounded-full bg-green-500"></div>
                                  Wix
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
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
                    <Link to={"/order/client/new"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        New Orders
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <Link to={"/order/client/current"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        Current Orders
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <Link to={"/order/client/previous"}>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        Previous Orders
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

          {/* Staff */}

          <Collapsible
            className={`${
              user?.role === "admin" ? "group/collapsible" : "hidden"
            }`}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                  <div className="w-full inline-flex items-center gap-x-3">
                    <UserPlus size={24} strokeWidth={1.5} />
                    Staff
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <Link to={"/staff/all"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-green-500"></div>
                        Staff List
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                  <Link to={"/staff/add"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-red-500"></div>
                        Add New Staff
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* packages */}

          <Collapsible>
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
                  <Link to={"/package/public/all"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-green-500"></div>
                        Public Packages
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>

                  <Link
                    className={`${user?.role === "admin" ? "" : "hidden"}`}
                    to={"/package/custom/all"}
                  >
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-slate-700"></div>
                        Custom Packages
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>

                  <Link
                    className={`${user?.role === "admin" ? "" : "hidden"}`}
                    to={"/package/custom/allRequests"}
                  >
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        Custom Package Requests
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>

                  <Link
                    className={`${user?.role === "admin" ? "" : "hidden"}`}
                    to={"/package/create"}
                  >
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-red-500"></div>
                        Add New Packages
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>

                  <Link
                    className={`${user?.role === "client" ? "" : "hidden"}`}
                    to={"/package/myRequests"}
                  >
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-purple-600"></div>
                        My Custom Packages
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>

                  <Link
                    className={`${user?.role === "client" ? "" : "hidden"}`}
                    to={"/package/create/custom"}
                  >
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-red-500"></div>
                        Request Custom Packages
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
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
                    Clients
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <Link to={"/client/all"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        All Clients
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                  <Link to={"/client/add"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-red-500"></div>
                        Add New Client
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* support for admin*/}

          <Collapsible
            className={`${
              user?.role === "admin" ? " group/collapsible" : "hidden"
            }`}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium cursor-pointer">
                  <div className="w-full inline-flex items-center gap-x-3">
                    <Headset size={24} strokeWidth={1.5} />
                    Support
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <Link to={"/ticket/solved"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-green-500"></div>
                        Solved
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                  <Link to={"/ticket/all"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-red-500"></div>
                        Active Issues
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                  <Link to={"/ticket/create"}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        Open A Ticket
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* support for users */}
          <Collapsible className={`${user?.role === "client" ? "" : "hidden"}`}>
            <Link to={"/ticket/create/"}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium cursor-pointer">
                    <div className="w-full inline-flex items-center gap-x-3">
                      <Headset size={24} strokeWidth={1.5} />
                      Support
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Link>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

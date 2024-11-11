import { PiUsersThree } from "react-icons/pi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import {
  BadgeCheck,
  Bell,
  Box,
  ChevronDown,
  ChevronsUpDown,
  Headset,
  LogOut,
  MessageCircle,
  PanelsTopLeft,
  PanelTop,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-[4rem] px-5 flex justify-center">
        <h1 className="text-2xl text-black font-semibold">PixelWebMakers</h1>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
              <div className="w-full inline-flex items-center gap-x-3">
                <PanelsTopLeft size={24} strokeWidth={1.5} />
                Overview
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-blue-500"></div>
                      Web Development
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-red-500"></div>
                      Wordpress Development
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-green-500"></div>
                      Wix
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-yellow-500"></div>
                      Shopify
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-pink-500"></div>
                      SEO
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-orange-500"></div>
                      PPC
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-purple-500"></div>
                      Hosting
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          {/* packages */}
          <Collapsible className="group/collapsible">
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
          <Collapsible className="group/collapsible">
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
          {/* staff */}
          <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
                  <div className="w-full inline-flex items-center gap-x-3">
                    <Users size={24} strokeWidth={1.5} />
                    Staffs
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-blue-500"></div>
                      All Stuff
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-[16px] pl-3 py-5 font-medium">
                      <div className="size-2 rounded-full bg-red-500"></div>
                      Add New Stuff
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          {/* chat */}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
              <div className="w-full inline-flex items-center gap-x-3">
                <MessageCircle size={24} strokeWidth={1.5} />
                Chat
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
          {/* settings */}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[16px] transition-all duration-300 group-data-[state=open]/collapsible:bg-blue-500 py-6 group-data-[state=open]/collapsible:text-white font-medium">
              <div className="w-full inline-flex items-center gap-x-3">
                <Settings size={24} strokeWidth={1.5} />
                Settings
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">Shuvo</span>
                    <span>m@example.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[20rem] z-[1000] mb-12"
              >
                <DropdownMenuLabel className="inline-flex gap-x-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">Shuvo</span>
                    <span className="font-normal">m@example.com</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PanelTop />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notification
                  <Badge variant="outline" className="ml-auto text-blue-500">
                    03
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

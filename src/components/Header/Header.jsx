import { Bell, Inbox, LogOut, Mail, Settings, Sun, User } from "lucide-react";
import { BreadcrumbM } from "./Breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = () => {
  return (
      <BreadcrumbM />
    // <div className="inline-flex w-full items-center justify-between ml-3 border-l pl-3">
    //   <div className="inline-flex items-center gap-x-5">
    //     <div className="inline-flex items-center justify-center bg-[#EBECEF] rounded-full size-10">
    //       <Sun size={24} />
    //     </div>
    //     <div className="inline-flex items-center justify-center bg-[#EBECEF] rounded-full size-10">
    //       <Mail size={20} />
    //     </div>

    //     <DropdownMenu>
    //       <DropdownMenuTrigger>
    //         <div className="inline-flex items-center justify-center bg-[#EBECEF] rounded-full size-10">
    //           <Bell size={20} />
    //         </div>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent className="w-[24rem] z-[1000] mr-10">
    //         <DropdownMenuLabel>
    //           <div className="inline-flex items-center justify-between w-full">
    //             <span className="text-xl">Notification</span>
    //             <span className="font-medium size-10 bg-[#EBECEF] rounded-full flex items-center justify-center text-lg">
    //               10
    //             </span>
    //           </div>
    //         </DropdownMenuLabel>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem>
    //           <div className="inline-flex items-center justify-between gap-x-3">
    //             <Avatar>
    //               <AvatarImage src="https://github.com/shadcn.png" />
    //               <AvatarFallback>CN</AvatarFallback>
    //             </Avatar>
    //             <div className="flex flex-col">
    //               <span className="font-semibold text-base">
    //                 Congratulation
    //               </span>
    //               <span className="line-clamp-1">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //                 Soluta totam eos magni deserunt architecto, consequatur
    //                 dignissimos placeat quaerat mollitia nostrum expedita hic
    //                 delectus molestiae, earum ipsum. Sint corporis repudiandae
    //                 odit.
    //               </span>
    //             </div>
    //           </div>
    //           <span className="text-nowrap">23 Mins ago</span>
    //         </DropdownMenuItem>
    //         <DropdownMenuItem>
    //           <div className="inline-flex items-center justify-between gap-x-3">
    //             <Avatar>
    //               <AvatarImage src="https://github.com/shadcn.png" />
    //               <AvatarFallback>CN</AvatarFallback>
    //             </Avatar>
    //             <div className="flex flex-col">
    //               <span className="font-semibold text-base">
    //                 Congratulation
    //               </span>
    //               <span className="line-clamp-1">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //                 Soluta totam eos magni deserunt architecto, consequatur
    //                 dignissimos placeat quaerat mollitia nostrum expedita hic
    //                 delectus molestiae, earum ipsum. Sint corporis repudiandae
    //                 odit.
    //               </span>
    //             </div>
    //           </div>
    //           <span className="text-nowrap">23 Mins ago</span>
    //         </DropdownMenuItem>
    //         <DropdownMenuItem>
    //           <div className="inline-flex items-center justify-between gap-x-3">
    //             <Avatar>
    //               <AvatarImage src="https://github.com/shadcn.png" />
    //               <AvatarFallback>CN</AvatarFallback>
    //             </Avatar>
    //             <div className="flex flex-col">
    //               <span className="font-semibold text-base">
    //                 Congratulation
    //               </span>
    //               <span className="line-clamp-1">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //                 Soluta totam eos magni deserunt architecto, consequatur
    //                 dignissimos placeat quaerat mollitia nostrum expedita hic
    //                 delectus molestiae, earum ipsum. Sint corporis repudiandae
    //                 odit.
    //               </span>
    //             </div>
    //           </div>
    //           <span className="text-nowrap">23 Mins ago</span>
    //         </DropdownMenuItem>
    //         <DropdownMenuItem>
    //           <div className="inline-flex items-center justify-between gap-x-3">
    //             <Avatar>
    //               <AvatarImage src="https://github.com/shadcn.png" />
    //               <AvatarFallback>CN</AvatarFallback>
    //             </Avatar>
    //             <div className="flex flex-col">
    //               <span className="font-semibold text-base">
    //                 Congratulation
    //               </span>
    //               <span className="line-clamp-1">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //                 Soluta totam eos magni deserunt architecto, consequatur
    //                 dignissimos placeat quaerat mollitia nostrum expedita hic
    //                 delectus molestiae, earum ipsum. Sint corporis repudiandae
    //                 odit.
    //               </span>
    //             </div>
    //           </div>
    //           <span className="text-nowrap">23 Mins ago</span>
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger>
    //         <Avatar>
    //           <AvatarImage src="https://github.com/shadcn.png" />
    //           <AvatarFallback>CN</AvatarFallback>
    //         </Avatar>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent className="w-[24rem] z-[1000] mr-10">
    //         <DropdownMenuLabel>
    //           <div className="inline-flex items-center justify-between w-full">
    //             <span className="text-xl">Shohanur Reja Shuvo</span>
    //             <span className="font-medium">Admin</span>
    //           </div>
    //         </DropdownMenuLabel>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem>
    //           <User />
    //           Profile
    //         </DropdownMenuItem>
    //         <DropdownMenuItem>
    //           <Inbox />
    //           Inbox
    //         </DropdownMenuItem>
    //         <DropdownMenuItem>
    //           <Settings />
    //           Settings
    //         </DropdownMenuItem>
    //         <DropdownMenuItem>
    //           <LogOut />
    //           Log Out
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>
    // </div>
  );
};

export default Header;

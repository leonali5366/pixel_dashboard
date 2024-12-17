import { Bell, Inbox, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/Context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("pxileClient");
    localStorage.removeItem("pxileToken");
    setUser(null);
    navigate("/auth/login");
  };
  return (
    <div className="inline-flex w-full items-center justify-between ml-3 border-l pl-3">
      {/* empty div for design */}
      <div></div>

      <div className="inline-flex items-center gap-x-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="inline-flex items-center justify-center bg-[#EBECEF] rounded-full size-10">
              <Bell size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[24rem] z-[1000] mr-10">
            <DropdownMenuLabel>
              <div className="inline-flex items-center justify-between w-full">
                <span className="text-xl">Notification</span>
                <span className="font-medium size-10 bg-[#EBECEF] rounded-full flex items-center justify-center text-lg">
                  10
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="inline-flex items-center justify-between gap-x-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-base">
                    Congratulation
                  </span>
                  <span className="line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta totam eos magni deserunt architecto, consequatur
                    dignissimos placeat quaerat mollitia nostrum expedita hic
                    delectus molestiae, earum ipsum. Sint corporis repudiandae
                    odit.
                  </span>
                </div>
              </div>
              <span className="text-nowrap">23 Mins ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="inline-flex items-center justify-between gap-x-3">
                <Avatar>
                  <AvatarImage
                    src={
                      user?.photo
                        ? user?.photo
                        : "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-base">
                    Congratulation
                  </span>
                  <span className="line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta totam eos magni deserunt architecto, consequatur
                    dignissimos placeat quaerat mollitia nostrum expedita hic
                    delectus molestiae, earum ipsum. Sint corporis repudiandae
                    odit.
                  </span>
                </div>
              </div>
              <span className="text-nowrap">23 Mins ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="inline-flex items-center justify-between gap-x-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-base">
                    Congratulation
                  </span>
                  <span className="line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta totam eos magni deserunt architecto, consequatur
                    dignissimos placeat quaerat mollitia nostrum expedita hic
                    delectus molestiae, earum ipsum. Sint corporis repudiandae
                    odit.
                  </span>
                </div>
              </div>
              <span className="text-nowrap">23 Mins ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="inline-flex items-center justify-between gap-x-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-base">
                    Congratulation
                  </span>
                  <span className="line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta totam eos magni deserunt architecto, consequatur
                    dignissimos placeat quaerat mollitia nostrum expedita hic
                    delectus molestiae, earum ipsum. Sint corporis repudiandae
                    odit.
                  </span>
                </div>
              </div>
              <span className="text-nowrap">23 Mins ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={
                  user?.photo ? user?.photo : "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[24rem] z-[1000] mr-10">
            <DropdownMenuLabel>
              <div className="inline-flex items-center justify-between w-full">
                <span className="text-xl">{user?.name}</span>
                <span className="font-medium">{user?.role}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Inbox />
              Inbox
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleLogout();
              }}
            >
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;

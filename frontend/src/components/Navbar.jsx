import { Link, useLocation } from "react-router";
import useAuthHook from "../hooks/useAuthHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { authUser } = useAuthHook();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["authUser"] });
    toast.success("Logged out successfully!")
  }
  });
  
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full space-x-2">
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span
                  className="text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r 
from-primary to-secondary tracking-wider"
                >
                  Streamify
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="text-base-content h-6 w-6 opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />
          {/* user icon */}
          <div className="avatar">
            <div className="w-10 h-11 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User avatar"
                rel="noreferrer"
              />
            </div>
          </div>
          {/* logout */}

          <button
            className="btn btn-ghost btn-circle "
            onClick={logoutMutation}
          >
            <LogOutIcon className="text-base-content h-6 w-6 opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

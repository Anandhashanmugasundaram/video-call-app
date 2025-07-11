import { Link, useLocation } from "react-router"
import useAuthHook from "../hooks/useAuthHook"
import { BellIcon, HomeIcon, ShipWheelIcon, User2Icon, UsersIcon } from "lucide-react"

const Sidebar = () => {
  const {authUser} = useAuthHook()
  const location = useLocation()
  const currentPath = location.pathname
  return (
   <aside className="w-64 border-r bg-base-200 border-base-300 lg:flex flex-col hidden h-screen sticky top-0">
    <div className="p-5 border-b border-base-300">
      <Link to="/" className="flex items-center gap-2.5">
      <ShipWheelIcon className="size-9 text-primary"/>
      <span className="text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r 
from-primary to-secondary tracking-wider">Streamify</span>
      </Link>
    </div>

<nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>

    {/* user profile */}

    <div className="p-5 border-t border-base-300 mt-auto ">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 rounded-full ">
            <img src={authUser?.profilePic}  alt="Profile pic" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{authUser.fullName}</p>
          <p className="text-xs text-success flex items-center gap-1">
            <span>Online</span>
          </p>

        </div>
      </div>
      </div> 
   </aside>
  )
}
export default Sidebar

import { Link } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logoutUser, authUser } = useAuthStore();

  const currentUser = authUser?.data?.user
    return (
    <nav >
      <div className="w-full px-5 sm:px-10 md:px-14 lg:px-20 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Yapster</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"/user/settings"} className={`btn btn-sm gap-2 transition-color`} >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={`/user/${currentUser?._id}/profile`} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logoutUser}>
                  <LogOut className="size-5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { BellIcon, UserIcon, LogOutIcon } from "lucide-react";

const pageTitles = {
  "/dashboard": { title: "Dashboard", sub: "Manage your family health" },
  "/members": { title: "Family Members", sub: "Manage all your members" },
  "/vitals": { title: "Vitals", sub: "Track health vitals" },
  "/reports": { title: "Reports", sub: "View all reports" },
};

export default function DashboardNavbar() {
  const { user, setToken } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const page = Object.entries(pageTitles).find(([path]) =>
    location.pathname.startsWith(path),
  );
  const { title, sub } = page ? page[1] : { title: "HealthMate", sub: "" };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-14 md:left-64 right-0 z-30 bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between gap-4">
      {/* Left — Dynamic Title */}
      <div>
        <h1 className="text-base font-bold text-gray-800">Dashboard</h1>
        <p className="text-xs text-gray-400 hidden sm:block">
          Manage your family health
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Bell */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
          <BellIcon className="size-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <UserIcon className="size-3.5 text-indigo-600" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user?.name || "User"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 border border-red-100 transition"
          title="Logout"
        >
          <LogOutIcon className="size-4" />
          <span className="text-sm font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}

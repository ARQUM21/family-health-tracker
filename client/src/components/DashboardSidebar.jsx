import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { HeartPulseIcon, LayoutDashboardIcon, UsersIcon, FileTextIcon, ActivityIcon, LogOutIcon } from "lucide-react";

const navItems = [
  { icon: LayoutDashboardIcon, label: "Dashboard", path: "/dashboard" },
  { icon: UsersIcon, label: "Members", path: "/members" },
  { icon: FileTextIcon, label: "Records", path: "/records" },
  { icon: ActivityIcon, label: "Vitals", path: "/vitals" },
];

export default function DashboardSidebar() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-14 md:w-64 bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start gap-2 md:px-5 py-5 border-b border-gray-100 h-16">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-md shrink-0">
            <HeartPulseIcon className="size-4 md:size-5 text-white" />
          </div>
          <span className="hidden md:block text-lg font-bold text-gray-800">
            Health<span className="text-indigo-600">Mate</span>
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-1 md:px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center md:justify-start gap-3 py-3 md:px-4 rounded-xl text-sm font-medium transition-all
                    ${
                    isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }`
            }
          >
            <item.icon className="size-5 shrink-0" />
            <span className="hidden md:block">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-1 md:px-3 pb-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center md:justify-start gap-3 py-3 md:px-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition w-full"
        >
          <LogOutIcon className="size-5 shrink-0" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}

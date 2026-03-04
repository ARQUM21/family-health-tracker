import { HeartPulseIcon, MenuIcon, XIcon, LayoutDashboardIcon, LogOutIcon} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { token, setToken } = useContext(AppContext);
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsOpen(false);
    navigate("/");
  };

  const handleScroll = (id) => {
    setIsOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Testimonials", id: "testimonials" },
  ];

  return (
    <>
      {/* MAIN NAV */}
      <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3 md:px-16 lg:px-24">
          
          {/* Logo */}
          <div
            onClick={() => handleScroll("home")}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-md">
              <HeartPulseIcon className="size-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">
              Health<span className="text-indigo-600">Mate</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded-full transition"
                >
                  <LayoutDashboardIcon className="size-4" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition shadow-sm"
                >
                  <LogOutIcon className="size-4" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-sm font-medium text-white transition shadow-md shadow-indigo-200"
              >
                Sign Up Free
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition active:scale-95"
          >
            <MenuIcon className="size-5 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER — Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* MOBILE DRAWER — Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700">
              <HeartPulseIcon className="size-4 text-white" />
            </div>
            <span className="font-bold text-gray-800">
              Health<span className="text-indigo-600">Mate</span>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition"
          >
            <XIcon className="size-5 text-gray-600" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="px-4 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="px-4 py-3 text-left rounded-xl text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition text-sm"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Drawer Bottom Buttons */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-6 border-t border-gray-100 flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-indigo-200 text-indigo-600 font-medium text-sm hover:bg-indigo-50 transition"
              >
                <LayoutDashboardIcon className="size-4" />
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition shadow-md"
              >
                <LogOutIcon className="size-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="flex items-center justify-center w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-200"
            >
              Sign Up Free
            </button>
          )}
        </div>
      </div>
    </>
  );
}

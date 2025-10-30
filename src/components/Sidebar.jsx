import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import {
  LayoutGrid,
  Ticket,
  Menu,
  ChevronLeft,
  PlusCircleIcon as Plus,
  User,
} from "lucide-react";

export default function Sidebar({ onCreateTicket, isCollapsed, onCollapse }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutGrid className="w-6 h-6" />,
    },
    {
      path: "/tickets",
      label: "Tickets",
      icon: <Ticket className="w-6 h-6" />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          bg-white border-r border-gray-200 shadow-sm`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => onCollapse(!isCollapsed)}
          className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-5 border-b border-gray-200"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-white">T</span>
          </div>
          <h1
            className={`font-bold text-xl transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Ticketi
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
              ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span
                className={`font-medium transition-opacity duration-300 ${
                  isCollapsed ? "opacity-0 hidden" : "opacity-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}

          {/* Create Ticket Button */}
          <button
            onClick={onCreateTicket}
            className={`w-full mt-6 inline-flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
          >
            <Plus className="w-6 h-6" />
            <span
              className={`font-medium transition-opacity duration-300 ${
                isCollapsed ? "opacity-0 hidden" : "opacity-100"
              }`}
            >
              Add Ticket
            </span>
          </button>
        </nav>

        {/* User Section */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200
        ${isCollapsed ? "px-2" : "px-4"}`}
        >
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div
              className={`transition-opacity duration-300 ${
                isCollapsed ? "opacity-0 hidden" : "opacity-100"
              }`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">
                  {user?.email.substring(0, 20) + "..."}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 cursor-pointer hover:text-red-700 mt-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

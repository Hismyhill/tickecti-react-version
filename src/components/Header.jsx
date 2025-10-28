import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSession, logoutAsync } from "../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isAuth = !!user;

  async function handleLogout() {
    try {
      await dispatch(logoutAsync()).unwrap();
      dispatch(clearSession());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="bg-white shadow-sm rounded-md mb-10 px-8 mt-4 w-full">
      <div className=" flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-6 py-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">T</span>
              </div>
              <h1
                className={`font-bold text-xl hidden md:block md:opacity-100"
                `}
              >
                Ticketi
              </h1>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <NavLink
            to="/dashboard"
            className="text-sm hover:text-gray-800 hover:text-xl"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tickets"
            className="text-sm hover:text-gray-800 hover:text-xl"
          >
            Tickets
          </NavLink>
          {!isAuth ? (
            <button
              onClick={() => navigate("/auth/signup")}
              className=" px-4 py-2 border-[1.5px] border-gray-900 rounded-md text-sm cursor-pointer hover:bg-gray-500 hover:border-gray-500 hover:text-white"
            >
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline text-sm">
              Logout
            </button>
          )}
        </nav>

        {/* mobile */}
        <div className="md:hidden">
          <details>
            <summary className="btn btn-outline">Menu</summary>
            <div className="mt-2 bg-white p-3 shadow card">
              <Link to="/dashboard" className="block py-2">
                Dashboard
              </Link>
              <Link to="/tickets" className="block py-2">
                Tickets
              </Link>
              {!isAuth ? (
                <Link to="/auth/login" className="block py-2">
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block py-2 text-left w-full"
                >
                  Logout
                </button>
              )}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export default Header;

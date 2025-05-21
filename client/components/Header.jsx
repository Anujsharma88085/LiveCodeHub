import React, { useState, useEffect } from "react";
import { useAuth } from "../src/context/AuthContext";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
];

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Close user panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#user-panel") &&
        !e.target.closest("#user-name-button")
      ) {
        setUserPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-indigo-700 dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-white dark:text-indigo-400"
            >
              MyApp
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex justify-center">
            <div className="flex gap-12">
              {navLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="text-white dark:text-indigo-200 hover:text-gray-300 font-semibold transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="text-white dark:text-indigo-200 hover:text-gray-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* User name or Login */}
            {user ? (
             <div className="relative">
             <img
               src={`http://localhost:3000/img/users/${user.photo}`}
               alt={user.name}
               className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover"
               onClick={() => setUserPanelOpen((prev) => !prev)}
               id="user-name-button"
             />
           </div>
           
            ) : (
              <a
                href="/login"
                className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800 text-white transition"
              >
                Login
              </a>
            )}

            {/* Mobile menu icon */}
            {!user && (
              <button
                className="md:hidden text-white hover:text-gray-300"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Toggle Mobile Menu"
              >
                ☰
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && !user && (
        <div className="md:hidden px-4 pb-4 bg-indigo-700 dark:bg-gray-900">
          <nav className="flex flex-col space-y-3">
            {navLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-white hover:text-gray-300 font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </a>
            ))}
          </nav>
        </div>
      )}
{userPanelOpen && user && (
  <div
    id="user-panel"
    className="absolute top-16 right-4 w-56 h-28 bg-slate-800 text-white shadow-lg rounded-lg z-50 flex flex-col justify-evenly px-4"
  >
    <p className="text-sm font-semibold">Hello, {user.name}</p>
    <a
      href="/profile"
      className="text-sm px-3 py-1 rounded hover:bg-red-700 transition text-left"
    >
      My Profile
    </a>
    <button
      onClick={logout}
      className="text-sm px-3 py-1 rounded hover:bg-red-700 transition text-left"
    >
      Logout
    </button>
  </div>
)}



    </header>
  );
};

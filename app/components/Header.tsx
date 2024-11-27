"use client";

import Link from "next/link";
import { UserIcon } from "@heroicons/react/outline";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center bg-blue-500 text-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold">
        <Link href="/">Library Management</Link>
      </h1>

      <div className="relative">
        <button
          onClick={toggleMenu}
          className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-200"
        >
          <UserIcon className="h-6 w-6" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
            <ul className="text-gray-700">
              <li>
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/profile" // Redirection vers la page profil
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

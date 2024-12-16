'use client';

import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg font-bold hover:text-gray-200">
          Accueil
        </Link>
        <Link href="/catalog" className="text-lg font-bold hover:text-gray-200">
          Catalogue
        </Link>
      </div>

      <div className="relative">
        <CgProfile className="h-8 w-8 cursor-pointer hover:text-gray-200" onClick={toggleMenu} />

        {isMenuOpen && (
          <div
            className="absolute right-0 top-10 bg-white text-gray-800 rounded shadow-lg w-48 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/auth/login" className="block p-2 hover:bg-gray-100 rounded">
              Login
            </Link>
            <Link href="/profil" className="block p-2 hover:bg-gray-100 rounded">
              Profil
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;

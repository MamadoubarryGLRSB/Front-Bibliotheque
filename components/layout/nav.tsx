'use client';

import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';
import { FiLogIn, FiUserPlus, FiUser, FiLogOut } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/lib/action/redux/hooks';
import { removeAuth } from '@/app/lib/action/redux/features/auth.slice';
import { deleteCookies } from '@/app/lib/action/sessionCookies/action';
import toast from 'react-hot-toast';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await dispatch(removeAuth());
    await deleteCookies();
    toast.success('Déconnexion réussie');
    router.push('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-lg font-bold hover:text-gray-200 transition duration-300">
          Accueil
        </Link>
        <Link href="/catalog" className="text-lg font-bold hover:text-gray-200 transition duration-300">
          Catalogue
        </Link>
      </div>

      <div className="relative">
        <CgProfile
          className="h-10 w-10 cursor-pointer hover:text-gray-200 transition-transform duration-300 transform hover:scale-110"
          onClick={toggleMenu}
        />

        {isMenuOpen && (
          <div
            className="absolute right-0 top-12 bg-white text-gray-800 rounded-lg shadow-lg w-56 p-4 z-50 mt-2 transition-all duration-300 transform origin-top scale-100"
            onClick={() => setIsMenuOpen(false)}
          >
            {!isAuth ? (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center p-3 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <FiLogIn className="mr-3 text-blue-600" />
                  <span className="font-medium text-gray-800">Login</span>
                </Link>

                <Link
                  href="/auth/register"
                  className="flex items-center p-3 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <FiUserPlus className="mr-3 text-purple-600" />
                  <span className="font-medium text-gray-800">Créer un compte</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profil"
                  className="flex items-center p-3 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <FiUser className="mr-3 text-green-600" />
                  <span className="font-medium text-gray-800">Profil</span>
                </Link>

                <div
                  onClick={handleLogout}
                  className="flex items-center p-3 hover:bg-gray-100 rounded-md transition duration-200 cursor-pointer"
                >
                  <FiLogOut className="mr-3 text-red-600" />
                  <span className="font-medium text-gray-800">Logout</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;

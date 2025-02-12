import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext.jsx';

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleMouseEnter = () => {
    setOpenDropdown(true);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* כפתור המבורגר לנייד */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-16 6h16"}
                />
              </svg>
            </button>
          </div>

          {/* תפריט ראשי */}
          <div className="hidden sm:flex flex-1 items-center justify-between">
            <h3 className="text-black bg-amber-200 rounded h-7 w-9 text-center">בס"ד</h3>

            <div className="flex space-x-4">
              <Link to="/Home" className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                🏠 בית
              </Link>
              <Link to="/PersonalArea" className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                🧍 איזור אישי
              </Link>

              {/* תפריט נפתח */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                  🍽️ מתכונים
                </button>

                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                    <Link to="/DairyDishes" className="block px-4 py-2 hover:bg-gray-100">
                      🥛 מאכלי חלב
                    </Link>
                    <Link to="/FurDishes" className="block px-4 py-2 hover:bg-gray-100">
                      🍽️ מאכלי פרווה
                    </Link>
                    <Link to="/MeatDishes" className="block px-4 py-2 hover:bg-gray-100">
                      🍖 מאכלי בשר
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/AllRecipes" className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                📝 כל המתכונים
              </Link>
            </div>
          </div>
        </div>

        {/* תפריט לנייד */}
        {isMobileMenuOpen && (
          <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
            <Link to="/Home" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
              🏠 בית
            </Link>
            <Link to="/PersonalArea" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
              🧍 איזור אישי
            </Link>

            {/* תפריט נפתח לנייד */}
            <div>
              <button
                onClick={toggleDropdown}
                className="w-full text-right px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
              >
                🍽️ מתכונים {openDropdown ? "▲" : "▼"}
              </button>
              {openDropdown && (
                <div className="ml-4 space-y-1">
                  <Link to="/DairyDishes" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
                    🥛 מאכלי חלב
                  </Link>
                  <Link to="/FurDishes" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
                    🍽️ מאכלי פרווה
                  </Link>
                  <Link to="/MeatDishes" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
                    🍖 מאכלי בשר
                  </Link>
                </div>
              )}
            </div>

            <Link to="/AllRecipes" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
              📝 כל המתכונים
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

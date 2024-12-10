import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu) => {
    setOpenMenu(menu);
  };

  const handleMouseLeave = (menu) => {
    // Delay before closing the menu to avoid premature closing
    setTimeout(() => {
      setOpenMenu((current) => (current === menu ? null : current));
    }, 200);
  };

  const handleMouseStay = () => {
    clearTimeout(); // Prevent menu from closing while hovering
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800" dir="rtl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
            {/* Main navigation */}
            <div className="hidden sm:flex space-x-4">
              {/* Home Link */}
              <Link
                to="/Home"
                className="rounded-md px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
              >
                בית
              </Link>

              {/* Dairy Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('dairy')}
                onMouseLeave={() => handleMouseLeave('dairy')}
              >
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium cursor-pointer">
                  מתכונים חלביים
                </span>
                {openMenu === 'dairy' && (
                  <ul
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md"
                    onMouseEnter={handleMouseStay}
                    onMouseLeave={() => handleMouseLeave('dairy')}
                  >
                    <li>
                      <Link
                        to="/DairyDesserts"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        קינוחים
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/DairyDishes"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        מנות
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Fur Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('fur')}
                onMouseLeave={() => handleMouseLeave('fur')}
              >
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium cursor-pointer">
                מתכונים פרווה
                </span>
                {openMenu === 'fur' && (
                  <ul
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md"
                    onMouseEnter={handleMouseStay}
                    onMouseLeave={() => handleMouseLeave('fur')}
                  >
                    <li>
                      <Link
                        to="/FurDishes"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        מנות
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/FurSoups"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        מרקים
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/FurDesserts"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        קינוחים
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Meat Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('meat')}
                onMouseLeave={() => handleMouseLeave('meat')}
              >
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium cursor-pointer">
                מתכונים בשריים
                </span>
                {openMenu === 'meat' && (
                  <ul
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md"
                    onMouseEnter={handleMouseStay}
                    onMouseLeave={() => handleMouseLeave('fur')}
                  >
                    <li>
                      <Link
                        to="/MeatDishes"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        מנות
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/MeatSoups"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        מרקים
                      </Link>
                    </li>
                
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

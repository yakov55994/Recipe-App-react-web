import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext.jsx';

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);  // Access the user and setUser functions from context
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu) => {
    setOpenMenu(menu);
  };

  const handleMouseLeave = (menu) => {
    setOpenMenu((current) => (current === menu ? null : current));
  };

  const handleMouseStay = () => {
    clearTimeout(); // Prevent menu from closing while hovering
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMoveToAuth = () => {
    if (user) {
      toast.error("את/ה כבר מחובר/ת");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleMoveToRegister = () => {
    if (user) {
      toast.error("את/ה כבר מחובר/ת");
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  const handleLogOut = () => {
    if (user) {
      setUser(null);  // Clear the user from context
      toast.success("התנתקת בהצלחה");
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800" dir="rtl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* כפתור המבורגר לנייד */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">פתח תפריט</span>
              {/* אייקון תפריט סגור */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* אייקון תפריט פתוח */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
  
          {/* תפריט ראשי */}
          <div className="hidden sm:flex flex-1 items-center justify-between">
            <h3 className="text-black bg-amber-200 rounded h-7 w-9">בס"ד</h3>
            <div className="space-x-4">
              <Link
                to="/Home"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🏠 בית
              </Link>
              <Link
                to="/PersonalArea"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🧍 איזור אישי
              </Link>
              <Link
                to="/DairyDishes"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍽️ מאכלי חלב
              </Link>
              <Link
                to="/FurDishes"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍽️ מאכלי פרווה
              </Link>
              <Link
                to="/MeatDishes"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍖 מאכלי בשר
              </Link>
              <Link
                to="/DairyDesserts"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍰 קינוחי חלב
              </Link>
              <Link
                to="/FurDesserts"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍰 קינוחי פרווה
              </Link>
              <Link
                to="/FurSoups"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍲 מרקים פרווה
              </Link>
              <Link
                to="/MeatSoups"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍲 מרקים בשריים
              </Link>
              <Link
                to="/AllRecipes"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                📝 כל המתכונים
              </Link>
              <Link
                to="/Recipes"
                className="rounded-md px-3 py-0.5 text-sm font-medium text-white"
              >
                🍽️ כל המתכונים
              </Link>
            </div>
          </div>
        </div>
  
        {/* תפריט לנייד */}
        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                to="/Home"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🏠 בית
              </Link>
              <Link
                to="/PersonalArea"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🧍 איזור אישי
              </Link>
              <Link
                to="/DairyDishes"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍽️ מאכלי חלב
              </Link>
              <Link
                to="/FurDishes"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍽️ מאכלי פרווה
              </Link>
              <Link
                to="/MeatDishes"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍖 מאכלי בשר
              </Link>
              <Link
                to="/DairyDesserts"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍰 קינוחי חלב
              </Link>
              <Link
                to="/FurDesserts"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍰 קינוחי פרווה
              </Link>
              <Link
                to="/FurSoups"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍲 מרקים פרווה
              </Link>
              <Link
                to="/MeatSoups"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍲 מרקים בשריים
              </Link>
              <Link
                to="/AllRecipes"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                📝 כל המתכונים
              </Link>
              <Link
                to="/Recipes"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                🍽️ כל המתכונים
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

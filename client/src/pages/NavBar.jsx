import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext.jsx";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Home, User, Briefcase, FileText, Heart } from "lucide-react";
// import { GiCookingPot } from "react-icons/gi";
import Search from "./Search/Search.jsx";
import NavBar from "../components/ui/navbar.jsx";
import { FaUtensils } from 'react-icons/fa';
import AuroraBackgroundDemo from "../components/ui/background/BackgroundView.jsx";

export default function NavBarDemo() {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  // עדכון isLoggedIn על פי ה-user
  const isLoggedIn = !!user; // אם יש משתמש, אז הוא מחובר

  // Add scroll event listener to handle navbar visibility on mobile
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled down
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navItems = [
    { name: "דף הבית", url: "/", icon: Home },
    { name: "כל המתכונים", url: "/AllRecipes", icon: Briefcase },
    // תמיד מציגים את קישור "יצירת מתכון"
    { name: "יצירת מתכון", url: "/CreateRecipe", icon: FaUtensils },
  ];

  const LogOut = () => {
    logout();
    toast.success("התנתקת בהצלחה!");
    setShowLogoutConfirmation(false);
    navigate("/login");
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout); 
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); 
    setDropdownTimeout(timeout);
  };

  const handleLinkClick = (url) => {
    if (url === "/CreateRecipe" && !isLoggedIn) {
      toast.error("כדי ליצור מתכון יש להיכנס לחשבון!");
      navigate("/login");
    } else {
      navigate(url);
    }
  
    // תמיד סוגר את התפריט לאחר לחיצה
    setIsDropdownOpen(false);
  };
  
  const userDropdown = (
    <div
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
      {user ? (
        <button className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100 rounded-md">
          <User className="size-5 " />
          <b className="text-cyan-900 font-medium"> שלום {user.firstName}</b>
        </button>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100 rounded-md"
        >
          <User className="size-5" /> התחברות
        </Link>
      )}

      {isDropdownOpen && user && (
        <div
          className="sm:absolute sm:mt-5 sm:ml-44 sm:w-41 sm:text-sm bg-white border border-gray-200 rounded-l-full shadow-lg lg:w-48"
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        >
          <Link
            to="/PersonalArea"
            className="block px-4 py-2 text-black hover:bg-gray-700 font-bold rounded-l-full w-45 hover:text-white lg:w-36"
            onClick={() => handleLinkClick("/PersonalArea")} 
          >
            <FileText className="inline size-5 mr-2 " /> איזור אישי
          </Link>
          <Link
            to="/productsIliked"
            className="block px-4 py-2 text-black hover:bg-gray-700 font-bold rounded-l-full w-50 hover:text-white lg:w-44"
            onClick={() => handleLinkClick("/productsIliked")} 
          >
            <Heart className="inline size-5 mr-2 " /> מתכונים שאהבתי
          </Link>

          <button
            onClick={() => setShowLogoutConfirmation(true)}
            className="block font-bold px-4 py-2 text-red-600 hover:bg-gray-700 hover:text-white rounded-l-full w-35 cursor-pointer"
          >
            <RiLogoutBoxRFill className="inline size-5 mr-2" /> התנתקות
          </button>
        </div>
      )}
    </div>
  );

  // Apply fixed position class to the navbar container
  const navbarClasses = `sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : ''}`;

  return (
    <>
      {/* <AuroraBackgroundDemo/> */}
      <div className={navbarClasses} ref={navbarRef}>
        <NavBar items={navItems} userDropdown={userDropdown} handleLinkClick={handleLinkClick} />
        <Search />
      </div>
      {showLogoutConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80 rtl">
            <h3 className="text-lg font-bold text-center">
              האם אתה בטוח שברצונך להתנתק?
            </h3>
            <div className="flex justify-center mt-4">
              <button
                onClick={LogOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
              >
                כן
              </button>
              <button
                onClick={() => setShowLogoutConfirmation(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md ml-4 mr-4 cursor-pointer"
              >
                לא
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
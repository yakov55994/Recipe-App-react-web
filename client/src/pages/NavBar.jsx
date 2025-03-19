import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext.jsx";
// import { RiLogoutBoxRFill } from "react-icons/ri";
import { Home, User, Briefcase, FileText, Heart } from "lucide-react";
// import { GiCookingPot } from "react-icons/gi";
import Search from "./Search/Search.jsx";
import NavBar from "../components/ui/navbar.jsx";
import { AlignHorizontalDistributeStart } from 'lucide-react'

export default function NavBarDemo() {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null); 
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // עדכון isLoggedIn על פי ה-user
  const isLoggedIn = !!user; // אם יש משתמש, אז הוא מחובר

  
  const navItems = [
    { name: "דף הבית", url: "/home", icon: Home },
    { name: "כל המתכונים", url: "/AllRecipes", icon: Briefcase },
    // תמיד מציגים את קישור "יצירת מתכון"
    { name: "יצירת מתכון", url: "/CreateRecipe", icon:AlignHorizontalDistributeStart },
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
      navigate("/login");  // אם המשתמש לא מחובר, מעביר אותו לדף התחברות
    } else if (url === "/CreateRecipe" && isLoggedIn) {
      navigate(url); // אם המשתמש מחובר, פשוט מעביר אותו לדף יצירת המתכון
    }
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
          <b className="text-cyan-800"> שלום {user.firstName}</b>
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
          className="absolute mt-2 w-56 text-center bg-white border border-gray-200 rounded-md shadow-lg"
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        >
          <Link
            to="/PersonalArea"
            className="block px-4 py-2 text-black hover:bg-gray-100 font-bold"
            onClick={() => handleLinkClick("/PersonalArea")} 
          >
            <FileText className="inline size-5 mr-2 " /> איזור אישי
          </Link>
          <Link
            to="/productsIliked"
            className="block px-4 py-2 text-black hover:bg-gray-100 font-bold"
            onClick={() => handleLinkClick("/productsIliked")} 
          >
            <Heart className="inline size-5 mr-2 " /> מתכונים שאהבתי
          </Link>

          <button
            onClick={() => setShowLogoutConfirmation(true)}
            className="block w-full font-bold px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            {/* <RiLogoutBoxRFill className="inline size-5 mr-2" /> התנתקות */}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <NavBar items={navItems} userDropdown={userDropdown} handleLinkClick={handleLinkClick} />
      <Search />
      {showLogoutConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" bg-white p-6 rounded-md shadow-lg w-80 rtl">
            <h3 className="text-lg font-bold text-center">
              האם אתה בטוח שברצונך להתנתק?
            </h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={LogOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                כן
              </button>
              <button
                onClick={() => setShowLogoutConfirmation(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
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

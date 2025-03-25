import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaCheese, FaDrumstickBite, FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import { cn } from "../../lib/utils.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "sonner";

export default function NavBar({ items, className, userDropdown }) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "דף הבית");
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(""); 
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollingDown(window.scrollY > lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleItemClick = async (item) => {
    if (item.url === "/CreateRecipe" && !user) {
      toast.error("בשביל ליצור מתכון צריך להיות מחובר ");
      await Promise.resolve();
      navigate("/login");
    }
    
    setActiveTab(item.name);
    setActiveCategory(""); 
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (category, link) => {
    setActiveCategory(category);
    setActiveTab(""); // זה השינוי העיקרי
    navigate(link);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div
        className={cn(
          "fixed w-[900px] top-0 left-1/2 -translate-x-1/2 z-50 sm:pt-6 transition-all duration-300 hidden md:block",
          scrollingDown && "-top-24",
          className
        )}
      >
        <div className="flex items-center gap-3 bg-black/10 border border-gray-800 backdrop-blur-lg py-1 px-2 rounded-full shadow-xl shadow-black/20 justify-center">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-3xl transition-colors text-gray-300 hover:text-white flex items-center justify-center gap-2",
                activeTab === item.name ? "bg-gray-800/50 text-black" : "hover:bg-gray-800/30 text-black"
              )}
            >
              <item.icon size={20} strokeWidth={1.5} />
              <span className="hidden md:inline">{item.name}</span>
              {activeTab === item.name && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full text-white bg-gray-800 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            {[{ label: "חלבי", icon: FaCheese, link: "/allDairy" },
              { label: "פרווה", icon: FaLeaf, link: "/allFur" },
              { label: "בשרי", icon: FaDrumstickBite, link: "/allMeat" }].map((item, index) => (
              <button
                key={index}
                className={cn(
                  "relative flex items-center justify-center gap-2 px-3 py-2 font-semibold rounded-full transition-all hover:bg-gray-800 text-white",
                  activeCategory === item.label
                    ? "bg-gray-800 text-white"
                    : "text-black hover:bg-gray-800 hover:text-white cursor-pointer"
                )}
                onClick={() => handleCategoryClick(item.label, item.link)}
              >
                <item.icon size={20} /> {item.label}
                {activeCategory === item.label && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full text-white bg-gray-800 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {userDropdown}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("fixed w-full top-0 left-0 z-50 p-4 md:hidden", scrollingDown && "-top-24", className)}>
        <div className="bg-black/10 border border-gray-800 backdrop-blur-lg rounded-2xl shadow-xl shadow-black/20">
          <div className="flex justify-between items-center p-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            {userDropdown}
          </div>

          {isMobileMenuOpen && (
            <div className="grid grid-cols-3 gap-3 p-3 border-t border-gray-800">
              {items.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold",
                    activeTab === item.name 
                      ? "bg-gray-800 text-white text-center font-medium" 
                      : "bg-gray-300 text-black text-center font-medium"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                  {activeTab === item.name && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full text-white bg-gray-800 rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {[{ label: "חלבי", icon: FaCheese, link: "/allDairy" },
                { label: "פרווה", icon: FaLeaf, link: "/allFur" },
                { label: "בשרי", icon: FaDrumstickBite, link: "/allMeat" }].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleCategoryClick(item.label, item.link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium",
                    activeCategory === item.label
                      ? "bg-gray-800 text-white"
                      : "bg-gray-800/30 text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  )}
                >
                  <item.icon size={20} /> {item.label}
                  {activeCategory === item.label && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full text-white bg-gray-800 rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

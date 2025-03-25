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
    setIsMobileMenuOpen(false);
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
        <div className="flex items-center gap-3 bg-background/5 border backdrop-blur-lg py-1 px-2 rounded-full shadow-lg">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              onClick={async () => {
                if (item.url === "/CreateRecipe" && !user) {
                  toast.error("בשביל ליצור מתכון צריך להיות מחובר ");
                  await Promise.resolve();
                  navigate("/login");
                }
                setActiveTab(item.name);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-3xl transition-colors",
                "text-foreground/80 hover:text-primary",
                activeTab === item.name && "bg-muted text-primary"
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon size={20} strokeWidth={1.5} />
                <span className="hidden md:inline">{item.name}</span>
              </div>
              {activeTab === item.name && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10 "
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-3 py-2 font-semibold rounded-full transition-all text-foreground/80 hover:text-primary bg-muted hover:bg-primary/20 cursor-pointer"
              onClick={() => navigate("/allDairy")}
            >
              <FaCheese size={20} /> חלבי
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 font-semibold rounded-full transition-all text-foreground/80 hover:text-primary bg-muted hover:bg-primary/20 cursor-pointer"
              onClick={() => navigate("/allFur")}
            >
              <FaLeaf size={20} /> פרווה
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 font-semibold rounded-full transition-all text-foreground/80 hover:text-primary bg-muted hover:bg-primary/20 cursor-pointer"
              onClick={() => navigate("/allMeat")}
            >
              <FaDrumstickBite size={20} /> בשרי
            </button>
          </div>

          {userDropdown}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed w-full top-0 left-0 z-50 p-4 md:hidden",
          scrollingDown && "-top-24",
          className
        )}
      >
        <div className="bg-background/5 border backdrop-blur-lg rounded-2xl shadow-lg">
          <div className="flex justify-between items-center p-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground/80 hover:text-primary "
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            {userDropdown}
          </div>

          {isMobileMenuOpen && (
            <div className="flex flex-col gap-3 p-3 border-t">
              {items.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    " gap-2 px-4 py-2 rounded-xl font-bold",
                    activeTab === item.name 
                      ? "bg-primary/10 text-primary " 
                      : "text-foreground/80"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="flex flex-col gap-3 mt-3">
              <button
  onClick={() => {
    navigate("/allDairy");
    setIsMobileMenuOpen(false); // סוגר את התפריט
  }}
  className=" font-bold flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-muted"
>
  <FaCheese size={20} /> חלבי
</button>

<button
  onClick={() => {
    navigate("/allFur");
    setIsMobileMenuOpen(false); // סוגר את התפריט
  }}
  className=" font-bold flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-muted"
>
  <FaLeaf size={20} /> פרווה
</button>

<button
  onClick={() => {
    navigate("/allMeat");
    setIsMobileMenuOpen(false); // סוגר את התפריט
  }}
  className=" font-bold flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-muted"
>
  <FaDrumstickBite size={20} /> בשרי
</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
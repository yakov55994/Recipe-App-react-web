import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaCheese, FaDrumstickBite, FaLeaf } from "react-icons/fa";
import { cn } from "../../lib/utils.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "sonner";


export default function NavBar({ items, className, userDropdown }) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "דף הבית");
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  return (
    <div
      className={cn(
        "fixed w-[900px] top-0 left-1/2 -translate-x-1/2 z-50 sm:pt-6 transition-all duration-300",
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
                className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
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
  );
}

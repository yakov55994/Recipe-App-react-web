import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext, useAuth } from '../context/AuthContext.jsx';
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";


const NavBar = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const toggleDropdown = (menuType) => {
    setActiveMenu(activeMenu === menuType ? null : menuType);
  };

  const handleMouseEnter = (menuType) => {
    clearTimeout(hoverTimeout); // מניחים את עיכוב ה-hover קודם
    setActiveMenu(menuType);
  };

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setActiveMenu(null);
    }, 300); // עיכוב של 300 מילישניות לפני שהקולפום ייסגר
    setHoverTimeout(timeoutId);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isMenuButton = event.target.closest('button[data-menu-trigger]');
      if (!isMenuButton) {
        const dropdown = document.getElementById('dropdownMenu');
        if (dropdown && !dropdown.contains(event.target)) {
          setActiveMenu(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderDropdownMenu = (menuType) => {
    const menuItems = {
      dairy: {
        title: '🧀 מתכונים חלבי',
        items: [
          { to: '/DairyDishes', icon: '🍕', text: 'מנות' },
          { to: '/DairyDesserts', icon: '🍰', text: 'קינוחים' },
        ]
      },
      parve: {
        title: '🍲 מתכונים פרווה',
        items: [
          { to: '/FurDishes', icon: '🥗', text: 'מנות' },
          { to: '/FurDesserts', icon: '🥬', text: 'קינוחים' },
          { to: '/FurSoups', icon: '🍚', text: 'מרקים' }
        ]
      },
      meat: {
        title: '🍖 מתכונים בשרי',
        items: [
          { to: '/MeatDishes', icon: '🥩', text: 'מנות' },
          { to: '/MeatSoups', icon: '🥘', text: 'מרקים' }
        ]
      }
    };

    const menu = menuItems[menuType];
    if (!menu) return null;

    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => handleMouseEnter(menuType)}
        onMouseLeave={handleMouseLeave}
      >
        <button
          data-menu-trigger
          className={`px-3 py-2 text-sm font-medium rounded-md ${activeMenu === menuType ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown(menuType);
          }}
        >
          {menu.title}
        </button>

        {activeMenu === menuType && (
          <div
            id="dropdownMenu"
            className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50"
            style={{ minWidth: '200px' }}
          >
            {menu.items.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="block px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setActiveMenu(null)}
              >
                <span className="flex items-center gap-2">
                  {item.icon} {item.text}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const LogOut = () => {
    logout();
    navigate('./login')
  };
  return (
    <nav className="bg-gray-800 text-white relative z-40" dir="rtl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
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

          <div className="hidden sm:flex flex-1 items-center justify-between">
            <h3 className="text-black bg-amber-200 rounded h-7 w-9 text-center">בס"ד</h3>

            <div className="flex ml-auto space-x-4">
              <Link to="/Home" className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                🏠 בית
              </Link>
              <Link to="/PersonalArea" className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                🧍 איזור אישי
              </Link>

              {renderDropdownMenu('dairy')}
              {renderDropdownMenu('parve')}
              {renderDropdownMenu('meat')}

              <Link to="/AllRecipes" className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                📝 כל המתכונים
              </Link>
              <Link to="/CreateRecipe" className="px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md">
                📝 יצירת מתכון
              </Link>
              <Link to='./login'>
                <IoPersonCircleSharp className='size-7 mt-1' />
              </Link>
              <button  onClick={LogOut}>
                <RiLogoutBoxRFill className='size-7 mt-1'/>

              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
            <Link to="/Home" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
              🏠 בית
            </Link>
            <Link to="/PersonalArea" className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">
              🧍 איזור אישי
            </Link>

            <div className="space-y-2">
              {['dairy', 'fur', 'meat'].map((menuType) => (
                <div key={menuType} className="relative">
                  <button
                    data-menu-trigger
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(menuType);
                    }}
                    className={`w-full text-right px-3 py-2 text-base font-medium rounded-md ${activeMenu === menuType ? 'bg-gray-700' : 'hover:bg-gray-700'
                      }`}
                  >
                    {menuType === 'dairy' && '🍕 מתכונים חלבי'}
                    {menuType === 'parve' && '🍲 מתכונים פרווה'}
                    {menuType === 'meat' && '🍖 מתכונים בשרי'}
                    {activeMenu === menuType ? " ▲" : " ▼"}
                  </button>
                  {activeMenu === menuType && (
                    <div className="mr-4 space-y-1 bg-gray-700 rounded-md mt-1">
                      {menuType === 'dairy' && (
                        <>
                          <Link to="/DairyDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🥛 פסטה ברוטב שמנת
                          </Link>
                          <Link to="/DairyDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🧀 פיצה
                          </Link>
                          <Link to="/DairyDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🥪 לזניה
                          </Link>
                        </>
                      )}
                      {menuType === 'parve' && (
                        <>
                          <Link to="/ParveDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🥗 סלט ירקות
                          </Link>
                          <Link to="/ParveDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🥬 מרק ירקות
                          </Link>
                          <Link to="/ParveDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🍚 אורז מוקפץ
                          </Link>
                        </>
                      )}
                      {menuType === 'meat' && (
                        <>
                          <Link to="/MeatDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🥩 שניצל
                          </Link>
                          <Link to="/MeatDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🍗 עוף בתנור
                          </Link>
                          <Link to="/MeatDishes" className="block px-4 py-2 hover:bg-gray-600 rounded-md">
                            🥘 קציצות בשר
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
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

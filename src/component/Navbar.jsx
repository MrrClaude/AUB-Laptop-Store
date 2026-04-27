import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMoon, IoSunny } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { FaEnvelopeOpenText, FaHome, FaLaptopCode } from "react-icons/fa";
import { RiInformationLine, RiShoppingBasketLine } from "react-icons/ri";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import ThemeContext from "../context/themeProvder";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import imgLogo from "/Artboard1.png";
import Login from "./Login";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { theme, toggle } = useContext(ThemeContext);
  const [showNavbar, setShowNavbar] = useState(true);

  // Hide navbar when scrolling
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setShowNavbar(false);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowNavbar(true);
      }, 250);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-area")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Helper: close both menus
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
          ${
            theme === "dark"
              ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white border-t border-gray-700"
              : "bg-white text-gray-800 border-t border-gray-200 shadow-sm"
          }
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-1">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center space-x-3 hover:opacity-80 transition"
          >
            <img src={imgLogo} className="h-20" alt="Logo" />
            <span
              className={`self-center text-2xl font-bold md:inline hidden  ${
                theme === "dark" ? "text-indigo-700" : "text-black"
              }`}
            >
              ICT
            </span>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3 md:order-2">
            <button className="p-2 rounded-full transition" onClick={toggle}>
              {theme === "light" ? <IoSunny /> : <IoMoon />}
            </button>

            <button
              className="px-4 text-[2rem] font-medium rounded-lg transition-all duration-200 hover:text-blue-500"
              onClick={() => setIsLoginOpen(true)}
            >
              <CgProfile />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex items-center px-1 py-2 text-[1.8rem] font-medium rounded-full transition-all duration-200 hover:text-red-500"
            >
              <FaHeart />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={handleLinkClick}
              className="relative flex items-center px-1 py-2 text-[2rem] font-medium rounded-full transition-all duration-200 hover:text-blue-500"
            >
              <RiShoppingBasketLine />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              ☰
            </button>
          </div>

          {/* Menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            {(() => {
              const location = useLocation();
              const isProductActive =
                location.pathname.startsWith("/gaming") ||
                location.pathname.startsWith("/accessories");

              return (
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent md:dark:bg-transparent">
                  {/* Home */}
                  <li>
                    <NavLink
                      to="/"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-1 py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 font-semibold"
                            : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <FaHome
                            className={`transition-colors ${
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : ""
                            }`}
                          />
                          Home
                        </>
                      )}
                    </NavLink>
                  </li>

                  {/* About */}
                  <li>
                    <NavLink
                      to="/about"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-1 py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 font-semibold"
                            : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <RiInformationLine
                            className={`text-lg transition-colors ${
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : ""
                            }`}
                          />
                          About
                        </>
                      )}
                    </NavLink>
                  </li>

                  {/* Product Dropdown */}
                  <li className="relative dropdown-area">
                    <button
                      onMouseEnter={() =>
                        window.innerWidth >= 768 && setIsDropdownOpen(true)
                      }
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                        isProductActive
                          ? "text-blue-600 dark:text-blue-400 font-semibold"
                          : ""
                      }`}
                    >
                      <HiMiniComputerDesktop
                        className={`text-lg transition-colors ${
                          isProductActive
                            ? "text-blue-600 dark:text-blue-400"
                            : ""
                        }`}
                      />
                      Product ▼
                    </button>

                    {isDropdownOpen && (
                      <div
                        className={`absolute left-0 mt-2 w-64 border rounded-lg shadow-lg ${
                          theme === "dark"
                            ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white border-t border-gray-700"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <ul className="grid grid-cols-2 gap-2 p-3">
                          <li>
                            <NavLink
                              to="/gaming"
                              onClick={handleLinkClick}
                              className={({ isActive }) =>
                                `block p-2 rounded hover:text-blue-700 transition-colors ${
                                  isActive ? "text-blue-600 font-semibold" : ""
                                }`
                              }
                            >
                              Gaming-laptop
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/accessories"
                              onClick={handleLinkClick}
                              className={({ isActive }) =>
                                `block p-2 rounded hover:text-blue-700 transition-colors ${
                                  isActive ? "text-blue-600 font-semibold" : ""
                                }`
                              }
                            >
                              Accessories
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>

                  {/* Contact */}
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-1 py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 font-semibold"
                            : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <FaEnvelopeOpenText
                            className={`text-lg transition-colors ${
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : ""
                            }`}
                          />
                          Contact Us
                        </>
                      )}
                    </NavLink>
                  </li>

                  {/* Service */}
                  <li>
                    <NavLink
                      to="/service"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-1 py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 font-semibold"
                            : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <FaLaptopCode
                            className={`text-lg transition-colors ${
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : ""
                            }`}
                          />
                          Service
                        </>
                      )}
                    </NavLink>
                  </li>
                </ul>
              );
            })()}
          </div>
        </div>
      </nav>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default Navbar;

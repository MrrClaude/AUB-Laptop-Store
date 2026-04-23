import { useContext } from "react";
import { Link } from "react-router-dom";
import imgLogo from "/Artboard1.png";
import ThemeContext from "../context/themeProvder";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={` text-sm ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white border-t border-gray-700"
          : "bg-white text-gray-800 border-t border-gray-200 shadow-sm"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={imgLogo} alt="Logo" className="h-20 mr-3" />
              <span
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-indigo-700" : "text-black"
                }`}
              >
                ICT
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400">
              Your trusted destination for high-performance laptops, unbeatable
              deals, and expert support. Shop the latest in laptop technology.
            </p>
          </div>
          <div>
            <h3
              className={`text-sm font-semibold uppercase mb-4 ${
                theme === "dark" ? "text-indigo-700" : "text-black"
              }`}
            >
              Navigate
            </h3>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/service" className="hover:underline">
                  Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className={`text-sm font-semibold uppercase mb-4 ${
                theme === "dark" ? "text-indigo-700" : "text-black"
              }`}
            >
              Categories
            </h3>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li>
                <Link to="/gaming" className="hover:underline">
                  Gaming Laptops
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:underline">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className={`text-sm font-semibold uppercase mb-4 ${
                theme === "dark" ? "text-indigo-700" : "text-black"
              }`}
            >
              Support & Legal
            </h3>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li>
                <Link to="/page500" className="hover:underline">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/page500" className="hover:underline">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/page500" className="hover:underline">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="/page500" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/page500" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-300 dark:border-gray-700" />
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © 2025
            <Link to="/" className="font-semibold hover:underline">
              ICT Laptops™
            </Link>
            . All rights reserved.
          </p>

          <div className="flex space-x-5 mt-4 sm:mt-0 text-xl ">
            <a
              href="https://www.facebook.com/mrr.claude" target="blank"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaFacebookF/>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import WishlistContext from "../context/WishlistContext";
import CartContext from "../context/CartContext";
import ThemeContext from "../context/themeProvder";
import CardModal from "../component/CardModal";

const Wishlist = () => {
  const { wishlistItems, toggleWishlist, wishlistAlert } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <div
      className={`min-h-screen py-12 mt-[80px] px-4 md:px-8 transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-[#0a0a0f] text-white" 
          : "bg-[#f8f9fa] text-gray-900"
      }`}
    >
      {wishlistAlert && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 p-4 text-sm rounded-lg shadow-xl z-50 max-w-sm border font-medium ${
          wishlistAlert.type === 'added'
            ? 'text-green-900 bg-green-200 dark:bg-green-600 dark:text-white border-green-300 dark:border-green-500'
            : 'text-red-900 bg-red-200 dark:bg-red-600 dark:text-white border-red-300 dark:border-red-500'
        }`} role="alert">
          {wishlistAlert.type === 'added' 
            ? `✅ Success! "${wishlistAlert.product}" added to wishlist!` 
            : `❌ "${wishlistAlert.product}" removed from wishlist!`}
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {/* Header styling */}
        <div className="flex items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              My Wishlist
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Manage your favorite items and save them for later.
            </p>
          </div>
          <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 py-2 px-5 rounded-full text-sm font-bold shadow-sm">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>
        
        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-gray-900/40 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800/60"
          >
            <div className="w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-8">
              <FaRegHeart className="text-6xl text-indigo-300 dark:text-indigo-500/70" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 text-lg">
              Looks like you haven't added anything to your wishlist yet. Discover our amazing products and save your favorites here.
            </p>
            <Link
              to="/gaming"
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/20 text-lg font-semibold transform hover:-translate-y-1"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col justify-between rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="relative">
                  <img
                    className="p-6 rounded-t-2xl w-full h-64 object-contain bg-transparent"
                    src={item.img}
                    alt={item.title}
                  />
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-4 right-4 bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100 hover:text-red-700 transition shadow-sm z-10"
                    title="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="px-6 pb-6 flex flex-col flex-grow">
                  <h1
                    className={`text-[1.5rem] font-bold ${theme === "dark" ? "text-indigo-400" : "text-black"
                      }`}
                  >
                    {item.title}
                  </h1>
                  <h5 className="font-semibold mb-3 leading-snug line-clamp-2 text-sm">
                    {item.desc}
                  </h5>
                  <div className="flex items-center mt-2.5 mb-5">
                    {item.stars && item.stars.map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-4 h-4 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    <span
                      className={`ml-3 text-xs font-semibold px-2.5 py-0.5 rounded ${theme === "dark"
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {item.rating}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="text-2xl font-bold">${item.price}</span>
                    <div className="flex gap-2">
                      {item.upgrate ? (
                        <>
                          <button
                            onClick={() => setSelectedProduct(item)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${theme === "dark"
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                              }`}
                          >
                            View more
                          </button>
                          <button
                            onClick={() => addToCart(item, 1)}
                            className={`p-3 rounded-full transition-all duration-200 ${theme === "dark"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-green-500 hover:bg-green-600"
                              } text-white`}
                          >
                            <FaCartShopping />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className={`px-8 py-5 rounded-lg text-lg font-medium transition-all duration-200 ${
                            theme === "dark"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white`}
                        >
                          <FaCartShopping />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <CardModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Wishlist;

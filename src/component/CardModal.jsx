import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShoppingCart, FaHeart } from "react-icons/fa";
import ThemeContext from "../context/themeProvder";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import { li, ul } from "framer-motion/client";

const CardModal = ({ product, onClose, preSelectedUpgrade }) => {
  if (!product) return null;
  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist, wishlistAlert } = useContext(WishlistContext);

  const isWishlisted = isInWishlist(product);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  const [mainImage, setMainImage] = useState(product.img);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  
  // Pre-select upgrade if provided from cart
  const getInitialUpgradeIndex = () => {
    if (preSelectedUpgrade && product.series && Array.isArray(product.series)) {
      return product.series.findIndex(
        (s) => s.about === preSelectedUpgrade.about && s.price === preSelectedUpgrade.price
      );
    } else if (preSelectedUpgrade && product.upgrate && Array.isArray(product.upgrate)) {
      return product.upgrate.findIndex(
        (u) => u.Ram === preSelectedUpgrade.Ram && u.Storage === preSelectedUpgrade.Storage && u.price === preSelectedUpgrade.price
      );
    }
    return null;
  };
  
  const [selectedUpgradeIndex, setSelectedUpgradeIndex] = useState(getInitialUpgradeIndex());

  const selectedUpgrade = 
    selectedUpgradeIndex !== null && (product.upgrate || product.series) && (product.upgrate || product.series)[selectedUpgradeIndex] 
      ? (product.upgrate || product.series)[selectedUpgradeIndex] 
      : null;

  const basePrice = product.price + (selectedUpgrade ? selectedUpgrade.price : 0);
  const totalPrice = basePrice * quantity;

  const handleAddToCart = () => {
    // If there is an upgrade selected, modify the product that goes into the cart
    const productToAdd = selectedUpgrade 
      ? { ...product, price: basePrice, selectedUpgrade } 
      : product;

    addToCart(productToAdd, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 p-4 text-sm text-green-900 rounded-lg bg-green-200 dark:bg-green-600 dark:text-white shadow-xl z-[9999] max-w-sm border border-green-300 dark:border-green-500 font-medium"
          >
            ✅ Product added to cart successfully!
          </motion.div>
        )}
        {wishlistAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 p-4 text-sm rounded-lg shadow-xl z-[9999] max-w-sm border font-medium ${
              wishlistAlert.type === 'added'
                ? 'text-green-900 bg-green-200 dark:bg-green-600 dark:text-white border-green-300 dark:border-green-500'
                : 'text-red-900 bg-red-200 dark:bg-red-600 dark:text-white border-red-300 dark:border-red-500'
            }`}
            role="alert"
          >
            {wishlistAlert.type === 'added' 
              ? `✅ Success! "${wishlistAlert.product}" added to wishlist!` 
              : `❌ "${wishlistAlert.product}" removed from wishlist!`}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={`relative w-[90%] h-[90%] overflow-y-auto rounded-3xl shadow-2xl p-5 ${theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white"
          : "bg-white text-gray-800"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl transition"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col md:flex-row h-full ">
          <div
            className={`md:w-1/2 p-6 flex flex-col items-center rounded-l-3xl ${theme === "dark"
              ? "border-gray-700 bg-gradient-to-tr from-gray-900 via-gray-950 to-black"
              : "border-gray-200 bg-white shadow-sm"
              }`}
          >
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[300px] md:h-[500px] rounded-xl shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
            />
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-8 w-full">
              {product.categoryImg.map((thumb, idx) => (
                <img
                  key={idx}
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-500 transition"
                  onClick={() => setMainImage(thumb)}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-between mb-5">
            <div>
              <h1
                className={`text-[2rem] font-bold ${theme === "dark" ? "text-indigo-400" : "text-indigo-700"
                  }`}
              >
                {product.title}
              </h1>
              <h2 className="font-semibold mb-3">{product.desc}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                High-performance product with excellent user experience.
              </p>
              <div className="flex items-center gap-2 mb-4">
                {product.stars.map((_, idx) => (
                  <svg
                    key={idx}
                    className="w-5 h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.rating})
                </span>
              </div>

              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4 block">
                ${totalPrice.toFixed(2)}
              </span>

              <div className="mb-6 flex items-center gap-4">
                <label className="text-base font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                  Quantity:
                </label>
                <div
                  className={`flex items-center border-2 rounded-full shadow-sm backdrop-blur-md overflow-hidden transition-all duration-300 ${theme === "dark"
                    ? "border-gray-700 bg-gray-800/60 hover:bg-gray-700/80"
                    : "border-gray-200 bg-white/80 hover:bg-gray-50/90"
                    }`}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className={`px-4 py-2 text-lg font-bold transition-all duration-300 ${theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600"
                      : "text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600"
                      }`}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className={`w-16 text-center font-semibold text-lg border-0 focus:outline-none bg-transparent ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className={`px-4 py-2 text-lg font-bold transition-all duration-300 ${theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
                      : "text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-500"
                      }`}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-0">
                <div>
                  {product.category && typeof product.category === 'object' && !Array.isArray(product.category) ? (
                    <ul className="list-disc pl-5 space-y-1 text-gray-500 dark:text-gray-400">
                      {Object.entries(product.category).map(([key, value], index) => (
                        <li key={index}>
                          <span className="font-semibold">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  ) : product.list && Array.isArray(product.list) ? (
                    <ul className="list-disc pl-5 space-y-1 text-gray-500 dark:text-gray-400">
                      {product.list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {/* <div className="w-px bg-gray-500 dark:bg-gray-600 mx-4"></div> */}
                <div>
                  <div>
                    <h3 className="text-lg font-semibold">Free Items:</h3>
                    {
                      product.itemFree.map((item, index) => (
                        <ul className="list-disc pl-5 space-y-1 text-gray-500 dark:text-gray-400">
                          <li key={index}>{item}</li>
                        </ul>
                      ))
                    }
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mt-4">Upgrade:</h3>
                    {(product.upgrate || product.series) && Array.isArray(product.upgrate || product.series) && (
                      <div className="flex flex-col gap-3 mt-2">
                        {/* Option to clear the selection */}
                        <label 
                          className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                            selectedUpgradeIndex === null 
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="upgrade" 
                            checked={selectedUpgradeIndex === null}
                            onChange={() => setSelectedUpgradeIndex(null)}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                          />
                          <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold block">No Upgrade</span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">
                              +$0.00
                            </span>
                          </div>
                        </label>

                        {/* Upgrade options from JSON */}
                        {(product.upgrate || product.series).map((item, index) => (
                          <label 
                            key={index}
                            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                              selectedUpgradeIndex === index 
                                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            <input 
                              type="radio" 
                              name="upgrade" 
                              checked={selectedUpgradeIndex === index}
                              onChange={() => setSelectedUpgradeIndex(index)}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                            />
                            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-semibold block">
                                {item.Ram ? `${item.Ram} • ${item.Storage}` : item.about}
                              </span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                +${item.price.toFixed(2)}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-md"
              >
                <FaShoppingCart />
                Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-white transition"
              >
                <FaHeart
                  className={`text-xl transition-colors duration-300 ${isWishlisted ? "text-red-500 " : ""
                    }`}
                />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardModal;

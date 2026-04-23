import { useContext } from "react";
import CartContext from "../context/CartContext";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ThemeContext from "../context/themeProvder";

const AddToCartModal = ({ isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + tax;

  if (!isOpen) return null;

  return (
    <div
      className={`min-h-screen py-12 mt-[90px] px-4 md:px-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-6 mb-10">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-3xl text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">Shopping Cart</h1>
              <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Review your items and proceed to checkout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-24 rounded-2xl border ${
              theme === "dark"
                ? "bg-gray-900/40 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            <FaShoppingCart className="text-6xl text-gray-300 dark:text-gray-600 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Looks like you haven't added any items yet. Start shopping!
            </p>
            <Link
              to="/gaming"
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className={`rounded-xl border p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-white"}`}>
                <h3 className="text-lg font-semibold mb-4">Order Items ({cartItems.length})</h3>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center p-4 rounded-lg border transition-all ${
                        theme === "dark"
                          ? "border-gray-700 hover:bg-gray-800/50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-24 h-24 object-contain rounded-lg bg-gray-100 dark:bg-gray-800 p-2"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            {item.desc}
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => removeFromCart(item.id, "decrease")}
                              className={`p-2 rounded-full border transition ${
                                theme === "dark"
                                  ? "border-gray-700 hover:bg-gray-800"
                                  : "border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <FaMinus size={14} />
                            </button>
                            <span className="font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className={`p-2 rounded-full border transition ${
                                theme === "dark"
                                  ? "border-gray-700 hover:bg-gray-800"
                                  : "border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <FaPlus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 ml-4">
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          ${item.price.toFixed(2)} each
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-full transition"
                          title="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    Clear All Items
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className={`rounded-xl border p-6 sticky top-28 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 border-gray-700"
                    : "bg-white border-gray-200 shadow-md"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Items ({cartItems.length})</span>
                    <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Tax (5%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mb-6 flex justify-between text-lg font-bold`}>
                  <span>Total</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-2xl">${finalTotal.toFixed(2)}</span>
                </div>

                <div className={`rounded-lg p-4 mb-6 space-y-2 text-sm ${
                  theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
                }`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🚚</span>
                    <div>
                      <p className="font-semibold">Free Shipping</p>
                      <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⏰</span>
                    <div>
                      <p className="font-semibold">Delivery Time</p>
                      <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>3-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🔒</span>
                    <div>
                      <p className="font-semibold">Secure Payment</p>
                      <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>100% safe & encrypted</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/payment"
                    onClick={onClose}
                    className="w-full block text-center py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Proceed to Payment →
                  </Link>
                  <button
                    onClick={onClose}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                        : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                    }`}
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartModal;

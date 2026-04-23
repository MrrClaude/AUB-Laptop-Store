import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaLock } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import ThemeContext from "../context/themeProvder";

const PaymentPage = () => {
  const { cartItems } = useContext(CartContext);
    const{theme}=useContext(ThemeContext)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center p-6 ${
        theme === "dark"
          ? "border-gray-700 bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white"
          : "border-gray-200 bg-white text-gray-800 shadow-sm"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`w-full max-w-5xl rounded-3xl shadow-2xl p-10 border ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold flex items-center gap-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            <MdOutlinePayment className="text-4xl text-blue-400" />
            Payment Details
          </h1>

          <div className="flex gap-3 text-3xl">
            <FaCcVisa className="text-blue-600" />
            <FaCcMastercard className="text-red-500" />
            <FaCcPaypal className="text-blue-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-gray-800/60 border border-gray-700"
                : "bg-white border border-gray-200 shadow-sm"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2 text-sm"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-3 border-gray-600/30" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total (incl. tax)</span>
              <span>${(totalPrice * 1.05).toFixed(2)}</span>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-gray-800/60 border border-gray-700"
                : "bg-white border border-gray-200 shadow-sm"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Card Information</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Jonh Cena"
                  className="w-full p-3 rounded-xl border border-gray-500/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Card Number</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="flex-1 p-3 rounded-xl border border-gray-500/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaCcVisa className="text-3xl text-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-3 rounded-xl border border-gray-500/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 rounded-xl border border-gray-500/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500  font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-2xl mt-4 flex items-center justify-center gap-2"
              >
                <MdOutlinePayment className="text-2xl" />
                Pay Now – ${(totalPrice * 1.05).toFixed(2)}
              </motion.button>
            </form>
            <Link
              to="/gaming"
              className="block mt-6 text-sm text-blue-400 hover:underline text-center"
            >
              ← Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;

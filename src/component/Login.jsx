// src/components/LoginModal.jsx
import React, { useContext ,useState} from "react";
import ThemeContext from "../context/themeProvder";
import { motion, AnimatePresence } from "framer-motion";


const Login = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  // const [isSignupOpen ,setIsSignupOpen]=useState(false);

  // if(isSignupOpen){
  //   return<SignupPage isOpen={true} onClose={()=> setIsSignupOpen(false)}/>
  // }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-md p-6 rounded-2xl shadow-2xl relative transition-colors duration-300
              ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
            `}
          >
            <button
              onClick={onClose}
              className={`absolute top-3 right-3 text-lg ${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              ✕
            </button>
            <div
              className={`text-center mb-6 border-b pb-3 ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold">
                Login to Your Account
              </h2>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Sign in to continue to your account
              </p>
            </div>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={`w-full px-3 py-2 rounded-lg border text-sm outline-none
                    ${isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"}
                  `}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 rounded-lg border text-sm outline-none
                    ${isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"}
                  `}
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label
                  className={`flex items-center space-x-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full font-medium rounded-lg py-2.5 transition-all duration-200
                  ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                Login
              </button>

              <p
                className={`text-sm text-center ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Don’t have an account?{" "}
                <button type="button"  className="text-blue-600 hover:underline"> 
                  {/* onClick={()=>{setIsSignupOpen(true)}} */}
                  Sign up
                </button>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;

import React from "react";

const Page500 = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white border-t border-gray-700 mt-[90px]">
      {/* Background GIF */}
      <img
        src="https://i.pinimg.com/originals/4e/de/5a/4ede5a33c5490195b2b17466ad26d124.gif"
        alt="404 background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Text container */}
      <div className="relative z-20 text-center px-6">
        <h1 className="text-8xl font-extrabold text-indigo-500 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-4xl font-bold mt-4 drop-shadow-md">
          Page Not Found
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-gray-300 text-lg drop-shadow-sm">
          The page you’re looking for doesn’t exist.
        </p>
        <p className="text-xl font-semibold mt-4 mb-8 text-gray-200 drop-shadow-sm">
          Try going back to safety
        </p>

        <a
          href="/"
          className="inline-block px-8 py-3  text-white font-semibold rounded-2xl shadow-md shadow-gray-300 transition-all duration-300 hover:scale-105 hover:text-fuchsia-900 hover:shadow-fuchsia-900"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Page500;

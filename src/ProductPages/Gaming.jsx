import React, { useContext, useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";
import Carousel from "../component/Carousel";
import ThemeContext from "../context/themeProvder";
import CardModal from "../component/CardModal";
import CartContext from "../context/CartContext";

const gamingData = [
  {
    id: "G01",
    img: "https://storage-asset.msi.com/global/picture/image/feature/nb/GF/Katana-17-A13V/cpu17-img.png",
    brand: "MSI",
    categoryImg: [
      "https://asset.msi.com/resize/image/global/product/product_1689926260863cedd14444561c0cbd43df4f4a85a7.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_16681473981e920639408ee423893084e294154605.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_166814740381cc19d1ad47d2bf9033613ed2fcacde.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_16681474016cdd95a375490fce08243335a290aa93.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
    ],
    title: "MSI Katana 17",
    desc: "Experience the power of the 13th Gen Intel® Core™ i7 processor with improved hybrid core architecture for enhanced performance and efficiency.",
    stars: new Array(4).fill(true),
    category: {
      Ram: "16GB DDR4 RAM",
      CPU: "Up to Intel® Core™ i7-13620H processor",
      Storage: " 512GB M.2 PCie",
      OS: "Windows 11 Home / Pro MSI recommends Windows 11 Pro.",
      GPU: "Up to GeForce RTX™ 4060 Laptop GPU 8GB GDDR6",
      Display: "17.3 Full HD (1920x1080),144 Hz, IPS-Level panel",
      Cooling: "Exclusive Cooler Boost 5 Technology",
      Battery: "37WHrs",
      Weight: "2.9 kg (6.39 lbs)",
      color: "Black",
      OfficialWarranty: " 2 YEARS",
    },
    itemFree: [
      "Free Gaming Backpack",
      "Free Gaming Mouse",
      "Free Gaming Headset",
      "Screen Protector",
      "Laptop Fans",
    ],
    upgrate: [
      {
        Ram: "32GB DDR4 RAM",
        Storage: "1TB M.2 PCie",
        price: 200,
      },
      {
        Ram: "64GB DDR4 RAM",
        Storage: "2TB M.2 PCie",
        price: 400,
      }
    ],
    rating: "4.0",
    price: 1200,
  },
  {
    id: "G02",
    img: "https://storage-asset.msi.com/global/picture/image/feature/nb/GF/Katana-17-A13V/cpu17-img.png",
    brand: "ASUS",
    categoryImg: [
      "https://asset.msi.com/resize/image/global/product/product_1689926260863cedd14444561c0cbd43df4f4a85a7.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_16681473981e920639408ee423893084e294154605.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_166814740381cc19d1ad47d2bf9033613ed2fcacde.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_16681474016cdd95a375490fce08243335a290aa93.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
    ],
    title: "MSI Katana 17",
    desc: "Experience the power of the 13th Gen Intel® Core™ i7 processor with improved hybrid core architecture for enhanced performance and efficiency.",
    stars: new Array(4).fill(true),
    category: {
      Ram: "16GB DDR4 RAM",
      CPU: "Up to Intel® Core™ i7-13620H processor",
      Storage: " 512GB M.2 PCie",
      OS: "Windows 11 Home / Pro MSI recommends Windows 11 Pro.",
      GPU: "Up to GeForce RTX™ 4060 Laptop GPU 8GB GDDR6",
      Display: "17.3 Full HD (1920x1080),144 Hz, IPS-Level panel",
      Cooling: "Exclusive Cooler Boost 5 Technology",
      Battery: "37WHrs",
      Weight: "2.9 kg (6.39 lbs)",
      color: "Black",
      OfficialWarranty: " 2 YEARS",
    },
    itemFree: [
      "Free Gaming Backpack",
      "Free Gaming Mouse",
      "Free Gaming Headset",
      "Screen Protector",
      "Laptop Fans",
    ],
    upgrate: [
      {
        Ram: "32GB DDR4 RAM",
        Storage: "1TB M.2 PCie",
        price: 200,
      },
      {
        Ram: "64GB DDR4 RAM",
        Storage: "2TB M.2 PCie",
        price: 400,
      }
    ],
    rating: "4.0",
    price: 1200,
  },
  {
    id: "G03",
    img: "https://storage-asset.msi.com/global/picture/image/feature/nb/GF/Katana-17-A13V/cpu17-img.png",
    brand: "LENOVO",
    categoryImg: [
      "https://asset.msi.com/resize/image/global/product/product_1689926260863cedd14444561c0cbd43df4f4a85a7.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_16681473981e920639408ee423893084e294154605.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_166814740381cc19d1ad47d2bf9033613ed2fcacde.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
      "https://asset.msi.com/resize/image/global/product/product_16681474016cdd95a375490fce08243335a290aa93.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
    ],
    title: "MSI Katana 17",
    desc: "Experience the power of the 13th Gen Intel® Core™ i7 processor with improved hybrid core architecture for enhanced performance and efficiency.",
    stars: new Array(4).fill(true),
    category: {
      Ram: "16GB DDR4 RAM",
      CPU: "Up to Intel® Core™ i7-13620H processor",
      Storage: " 512GB M.2 PCie",
      OS: "Windows 11 Home / Pro MSI recommends Windows 11 Pro.",
      GPU: "Up to GeForce RTX™ 4060 Laptop GPU 8GB GDDR6",
      Display: "17.3 Full HD (1920x1080),144 Hz, IPS-Level panel",
      Cooling: "Exclusive Cooler Boost 5 Technology",
      Battery: "37WHrs",
      Weight: "2.9 kg (6.39 lbs)",
      color: "Black",
      OfficialWarranty: " 2 YEARS",
    },
    itemFree: [
      "Free Gaming Backpack",
      "Free Gaming Mouse",
      "Free Gaming Headset",
      "Screen Protector",
      "Laptop Fans",
    ],
    upgrate: [
      {
        Ram: "32GB DDR4 RAM",
        Storage: "1TB M.2 PCie",
        price: 200,
      },
      {
        Ram: "64GB DDR4 RAM",
        Storage: "2TB M.2 PCie",
        price: 400,
      }
    ],
    rating: "4.0",
    price: 1200,
  },
];

const Gaming = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(gamingData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const searchRef = useRef(null);
  const productsPerPage = 12;

  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);

  const brands = ["All", "MSI", "ASUS", "LENOVO"];

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = gamingData;

    // Filter by brand
    if (selectedBrand !== "All") {
      filtered = filtered.filter(
        (p) => p.brand.toUpperCase() === selectedBrand.toUpperCase()
      );
    }

    // Filter by search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm)
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }

    setResult(filtered);
    setCurrentPage(1);
  }, [query, selectedBrand]);

  // Pagination
  const totalPages = Math.ceil(result.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = result.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleSuggestionClick = (product) => {
    setQuery(product.title);
    setShowDropdown(false);
  };

  return (
    <div
      className={`w-full py-10 mt-[90px] m-auto ${theme === "dark"
          ? "border-gray-700 bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white"
          : "border-gray-200 bg-white text-gray-800 shadow-sm"
        }`}
    >
      <Carousel />

      {/* Title */}
      <h1 className="font-bold text-[3rem] text-center mt-6 font-serif">
        Laptop Gaming
      </h1>

      <div className="flex flex-col md:flex-row md:items-center  md:justify-evenly gap-6 px-4 w-full mt-10 mb-6 ">
        {/* Search bar */}


        {/* Brand Filter Buttons */}
        <div className="max-w-lg w-full">
          <div ref={searchRef} className="relative">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${showDropdown ? "rounded-b-none shadow-xl" : ""
                } ${theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200 hover:shadow-xl"
                }`}
            >
              <Search
                className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setShowDropdown(true)}
                placeholder="Search for gaming laptops..."
                className={`flex-1 text-sm outline-none bg-transparent ${theme === "dark"
                    ? "text-white placeholder-gray-400 border-none"
                    : "text-gray-800 placeholder-gray-500 border-none"
                  }`}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setShowDropdown(false);
                  }}
                  className={`text-2xl hover:bg-gray-200 rounded-full p-1 transition-colors ${theme === "dark"
                      ? "text-gray-400 hover:bg-gray-700"
                      : "text-gray-500"
                    }`}
                >
                  ×
                </button>
              )}
            </div>

            {/* Dropdown */}
            {showDropdown && filteredSuggestions.length > 0 && (
              <div
                className={`absolute w-full z-50 rounded-3xl shadow-2xl mt-3 overflow-hidden ${theme === "dark"
                    ? "bg-gray-800 border-t border-gray-700"
                    : "bg-white border-t border-gray-200"
                  }`}
              >
                {filteredSuggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }`}
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-16 h-16 object-contain rounded-lg bg-gray-100"
                    />
                    <div className="flex-1 text-left">
                      <h3
                        className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                      >
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-indigo-600">
                          ${product.price}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${theme === "dark"
                              ? "bg-blue-900 text-blue-300"
                              : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          ★ {product.rating}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No results in dropdown */}
            {showDropdown && filteredSuggestions.length === 0 && query && (
              <div
                className={`absolute w-full z-50 rounded-3xl mt-3 shadow-2xl px-6 py-8 text-center ${theme === "dark"
                    ? "bg-gray-800 border-t border-gray-700"
                    : "bg-white border-t border-gray-200"
                  }`}
              >
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  No results found for "{query}"
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedBrand === brand
                  ? theme === "dark"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600  shadow-lg"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600  shadow-lg"
                  : theme === "dark"
                    ? "bg-gray-800  border border-gray-700 hover:bg-gray-700"
                    : "bg-gray-100  border border-gray-300 hover:bg-gray-200"
                }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {currentProducts.length > 0 ? (
          currentProducts.map((card) => (
            <div
              key={card.id}
              className={`flex flex-col justify-between rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${theme === "dark"
                  ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black border border-gray-700"
                  : "bg-white border border-gray-200"
                }`}
            >
              <img
                className="p-6 rounded-t-2xl w-full h-64 object-contain bg-transparent"
                src={card.img}
                alt={card.title}
              />
              <div className="px-6 pb-6 flex flex-col flex-grow">
                <h1
                  className={`text-[1.5rem] font-bold ${theme === "dark" ? "text-indigo-400" : "text-black"
                    }`}
                >
                  {card.title}
                </h1>
                <h5 className="font-semibold mb-3 leading-snug line-clamp-2">
                  {card.desc}
                </h5>
                <div className="flex items-center mt-2.5 mb-5">
                  {card.stars.map((_, idx) => (
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
                    {card.rating}
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <span className="text-2xl font-bold">${card.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(card)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${theme === "dark"
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                      View more
                    </button>
                    <button
                      onClick={() => addToCart(card)}
                      className={`p-3 rounded-full transition-all duration-200 ${theme === "dark"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                    >
                      <FaCartShopping />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-lg opacity-70 py-10">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${currentPage === 1
                ? "bg-black text-white cursor-not-allowed opacity-80"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-xl hover:scale-105"
              }`}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${currentPage === totalPages
                ? "bg-black text-white cursor-not-allowed opacity-80"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-xl hover:scale-105"
              }`}
          >
            Next →
          </button>
        </div>
      )}

      {selectedProduct && (
        <CardModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Gaming;

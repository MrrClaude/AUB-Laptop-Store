import { useContext, useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Carousel from "../component/Carousel";
import ThemeContext from "../context/themeProvder";
import CardModal from "../component/CardModal";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";

const accessoriesData = [
  {
    id: "A01",
    img: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
    brand: "Logitech",
    category: "Mouse",
    title: "Intel® Core™ Ultra ( តម្លៃរៀបចំជាឈុតម៉ាសុីន )",
    series: [
      {
        about:"Intel® Core™ Ultra 9 285K (24Cores,24Threads, 5.7 GHz)",
        price: 549.00
      },
      {
        about:"Intel® Core™ Ultra 9 285 (24Cores,24Threads,up to5.6 GHz)",
        price: 499.99
      },
      {
        about:"Intel® Core™ Ultra 7 265KF  (20Cores,20Threads, 5.5 GHz)",
        price: 269.00
      }
    ],
    stars: new Array(5).fill(true),
    rating: "4.8",
    price: 99.09,
  },
];

  const brands = ["All", "Logitech", "Razer", "Anker", "Samsung", "Sony", "Dell", "Belkin"];
  const categories = ["All", "Mouse", "Keyboard", "USB Hub", "Storage", "Headphones", "Webcam", "Charger", "Monitor", "Mouse Pad", "Laptop Stand"];

const Accessories = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(accessoriesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedUpgrades, setSelectedUpgrades] = useState({});
  const searchRef = useRef(null);
  const brandRef = useRef(null);
  const categoryRef = useRef(null);
  const productsPerPage = 12;

  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist, wishlistAlert } = useContext(WishlistContext);


  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setShowBrandDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = accessoriesData;

    // Filter by brand
    if (selectedBrand !== "All") {
      filtered = filtered.filter(
        (p) => p.brand.toUpperCase() === selectedBrand.toUpperCase()
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toUpperCase() === selectedCategory.toUpperCase()
      );
    }

    // Filter by search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.desc.toLowerCase().includes(searchTerm)||
        p.category.toLowerCase().includes(searchTerm)
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }

    setResult(filtered);
    setCurrentPage(1);
  }, [query, selectedBrand, selectedCategory]);

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

  const toggleUpgradeSelection = (productId, upgradeIndex) => {
    setSelectedUpgrades((prev) => {
      const current = prev[productId] || [];
      if (current.includes(upgradeIndex)) {
        return {
          ...prev,
          [productId]: current.filter((idx) => idx !== upgradeIndex),
        };
      } else {
        return {
          ...prev,
          [productId]: [...current, upgradeIndex],
        };
      }
    });
  };

  const handleAddToCart = (card) => {
    const upgradesToAdd = selectedUpgrades[card.id] || [];

    if (upgradesToAdd.length === 0) {
      // No upgrades selected, add base product
      addToCart(card);
    } else {
      // Add separate item for each selected upgrade
      upgradesToAdd.forEach((upgradeIndex) => {
        const upgrade = card.series[upgradeIndex];
        const productWithUpgrade = {
          ...card,
          id: `${card.id}-upgrade-${upgradeIndex}`,
          selectedUpgrade: upgrade,
          price: card.price + upgrade.price,
        };
        addToCart(productWithUpgrade);
      });

      // Clear selections after adding to cart
      setSelectedUpgrades((prev) => ({
        ...prev,
        [card.id]: [],
      }));
    }
  };

  return (
    <div
      className={`w-full py-10 mt-[90px] m-auto ${
        theme === "dark"
          ? "border-gray-700 bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white"
          : "border-gray-200 bg-white text-gray-800 shadow-sm"
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
      <Carousel />

      {/* Title */}
      <h1 className="font-bold text-[3rem] text-center mt-6 font-serif">
        Laptop Accessories
      </h1>

      <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-6 px-4 w-full mt-10 mb-6">
        {/* Search bar */}
        <div className="max-w-lg w-full">
          <div ref={searchRef} className="relative">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
                showDropdown ? "rounded-b-none shadow-xl" : ""
              } ${
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200 hover:shadow-xl"
              }`}
            >
              <Search
                className={`w-4 h-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setShowDropdown(true)}
                placeholder="Search for accessories..."
                className={`flex-1 text-sm outline-none bg-transparent ${
                  theme === "dark"
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
                  className={`text-2xl hover:bg-gray-200 rounded-full p-1 transition-colors ${
                    theme === "dark"
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
                className={`absolute w-full z-50 rounded-3xl mt-3  shadow-2xl overflow-hidden ${
                  theme === "dark"
                    ? "bg-gray-800 border-t border-gray-700"
                    : "bg-white border-t border-gray-200"
                }`}
              >
                {filteredSuggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${
                      theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-16 h-16 object-contain rounded-lg bg-gray-100"
                    />
                    <div className="flex-1 text-left">
                      <h3
                        className={`font-semibold text-lg ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-indigo-600">
                          ${product.price}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            theme === "dark"
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

        {/* Brand Filter Dropdown */}
        <div ref={brandRef} className="relative w-full md:w-64">
          <button
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
            className={`w-full flex items-center justify-between gap-3 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700 hover:bg-gray-750"
                : "bg-white border border-gray-200 hover:shadow-xl"
            }`}
          >
            <span className="font-semibold">
              Brand: {selectedBrand}
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${showBrandDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showBrandDropdown && (
            <div
              className={`absolute w-full mt-2 rounded-lg shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto ${
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setShowBrandDropdown(false);
                  }}
                  className={`w-full px-6 py-3 text-left transition-colors ${
                    selectedBrand === brand
                      ? theme === "dark"
                        ? "bg-indigo-600 text-white"
                        : "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter Dropdown */}
        <div ref={categoryRef} className="relative w-full md:w-64">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className={`w-full flex items-center justify-between gap-3 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700 hover:bg-gray-750"
                : "bg-white border border-gray-200 hover:shadow-xl"
            }`}
          >
            <span className="font-semibold">
              Category: {selectedCategory}
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showCategoryDropdown && (
            <div
              className={`absolute w-full mt-2 rounded-lg shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto ${
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full px-6 py-3 text-left transition-colors ${
                    selectedCategory === category
                      ? theme === "dark"
                        ? "bg-green-600 text-white"
                        : "bg-green-500 text-white"
                      : theme === "dark"
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {currentProducts.length > 0 ? (
          currentProducts.map((card) => (
            <div
              key={card.id}
              className={`flex flex-col justify-between rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                theme === "dark"
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
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block w-fit ${
                    theme === "dark"
                      ? "bg-purple-900 text-purple-300"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {card.category}
                </span>
                
                <h1
                  className={`text-[1.5rem] font-bold ${
                    theme === "dark" ? "text-indigo-400" : "text-black"
                  }`}
                >
                  {card.title}
                </h1>
                {card.series && Array.isArray(card.series) && card.series.length > 0 ? (
                  <div className="mb-4 p-3 rounded-lg bg-gray-50/10 border border-gray-200/20">
                    <p className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Available Models:
                    </p>
                    <div className="space-y-2">
                      {card.series.map((model, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                            selectedUpgrades[card.id]?.includes(idx)
                              ? theme === "dark"
                                ? "bg-indigo-900/40 border border-indigo-500"
                                : "bg-indigo-100 border border-indigo-300"
                              : theme === "dark"
                              ? "hover:bg-gray-700/40"
                              : "hover:bg-gray-200/40"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedUpgrades[card.id]?.includes(idx) || false}
                            onChange={() => toggleUpgradeSelection(card.id, idx)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <div className="flex-1 text-xs">
                            <p className="font-semibold">{model.about}</p>
                          </div>
                          <span className="text-sm font-bold text-green-500">
                            +${model.price.toFixed(2)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <h5 className="font-semibold mb-3 leading-snug line-clamp-2">
                    {card.desc}
                  </h5>
                )}
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
                    className={`ml-3 text-xs font-semibold px-2.5 py-0.5 rounded ${
                      theme === "dark"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(card);
                      }}
                      className={`p-3 rounded-full transition-all duration-200 border-2 ${
                        theme === "dark"
                          ? "border-gray-700 hover:bg-gray-800 text-gray-300"
                          : "border-gray-200 hover:bg-gray-100 text-gray-600"
                      }`}
                      title={isInWishlist(card) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <FaHeart 
                        className={`text-xl transition-colors duration-300 ${
                          isInWishlist(card) ? "text-red-500" : ""
                        }`} 
                      />
                    </button>
                    <button
                      onClick={() => handleAddToCart(card)}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        theme === "dark"
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
            No accessories found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              currentPage === 1
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
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
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
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              currentPage === totalPages
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

export default Accessories;

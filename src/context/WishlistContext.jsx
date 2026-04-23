import { createContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Initialize state from localStorage if it exists
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [wishlistAlert, setWishlistAlert] = useState(null);

  // Save to localStorage whenever wishlistItems changes
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        // Remove from wishlist
        setWishlistAlert({ type: "removed", product: product.title });
        setTimeout(() => setWishlistAlert(null), 2000);
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        // Add to wishlist
        setWishlistAlert({ type: "added", product: product.title });
        setTimeout(() => setWishlistAlert(null), 2000);
        return [...prevItems, product];
      }
    });
  };

  const isInWishlist = (product) => {
    if (!product) return false;
    return wishlistItems.some((item) => item.id === product.id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistAlert }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;

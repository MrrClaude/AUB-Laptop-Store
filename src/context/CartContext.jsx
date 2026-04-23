import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage if it exists
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

// In your CartContext or wherever addToCart is defined
const addToCart = (product, quantityToAdd = 1) => {
  setCartItems((prevItems) => {
    const existing = prevItems.find((item) => item.id === product.id);

    if (existing) {
      // If product exists, always increase by quantityToAdd
      return prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    } else {
      // If first time, use quantityToAdd (can be modal quantity or 1)
      return [...prevItems, { ...product, quantity: quantityToAdd }];
    }
  });
};





  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

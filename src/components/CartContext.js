// CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // Item already exists, update quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Item doesn't exist, add it to the cart
      console.log("item added in context")
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setTotalPrice((prevTotalPrice) => prevTotalPrice + parseFloat(item.price));
  };

  const removeItemFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        // Decrease quantity if more than 1
        const updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex((item) => item.id === itemId);
        updatedCartItems[itemIndex].quantity -= 1;
        setCartItems(updatedCartItems);
      } else {
        // Remove the item if quantity is 1
        console.log("item removed from cart context")
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
      }

      setTotalPrice((prevTotalPrice) => prevTotalPrice - parseFloat(itemToRemove.price));
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, totalPrice, setCartItems, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

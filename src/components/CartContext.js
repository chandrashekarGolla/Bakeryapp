import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + parseFloat(item.price));
  };

  const removeItemFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        // If the item's quantity is greater than 1, decrease it
        const updatedCartItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
      } else {
        // If the item's quantity is 1, remove it from the cart
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
      }

      setTotalPrice((prevTotalPrice) => prevTotalPrice - parseFloat(itemToRemove.price));
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

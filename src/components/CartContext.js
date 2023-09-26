import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If the item already exists, update its quantity
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist, add it to the cart
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setTotalPrice((prevTotalPrice) => prevTotalPrice + parseFloat(item.price));
  };

  const removeItemFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        // If the item's quantity is greater than 1, decrease it
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
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

import { createContext, useContext, useEffect, useState } from 'react';
import {collection,onSnapshot,deleteDoc,addDoc,getDocs,query,where,} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { db } from './firebase.mjs';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useAuth(); 

  const cartItemsRef = user
    ? collection(db, 'usersCollection', user.uid, 'cartItems')
    : null;

  useEffect(() => {
    let unsubscribe;

    const fetchCartItems = async () => {
      if (user && cartItemsRef) {
        const cartItemsQuery = query(cartItemsRef);

        try {
          const querySnapshot = await getDocs(cartItemsQuery);
          const items = [];
          let totalPrice = 0;

          querySnapshot.forEach((doc) => {
            const item = doc.data();
            items.push({ id: doc.id, ...item });
            totalPrice += parseFloat(item.price);
          });

          setCartItems(items);
          setTotalPrice(totalPrice);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    if (user && cartItemsRef) {
      fetchCartItems(); // to fetch cart items when the user is authenticated

      unsubscribe = onSnapshot(cartItemsRef, () => {
        // to updte cart items
        fetchCartItems();
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, cartItemsRef]);

  const addItemToCart = async (item) => {
    try {
      if (user && cartItemsRef) {
        await addDoc(cartItemsRef, item);
      }
    } catch (error) {
      console.error('Error adding cart item:', error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      if (user && cartItemsRef) {
        const queryCartItem = query(cartItemsRef, where('id', '==', itemId));
        const querySnapshot = await getDocs(queryCartItem);

        if (!querySnapshot.empty) {
          const docToRemove = querySnapshot.docs[0];
          await deleteDoc(docToRemove.ref);
        }
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };
  const clearCart = async () => {
    try {
      if (user && cartItemsRef) {
        // To delete all documents from the cart collection
        const querySnapshot = await getDocs(cartItemsRef);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart,clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

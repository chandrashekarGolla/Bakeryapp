import { useState, useEffect } from 'react';
import './CartItems.css';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function CartItems() {
  const { user } = useAuth();
  const { cartItems, removeItemFromCart, totalPrice } = useCart(); // Use values from the context

  useEffect(() => {
    if (user) {
      const cartItemsRef = collection(db, 'usersCollection', user.uid, 'cartItems');
      const unsubscribe = onSnapshot(cartItemsRef, (snapshot) => {
        let items = [];
        let total = 0;

        snapshot.forEach((doc) => {
          const item = doc.data();
          items.push({ id: doc.id, ...item });
          total += parseFloat(item.price);
        });

        // You don't need to setCartItems and setTotalPrice here anymore
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleDeleteItem = async (itemId) => {
    try {
      // Call the removeItemFromCart function from the CartContext
      removeItemFromCart(itemId);
      // ... Other code for Firebase deletion if needed ...
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  return (
    <div className='cart-container mt-5'>
      <h3 className='text-center'>Cart Items</h3>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <div key={item.id} className='items'>
            <img src={item.image} alt='not available' style={{ width: '50px' }} />
            <p>{item.name}</p>
            <p className='fs-6'>
              Cost: <FaRupeeSign size={15} />
              {item.price}
            </p>
            <button className='btn btn-danger ' onClick={() => handleDeleteItem(item.id)}>
              <MdRemoveShoppingCart /> Remove
            </button>
          </div>
        ))}
      </div>
      <div className='total-price'>
        <p>
          Total Price: <FaRupeeSign size={15} />
          {totalPrice}
        </p>
        <button className='btn btn-primary'>Buy Now</button>
      </div>
    </div>
  );
}

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import './Placeorder.css'
export default function PlaceOrder() {
  const { cartItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/place-order', {
        userId: user.uid, // Assuming user object contains user ID after authentication
        items: cartItems,
        totalPrice: totalPrice,
        name: formData.name,
        email: formData.email,
        address: formData.address,
      });
     console.log("sent email")
      console.log(response.data.message); // Success message from the server

      // Redirect to a thank you page or home page after placing the order
      // history.push('/thank-you');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="place-order-container mt-5">
       <h3 className="text-center">Place Your Order</h3>
      {cartItems.map((item) => (
        <div key={item.id} className="order-item">
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Delivery Date: {item.deliveryDate}</p>
        </div>
      ))}
      <p className="total-price">Total Price: ${totalPrice}</p>

      {!isPlacingOrder && (
         <button type="button" className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
         Place Order
       </button>
      )}

      {isPlacingOrder && (
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea className="form-control" name="address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required></textarea>
          </div>

          <button type="button" className="btn btn-primary confirm-order-btn" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
}

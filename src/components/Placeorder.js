import React, { useState} from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Placeorder.css'
export default function PlaceOrder() {
  const { cartItems, totalPrice,clearCart } = useCart();
  const { user } = useAuth();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    address: '',
  });

  

  const loadScript = (src) => {

    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src

      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(true)
      }

      document.body.appendChild(script)

    })

  }
  const displayRazorpay = async (amount) => {
    


    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('you are offline... failed to load Razorpay SDK')
      return
    }

    const options = {
      key: 'rzp_test_hg3pqAnopQivqF',
      currency: 'INR',
      amount: amount * 100,
      name: "Chandu",
      description: "Thanks for purchasing",
      //  image: {img},

      handler: function (response) {
        alert(response.razorpay_payment_id)
        alert("payment is successfull")
      },

      prefill: {
        name: "Chandu"
      }
      //if(response.razorpay_payment_id)
    };
    const paymentObj = new window.Razorpay(options)
    paymentObj.open()

  }

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    displayRazorpay(totalPrice + totalPrice * 0.02);
  };

  const handleConfirmOrder = async (paymentId) => {

    let errors = {};

    if (!formData.name) {
      errors.name = '*Please enter your name.*';
    }

    if (!formData.email) {
      errors.email = '*Please enter your email*';
    }

    if (!formData.address) {
      errors.address = '*Please enter valid address*';
    }
    if (errors.name || errors.email || errors.address) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/place-order', {
        userId: user.uid, 
        items: cartItems,
        totalPrice: totalPrice,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        paymentId: paymentId,
      });
     console.log("email sent")
     toast.success('Order placed successfully');
     clearCart();
     setIsPlacingOrder(false);
     navigate('/');
     
      console.log(response.data.message); 
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  return (
    <div className="place-order-container mt-5">
      <Toaster toastOptions={{ duration: 3000 }} />
       <h3 className="text-center">Your Items</h3>
      {cartItems.map((item) => (
        <div key={item.id} className="order-item">
          <p>{item.name}</p>
          <p>Price:Rs {item.price}</p>
          <p>Delivery Date: {item.deliveryDate}</p>
        </div>
      ))}
      <p>Additional Charges:Rs{totalPrice*0.02}</p>
      <p className="total-price">Total Price:Rs {totalPrice+totalPrice*0.02}</p>

      {!isPlacingOrder && (
         <button type="button" className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
         Place Order
       </button>
      )}

      {isPlacingOrder && (
        <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          ></textarea>
          {formErrors.address && <div className="text-danger">{formErrors.address}</div>}
        </div>

        <button type="button" className="btn btn-primary confirm-order-btn" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </form>
      )}
    </div>
  );
}

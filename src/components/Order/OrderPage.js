
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Order/OrderPage.css'
const OrderPage = () => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const { price } = useParams();
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  
  console.log(price)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Address before submitting:', address);

    try {
      const response = await axios.post('http://localhost:4500/calculate-distance', { address });
      console.log('Response:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error calculating distance:', error);
      setMessage('Error calculating distance. Please try again later.');
    }
  };
  const loadScript =(src) =>{

    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src

        script.onload =() =>
        {
            resolve(true)
        }
        
        script.onerror =()=>{
            resolve(true)
        }

        document.body.appendChild(script)

    })

}
const displayRazorpay = async (amount) => {

    const res =  await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res){
        alert('you are offline... failed to load Razorpay SDK')
        return
    }

    const options = {
         key: PROCESS.ENV.RAZORPAY_KEY,
         currency: 'INR',
         amount: amount * 100 ,
         name: "koushik",
         description: "Thanks for purchasing",
        //  image: {img},

         handler: function(response){
            alert(response.razorpay_payment_id)
            alert("payment is successfull")
         },

        prefill: {
            name: "koushik" 
        }
         //if(response.razorpay_payment_id)
    };
    const paymentObj = new window.Razorpay(options)
    paymentObj.open()

}
  return (
    <div className='order-container'>
    <h1>Order Page</h1>
    <form onSubmit={handleSubmit} className='order-form'>
      <label htmlFor='address'>Enter your delivery address:</label>
      <input type='text' id='address' value={address} onChange={handleAddressChange} />
      <div className='button-container'>
        <button className='btn buy-btn' onClick={() => displayRazorpay(price)}>
          Buy Now
        </button>
        <button type='submit' className='check-address-btn'>
          Check Address
        </button>
      </div>
    </form>
    {message && <p>{message}</p>}
  </div>
  );
};

export default OrderPage;

import './CartItems.css';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import { useCart } from '../CartContext';

export default function CartItems() {
  const { cartItems,totalPrice, removeItemFromCart } = useCart(); // Use values from the context

 

  const handleDeleteItem = async (itemId) => {
    try {
      // Call the removeItemFromCart function from the CartContext
      console.log("item deleted")
      removeItemFromCart(itemId);
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

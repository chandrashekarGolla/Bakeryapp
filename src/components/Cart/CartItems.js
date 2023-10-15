import './CartItems.css';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import cartImg from '../Images/emptycart.png'
export default function CartItems() {
  const { cartItems, totalPrice, removeItemFromCart } = useCart(); // Use values from the context

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
      {cartItems.length === 0 ? (
        <div className='empty-cart '>
          <img src={cartImg} alt='Empty Cart' />
          <p className='fs-4'>Your cart is empty.</p>
        </div>
      ) : (
        <>
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
            <Link to='/Placeorder'>
              <button className='btn btn-primary'>Buy Now</button>
            </Link>
          </div>
        </>
      )
      }
    </div>
  );
}

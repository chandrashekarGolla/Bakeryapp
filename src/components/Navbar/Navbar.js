import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link,NavLink } from 'react-router-dom';
import {HiMenu} from 'react-icons/hi'
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { toast, Toaster } from 'react-hot-toast';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <div className='navbar-container'>
      <nav>
      <Toaster toastOptions={{ duration: 3000 }} />
        <>
        <Link to="/" className="title">
          Sudhas Bakers
        </Link>
        <h6 className=''>Welcome to Sudha Bakers <br></br>
          From our Oven to your door
        </h6>
        </>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
         <NavLink><HiMenu size={25}/></NavLink>
        </div>
        <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to="/" ><AiFillHome/>Home</NavLink></li>
        {isLoggedIn ? (
              <>
                <li className="cart-icon">
                  <Link to="/cartItems">
                    <div className="cart-icon-container">
                      <HiOutlineShoppingCart size={25} />
                      {cartItems.length >= 0 && (
                        <span className="cart-count">
                          {cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li className="cart-icon">
                  <Link onClick={() => toast.error('Please Login to use Cart')}>
                    <div className="cart-icon-container">
                      <HiOutlineShoppingCart size={25} />
                      {cartItems.length >= 0 && (
                        <span className="cart-count">
                          {cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              </>
            )}
            </ul>
      </nav>
      </div>
    
  );
};

export default Navbar;


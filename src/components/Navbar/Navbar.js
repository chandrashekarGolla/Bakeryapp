import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.jpeg';
import { FaBars } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext'; // Import the useCart hook
import { toast, Toaster } from 'react-hot-toast';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart(); // Use cartItems from the CartContext

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
    <header>
      <Toaster toastOptions={{ duration: 3000 }} />
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="logo m-0" />
        </Link>
      </div>
      <input type="checkbox" id="menu-bar"></input>
      <label htmlFor="menu-bar">
        <FaBars size={20} />
      </label>
      <h6 className="">
        Welcome to Sudha Bakers <br></br> From our Oven to your door
      </h6>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">
                <AiFillHome size={20} /> <span>Home</span>
              </Link>
            </li>
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
    </header>
  );
};

export default Navbar;


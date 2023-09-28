import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.jpeg'
import { FaBars } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai"
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection,  onSnapshot } from 'firebase/firestore';
import { toast, Toaster } from "react-hot-toast";
const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   fetch('http://localhost:4500/get-cartItems')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Calculate the cart items count from the data
  //       const count = data.length;
  //       setCartItemsCount(count);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching cart items:', error);
  //     });
  // }, []);

  const { user, logout } = useAuth();

  function notLoggined() {
    toast.error("Please Login to use Cart")
  }
  console.log(user)

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      const cartItemsRef = collection(db, 'usersCollection', user.uid, 'cartItems');
      const unsubscribe = onSnapshot(cartItemsRef, (snapshot) => {
        let totalCount = 0;
        snapshot.forEach((doc) => {
          totalCount += doc.data().quantity;
        });
        setCartItemsCount(totalCount);
      });

      return () => unsubscribe();
    } else {

      setIsLoggedIn(false);
      setCartItemsCount(0);
    }
  }, [ user]);


  const handleLogout = () => {

    logout();
  };

  return (
    <header>
      <Toaster toastOptions={{ duration: 3000 }} />
      <div>
        <Link to="/" ><img src={logo} alt="logo" className='logo m-0'></img></Link>
      </div>
      <input type="checkbox" id="menu-bar"></input>
      <label htmlFor="menu-bar"><FaBars size={20} /></label>
      <h6 className=''>Welcome to Sudha Bakers <br></br>
        From our Oven to your door
      </h6>
      <div>
        <nav className='navbar'>
          <ul>
            <li><Link to='/'><AiFillHome size={20} /> <span>Home</span></Link></li>
            {isLoggedIn ? (
              <>
                <li className="cart-icon">
                  <Link to='/cartItems'>
                    <div className="cart-icon-container">
                      <HiOutlineShoppingCart size={25} />
                      {cartItemsCount >= 0 && <span className="cart-count">{cartItemsCount}</span>}
                    </div>
                  </Link>
                </li>
                <li><Link to="/profile" >Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={handleLogout}>Login</Link></li>
                <li className="cart-icon">
                  <Link onClick={notLoggined}>
                    <div className="cart-icon-container">
                      <HiOutlineShoppingCart size={25} />
                      {cartItemsCount >= 0 && <span className="cart-count">{cartItemsCount}</span>}
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



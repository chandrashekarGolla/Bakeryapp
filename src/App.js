import './App.css';
import RootLayout from './components/RootLayout/RootLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Price from './components/Price/Price';
import Home from './components/Home';
import CartItems from './components/Cart/CartItems';
import OrderPage from './components/Order/OrderPage';
import CategoryItems from './components/CategoryItems/CategoryItems';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import PlaceOrder from './components/Placeorder';

// import Signup from './components/UserSignup/Signup'
// import Signin from './components/UserSignin/Signin'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            {/*These routes for user signin signup using email */}
            {/* <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} /> */}
            <Route path="/login" element={<Login/>} />
            <Route path="/cartItems" element={<CartItems />} />
            <Route path="price/:id" element={<Price />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/Placeorder" element={<PlaceOrder />} />
            <Route path="/categoryItems/:categoryType" element={<CategoryItems />} /> 
            <Route path="/:categoryType" component={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


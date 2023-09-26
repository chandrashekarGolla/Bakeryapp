import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { HiOutlineShoppingCart, HiPlus, HiMinus } from "react-icons/hi";
import Cake from '../Images/cake.jpeg'
import { toast, Toaster } from "react-hot-toast";
import "./Price.css";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import { collection, doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
export default function Price() {

  const [eggless, setEggless] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [itemadded, setItemStatus] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const image = searchParams.get("image");
  const price = searchParams.get("price");
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const initialWeight = getInitialWeight();
  const [weight, setWeight] = useState(initialWeight);
  let [totalPrice, setTotalPrice] = useState(price);

  const { user } = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(image);

  // const addToCart = async () => {
  //   if (!user) {
  //     // Redirecting to the login page if the user is not logged in
  //     navigate("/login");
  //     return;
  //   }
  //   if (!deliveryDate) {
  //     toast.error("Please choose a delivery date.");
  //     return;
  //   }

  //   if (type !== "Cupcake" && weight === 0) {
  //     toast.error("Please select the weight.");
  //     return;
  //   }
  //   const itemid = Math.floor(Math.random() * 100);
  //   console.log(itemid);
    
  //   try {
  //     const cartRef = doc(db, 'usersCollection', user.uid, 'cartItems', itemid.toString());
  //     const itemDoc = await getDoc(cartRef);
  //     const itemExists = itemDoc.exists();

  //     if (itemExists) {
  //       const existingItem = itemDoc.data();
  //       const newQuantity = existingItem.quantity + 1;
  //       await updateDoc(cartRef, { quantity: newQuantity });
  //     } else {
  //       await setDoc(cartRef, {
  //         image,
  //         price,
  //         name,
  //         quantity: 1,
  //       });
  //     }

  //     setItemStatus(true);
  //     toast.success('Item added to cart');
  //     console.log('Item added to cart');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const addToCart = async () => {
    if (!user) {
      // Redirecting to the login page if the user is not logged in
      navigate("/login");
      return;
    }
    if (!deliveryDate) {
      toast.error("Please choose a delivery date.");
      return;
    }

    if (type !== "Cupcake" && weight === 0) {
      toast.error("Please select the weight.");
      return;
    }
    
    try {
      // Create an item object with the item details
      const item = {
        id: Math.floor(Math.random() * 100).toString(),
        image,
        price,
        name,
        quantity: 1,
      };
      
      console.log(item)
      // Call the addItemToCart function from the CartContext
      addItemToCart(item);


      // Display a success message or provide feedback to the user
      toast.success('Item added to cart');
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   if (user) {
  //     const cartRef = collection(db, 'usersCollection', user.uid, 'cartItems');
  //     const unsubscribe = onSnapshot(cartRef, (snapshot) => {
  //       let totalCount = 0;
  //       snapshot.forEach((doc) => {
  //         totalCount += doc.data().quantity;
  //       });
  //       setCartItemsCount(totalCount);
  //     });

  //     return () => unsubscribe();
  //   }
  // }, [user]);


  //to display side images for main image
  const additionalImages = [
    Cake,
    Cake

  ];

  const handleImageClick = (src) => {
    setMainImage(src);
  };
    if (!image || !price || !name || !type) {
    return <div>No price information available.</div>;
  }

  function getInitialWeight() {
    switch (type) {
      case "Chocolate":
        return 250;
      case "Biscuit":
        return 250;
      case "Cake":
        return 500;
      case "Icecream":
        return 500;
      case "Pastry":
        return 500;
      case "Cupcake":
        return 4;
      default:
        return 0;
    }
  }
  const handleWeightIncrement = () => {
    let newWeight = weight;

    if (newWeight <= initialWeight)
      newWeight = initialWeight
    if (type === "Cupcake") {
      if (newWeight < 4)
        newWeight = 4;
      else
        newWeight += 2;
    }
    else {
      newWeight += 250
    }
    setWeight(newWeight);
    setTotalPrice(calculateTotalPrice(price, newWeight, eggless));
  };

  const handleWeightDecrement = () => {
    let newWeight = weight;
    if (newWeight <= initialWeight)
      newWeight = initialWeight
    else if (type === "Cupcake") {
      if (newWeight === 4)
        newWeight = 4;
      else
        newWeight -= 2;
    }
    else {
      newWeight -= 250;
    }
    setWeight(newWeight);
    setTotalPrice(calculateTotalPrice(price, newWeight, eggless));
  };

  const handleEgglessChange = (event) => {
    setEggless(event.target.checked);
    setTotalPrice(calculateTotalPrice(price, weight, event.target.checked));
  };

  const handleDeliveryDateChange = (event) => {
    setDeliveryDate(event.target.value);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  let minDeliveryDate = new Date();


  if (type === "Pastry") {
    if (weight <= 1000)
      minDeliveryDate.setDate(minDeliveryDate.getDate());
    else {
      minDeliveryDate.setDate(minDeliveryDate.getDate() + 1);
    }
  } else {
    minDeliveryDate.setDate(minDeliveryDate.getDate());
  }

  const calculateTotalPrice = (price, weight, eggless = false) => {
    if (type === 'Cupcake') {
      var temp= (price) * (weight);
      totalPrice =temp;
    }
    else {
      var temp = Math.ceil((price) * (weight) / initialWeight);
      totalPrice=temp;
    }
    if (eggless) {
      if (type === 'Cupcake') {
        totalPrice += 10
      };
      if (type === 'Biscuit')
        totalPrice += 50
      if (type === 'Pastry')
        totalPrice += 100;
      if (type === 'Cake' && name === 'Brownies')
        totalPrice += 25
      else if (type === 'Cake' && (name === 'Blueberry Cheese Cake'  || name === 'Plum Cake(No alcohol)')) {
        totalPrice += 100
      }
      

    }
    return totalPrice;
  };
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
    if (!deliveryDate) {
      toast.error("Please choose a delivery date.");
      return;
    }

    if (type !== "Cupcake" && weight === 0) {
      toast.error("Please select the weight.");
      return;
    }


    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('you are offline... failed to load Razorpay SDK')
      return
    }

    const options = {
      key: 'rzp_test_hg3pqAnopQivqF',
      currency: 'INR',
      amount: amount * 100,
      name: "koushik",
      description: "Thanks for purchasing",
      //  image: {img},

      handler: function (response) {
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

  const handleOrderClick = () => {
    navigate(`/orderpage?price=${price}`);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">

            <div className="col-sm-6 col-md-5 col-lg-5 p-3 mt-3 d-flex">
              <Toaster toastOptions={{ duration: 3000 }} />
              <div className="additional-images">
                {additionalImages.map((image, index) => (
                  <img key={index} className="additional-image" src={image} alt={`Additional Image ${index + 1}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
              <div>
                <img
                  src={mainImage} alt="not available" className="main-image  p-2 w-100"
                  style={{
                    width: "300px", height: "300px", objectFit: "contain", borderRadius: "10px"
                  }}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-7 col-lg-7">
              <h5 className="fs-2 p-2">{name}</h5>
              {(type === "Chocolate")||(type === "Icecream") && (
                <div>
                  <p className="fs-6 fw-bold p-2">Select Weight</p>
                  <div className="weight-control ">
                    <button className="weight-btn " onClick={handleWeightDecrement}>
                      <HiMinus />
                    </button>
                    <span className="weight-border">{weight}g</span>
                    <button className="weight-btn" onClick={handleWeightIncrement}>
                      <HiPlus />
                    </button>
                  </div>
                </div>
              )}
              {((type === "Cake")||(type==='Pastry')||(type==='Cupcake') ||(type === "Biscuit" && name === "Chocolate Cookie")) && (
                <div>
                  <p className="fs-6 fw-bold p-2">Select Weight</p>
                  <div className="weight-control p-2">
                    <button className="weight-btn" onClick={handleWeightDecrement}>
                      <HiMinus />
                    </button>
                    <span className="weight-border">{weight}g</span>
                    <button className="weight-btn" onClick={handleWeightIncrement}>
                      <HiPlus />
                    </button>

                  </div>
                  <div className="p-2">
                    <input
                      type="checkbox"
                      id="eggless"
                      checked={eggless}
                      onChange={handleEgglessChange}
                    />
                    <label htmlFor="eggless">Eggless</label>
                  </div>
                </div>

              )}
              
              <div className="delivery p-2">
                <p className="fs-6 fw-bold">Select Delivery Date</p>
                <input
                  type="date"
                  min={formatDate(minDeliveryDate)}
                  value={deliveryDate}
                  onChange={handleDeliveryDateChange}
                />
                {deliveryDate && new Date(deliveryDate) < minDeliveryDate && (
                  <p className="text-danger">*Please choose a delivery date after {formatDate(minDeliveryDate)}.</p>
                )}
              </div>
              <div>
                <h4 className="fs-5 fw-semibold p-2">
                  Total Price: <FaRupeeSign size={15} />{totalPrice}
                </h4>
              </div>
              <div className="bottom-btn p-2">
                <button className="btn cart-btn" onClick={addToCart}>
                  <HiOutlineShoppingCart /> Add to Cart
                </button>
                <button className="buy-btn" onClick={() => displayRazorpay(price)} >Buy Now</button>
                {/* <Link to='/orderpage'><button className="btn buy-btn " onClick={handleOrderClick }>Buy Now</button></Link> */}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

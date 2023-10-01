import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  
  //this works even if user name is not same
  // const handleInitialSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validatePhoneNumber(mobile)) {
  //     toast.error('Invalid phone number. Please enter a valid Indian mobile number.');
  //     return;
  //   }

  //   if (name.trim() === '') {
  //     toast.error('Name cannot be empty.');
  //     return;
  //   }

  //   const usersCollectionRef = collection(db, 'usersCollection');
  //   const q = query(usersCollectionRef, where('phoneNumber', '==', mobile));
  //   const querySnapshot = await getDocs(q);

  //   if (querySnapshot.empty) {
  //     // Mobile number doesn't exist, create a new user document
  //     try {
  //       const docRef = await addDoc(usersCollectionRef, {
  //         name: name,
  //         phoneNumber: mobile,
  //       });
  //       console.log('New user added to usersCollection with ID: ', docRef.id);
  //     } catch (error) {
  //       console.error('Error adding user: ', error);
  //       toast.error('Error creating a new user. Please try again later.');
  //       return;
  //     }
  //   }

  //   // Continue with sending OTP
  //   configureCaptcha();
  // };
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
  
    if (!validatePhoneNumber(mobile)) {
      toast.error('Invalid phone number. Please enter a valid Indian mobile number.');
      return;
    }
  
    if (name.trim() === '') {
      toast.error('Name cannot be empty.');
      return;
    }
  
    const usersCollectionRef = collection(db, 'usersCollection');
    const q = query(usersCollectionRef, where('phoneNumber', '==', mobile));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // Mobile number exists, check if the username matches
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
  
      if (userData.name === name) {
        // Username matches, continue with sending OTP
        configureCaptcha();
      } else {
        toast.error('Invalid username. Please enter the correct username.');
      }
    } else {
      // Mobile number doesn't exist, create a new user document
      try {
        const docRef = await addDoc(usersCollectionRef, {
          name: name,
          phoneNumber: mobile,
        });
        console.log('New user added to usersCollection with ID: ', docRef.id);
  
        // Continue with sending OTP
        configureCaptcha();
      } catch (error) {
        console.error('Error adding user: ', error);
        toast.error('Error creating a new user. Please try again later.');
      }
    }
  };
  
  const configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log('Recaptcha verified');
        sendOTP();
      },
      defaultCountry: 'IN',
    });

    const phoneNumber = '+91' + mobile;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        console.log('OTP has been sent');
        toast.success('Please check your mobile for OTP');
        setShowOtp(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to send OTP. Please try again later.');
      });
  };

  const sendOTP = () => {
    // This function should be called within the reCAPTCHA callback
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const code = otp;
    if (confirmationResult) {
      try {
        await confirmationResult.confirm(code);
        // User signed in successfully.
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // User is successfully authenticated; you can add them to the usersCollection.
          try {
            const usersCollectionRef = collection(db, 'usersCollection');
            const q = query(usersCollectionRef, where('phoneNumber', '==', mobile));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
              await addDoc(usersCollectionRef, {
                name: name,
                phoneNumber: user.phoneNumber,
              });
              console.log('User added to usersCollection');
            }
          } catch (error) {
            console.error('Error adding user to usersCollection: ', error);
          }

          toast.success('You have logged in successfully');
          navigate('/');
        } else {
          toast.error('User authentication failed. Please re-login and try again.');
        }
      } catch (error) {
        console.error(error);
        toast.error('OTP Timeout. Please re-login and try again.');
      }
    }
  };

  return (
    <div className='login-page'> 
      <div className="login-container mt-5">
      <Toaster toastOptions={{ duration: 3000 }} />
      {showOtp ? (
        <>
          <div className="otp-form mt-5">
            <h2>Enter OTP</h2>
            <form onSubmit={onSubmitOTP}>
              <input type="number" name="otp" placeholder="OTP Number" required value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button className="btn btn-success mx-auto" type="submit">
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h2 className='text-center'>Login</h2>
          <form className="login-form" onSubmit={handleInitialSubmit}>
            <div id="sign-in-button"></div>
            <input type="text" name="name" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <input
              type="number"
              name="mobile"
              placeholder="Mobile number"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
    </div>
    
  );
};

export default Login;

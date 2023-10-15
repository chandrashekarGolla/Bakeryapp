import React, { useState } from 'react';
import './Contactus.css';
import {BsFillChatDotsFill} from 'react-icons/bs'
const Contactus = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className={`Contactus ${showContactInfo ? 'active' : ''}`}>
      <div className="chat-icon" onClick={handleContactClick}>
        <span><BsFillChatDotsFill/></span>
      </div>
      <div className="popup">
        <p>Reach out to us for Custom cakes and more:</p>
        <p>Phone: 9908109122</p>
      </div>
    </div>
  );
};

export default Contactus;

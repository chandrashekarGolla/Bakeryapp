// import React from 'react';
// import './Footer.css';

// function Footer() {
//   return (
//     <div className='footer'>
//       <div className='left-section'>
//         <h2>Sudhas Bakers</h2>
//       </div>
//       <div className='middle-section'>
//         <ul className='list-unstyled'>
//           <li>About Us</li>
//           <li>Contact Us</li>
//         </ul>
import React from 'react';
import './Footer.css';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer-container'>
            <footer className="footer ">
            <div className="left-content">
                <div className="logo">Sudhas Bakers</div>
            </div>
            <div className="center-content">
                <div className="address">
                    <div>Flat No T-3, Sai Manasa Residency,</div>
                    <div>Anand Rao Nagar, Old Alwal,</div>
                    <div>Secunderabad, Telangana 500010</div>
                </div>
            </div>
            <div className="right-content">
                <div>
                <a href="https://www.instagram.com/sudhas_bakers" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="icon" />sudhas_bakers
                </a>
                </div>
                <div>
                <a href="mailto:sudhasbakers@gmail.com">
                    <FaEnvelope className="icon" />
                    sudhasbakers@gmail.com
                </a>
                </div>
            </div>
        </footer>
        </div>
        
    );
}

export default Footer;

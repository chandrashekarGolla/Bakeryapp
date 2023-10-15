import React from 'react';
import './Footer.css';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import instalogo from '../Images/instalogo.jpeg'
const Footer = () => {
    return (
        <div className='footer-container mt-3'>
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
                    <a href="https://www.instagram.com/sudhas_bakers" target="_blank" rel="noopener noreferrer">
                        <img src={instalogo} alt="" style={{ width: '20px' }} />
                        <span className='p-2'>sudhas_bakers</span>
                    </a>
                    <br />
                    <a href="mailto:sudhasbakers@gmail.com">
                        <FaEnvelope className="icon" />
                        sudhasbakers@gmail.com
                    </a>

                </div>
            </footer>
        </div>

    );
}

export default Footer;

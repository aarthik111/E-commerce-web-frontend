import React from 'react'
import './Footer.css'
import footer_logo from '../Asserts/logo_big.png'
import instagram_icon from '../Asserts/instagram_icon.png'
import pintester_icon from '../Asserts/pintester_icon.png'
import whatsapp_icon from '../Asserts/whatsapp_icon.png'
export const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt="" />
            <p>UpTrend</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-social-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-social-container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-social-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2025 - All Rights Reserved</p>

        </div>
    </div>
  )
}
export default Footer

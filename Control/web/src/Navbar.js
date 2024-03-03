import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from './EcoSentryLogo.png'; 


function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/account">My Account</Link></li>
        <li><Link to="/your-sentry">My sentries</Link></li>
        <li><img src={logo} alt="logo" class="center" height={60} width={60} style={{ alignSelf: 'center'}}/> </li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from './logo192.png';         //logo192 is only placeholder

// import styled from 'styled-components';

// const Nav = styled.nav`
//   background-color: #333;
//   padding: 10px;
// `;

// const Ul = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const Li = styled.li`
//   display: inline;
//   margin-right: 20px;
// `;

// const A = styled.a`
//   text-decoration: none;
//   color: white;
// `;

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><img src={logo} alt="logo" class="center" height={60} width={60} style={{ alignSelf: 'center'}}/> </li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/products_and_services">Products & Services</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

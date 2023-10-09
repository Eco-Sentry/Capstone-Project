import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li> {/* Add this link */}
      </ul>
    </nav>
  );
}

export default Navbar;

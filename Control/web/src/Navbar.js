import React from 'react';
import './Navbar.css';

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
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

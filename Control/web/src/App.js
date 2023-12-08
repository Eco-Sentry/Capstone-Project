import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './style.css';
import Navbar from './Navbar';
import Login from './login';
import Contact from './contact';
import Home from './home';
import About from './about';
import Dashboard from './dashboard';
import Account from './account';
import ProductsAndServices from './products_and_services';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products_and_services" element={<ProductsAndServices />} />
            <Route path="/login" element={<Login />} />
            <Route path="/"/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

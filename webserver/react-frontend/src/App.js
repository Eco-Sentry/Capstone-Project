import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import './App.css';
import Navbar from './Navbar';
import Login from './login';
import Contact from './contact';
import Home from './home';
import YourSentry from './your-sentry';
import Account from './account';
import Dashboard from './dashboard';
Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/your-sentry" element={<YourSentry />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

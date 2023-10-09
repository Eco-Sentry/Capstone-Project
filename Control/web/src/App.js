import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Login from './login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/"/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

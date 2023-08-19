const React = require('react'); (1)
const ReactDOM = require('react-dom'); (2)
const client = require('./client'); (3)


import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';

ReactDOM.render(
  <React.StrictMode>
    <HomePage /> {/* this is rendering the main content of the home page made*/}
  </React.StrictMode>,
  document.getElementById('react')
);


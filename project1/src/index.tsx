import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'react-router-dom';
import history from './history'


ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  
    
  
  document.getElementById('root')
);


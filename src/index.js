import React from 'react';
import ReactDOM from 'react-dom/client';  
import 'bootstrap/dist/css/bootstrap.min.css';
  import Routing from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>
);


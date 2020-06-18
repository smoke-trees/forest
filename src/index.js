import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Navbar from './components/navbar/navbar'
import './global.css'

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();

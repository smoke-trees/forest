import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './global.css'

ReactDOM.render(
  <React.StrictMode>
    <div className='render'>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();

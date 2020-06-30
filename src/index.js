import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './global.css'
import AppRouter from "./router";

ReactDOM.render(
    <AppRouter/>,
    document.getElementById('root')
);
serviceWorker.unregister();

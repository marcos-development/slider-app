import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../public/favicon.ico';
import '@babel/polyfill';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
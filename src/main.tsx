import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const container = document.getElementById('app');
if (!container) {
    throw new Error('Root container element with id \'app\' not found');
}

createRoot(container).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);



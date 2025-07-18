
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';

import {notification} from "antd";
notification.config({ placement: 'topRight', duration: 5 });

const root = createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);


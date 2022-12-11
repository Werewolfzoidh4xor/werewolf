import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import {LicenseInfo} from '@mui/x-data-grid-premium';

LicenseInfo.setLicenseKey(
    '86b172167c1764d3aebc044ff2e4081fTz11bmRlZmluZWQsRT00NDc2NjQzMjAwMDAwLFM9cHJlbWl1bSxMTT1wZXJwZXR1YWwsS1Y9Mg==',
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();

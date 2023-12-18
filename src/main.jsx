import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'

import './index.css'

const baseDomain = import.meta.env.VITE_AUTH_DOMAIN_BASE;
const clientId = import.meta.env.VITE_AUTH_CLIENTID;
const appBaseUrl = import.meta.env.VITE_APP_BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={baseDomain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: appBaseUrl,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

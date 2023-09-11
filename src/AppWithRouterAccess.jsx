import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from '@okta/okta-auth-js';
import Header from "./Header";
import LoginForm from "./LoginForm";
import Home from "./Home";
import App from "./App";

const baseDomain = import.meta.env.VITE_OKTA_URL_BASE;
const issuer = "https://" + baseDomain + "/oauth2/default";
const clientId = import.meta.env.VITE_OKTA_CLIENTID;
const redirect = import.meta.env.VITE_OKTA_APP_BASE_URL + "/login/callback";
console.log( "baseDomain", baseDomain );
console.log( "issuer", issuer);
console.log( "clientId", clientId );
console.log( "redirect", redirect );

// Create instance of OktaAuth
const oktaAuth = new OktaAuth({
  clientId: clientId,
  issuer: issuer,
  redirectUri: window.location.origin + '/login/callback',
  pkce: true,
  disableHttpsCheck: true,
});

const AppWithRouterAccess = () => {
  const history = useHistory();

  const onAuthRequired = () => {
    console.log( "onAuthRequired")
    history.push( "/login" );
  };

  // Define a function to handle restoring the original URI
  const restoreOriginalUri = async (oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin)); // Use history to redirect to the original URI
  };



  return (
    <Security 
      oktaAuth={oktaAuth}
      redirectUri={redirect}
      restoreOriginalUri={restoreOriginalUri}
      onAuthRequired={onAuthRequired}
      pkce={true} >
      <Header />
      <Route path='/' exact={true} component={Home} />
      <SecureRoute path='/Gardens' component={App} />
      <Route path='/login' render={() => <LoginForm baseUrl={baseDomain} issuer={issuer} />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;
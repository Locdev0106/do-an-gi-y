import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; 
import { BrowserRouter } from "react-router-dom";
import App from "./App";  // Import App.js
import { GoogleOAuthProvider } from '@react-oauth/google';  

import {store, persistor } from "./redux/store.js";


const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

ReactDOM.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>  
    <Provider store={store}>  
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

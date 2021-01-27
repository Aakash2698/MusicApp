import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Provider } from "react-redux";
// import store from "./Store/Store";
import store from "./configStore";
import SetAuthToken from "./Utils/SetAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./Actions/index";

let auth_token = localStorage.getItem("jwtToken");
if (auth_token) {
  SetAuthToken(auth_token);
  const decoded = jwt_decode(auth_token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log("loglogggg");
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,

  document.getElementById("root")
);

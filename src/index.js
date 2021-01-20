import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Provider } from "react-redux";
// import store from "./Store/Store";
import store from "./configStore";
import SetAuthToken from "./Utils/SetAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./Actions/index";
import global from "./global";
import FullPageLoader from "./Components/ReusableComponents/FullPageLoader";

let auth_token = localStorage.getItem("jwtToken");
if (auth_token) {
  SetAuthToken(auth_token);
  const decoded = jwt_decode(auth_token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log("loglogggg");
    store.dispatch(logoutUser());
    window.location.href = "home";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

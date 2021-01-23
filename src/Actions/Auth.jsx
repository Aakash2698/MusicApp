import SetAuthToken from "../Utils/SetAuthToken";
import jwt_decode from "jwt-decode";
// import history from "../history";

import { SET_CURRENT_USER, USER_LOADING } from "../ActionTypes/ActionTypes.jsx";

export const loginUser = (payload) => (dispatch, getState, Api) => {
  return Api.post("login", payload, "header").then((res) => {
    if (res.response.status === 201) {
      const token = res.responseData.token;
      console.log(token);
      localStorage.setItem("jwtToken", token);
      SetAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      // history.push({
      //   pathname: "/home",
      // });
      // dispatch(loginSuccess(res.responseData.response_data));
    }
    return res;
  });
};
export const registerUser = (payload) => (dispatch, getState, Api) => {
  return Api.post("register", payload, "header").then((res) => {
    // if (res.response.status === 201) {

    // }
    return res;
  });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  SetAuthToken(false);
  dispatch(setCurrentUser({}));
};

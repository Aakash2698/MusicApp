import SetAuthToken from "../Utils/SetAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

import {
  SET_CURRENT_USER,
  USER_LOADING,
  SHOW_LOADER,
  HIDE_LOADER,
  USER_DATA,
  LOGOUT,
} from "../ActionTypes/ActionTypes.jsx";

export const loginUser = (payload) => (dispatch, getState, Api) => {
  return Api.post("login", payload, "header").then((res) => {
    if (res.response.status === 201) {
      let token = res.responseData.token;
      localStorage.setItem("jwtToken", token);
      SetAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    }
    return res;
  });
};

export const googleLogin = (payload) => (dispatch, getState, Api) => {
  return Api.post("google-login", payload, "header").then((res) => {
    console.log(res);
    if (res.response.status === 200) {
      const token = res.responseData.token;
      localStorage.setItem("jwtToken", token);
      SetAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
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
  localStorage.removeItem("id");
  SetAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const logoutSuccess = () => {
  // global.check_Auth(history);
  // localStorage.clear();
  history.push("/login");
  // logoutFirebase();
  return {
    type: LOGOUT,
  };
};

export const showLoader = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADER,
  });
  window.setTimeout(() => {
    dispatch({
      type: HIDE_LOADER,
    });
  }, 1000);
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADER,
  });
};

export const setUserData = (payload) => (dispatch) => {
  return dispatch({
    type: USER_DATA,
    payload: payload,
  });
};

export const changePassword = (id, payload) => (dispatch, getState, Api) => {
  return Api.put(`change-password/${id}`, payload).then((response) => {
    return response;
  });
};

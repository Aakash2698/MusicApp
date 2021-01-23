import SetAuthToken from "../Utils/SetAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS,
} from "../ActionTypes/ActionTypes.jsx";

// export const registerUser = (userData, history) => {
//   return async (dispatch) => {
//     const url = "http://localhost:4000/user/register";
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((res) => history.push("/home-page"))
//       .catch((err) =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err,
//         })
//       );
//     return err;
//   };
// };

// export const loginUser = (userData) => {
//   return async (dispatch) => {
//     const api = "http://localhost:4000/user/login";
//     fetch(api, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((res) => {
//         console.log(res);
//         return res;
//       })

//       // .then((response) => response.json())
//       // .then((response) => {
//       //   console.log(typeof response);

//       //   // console.log(response);
//       //   // return response;
//       // })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// export const loginUser = (userData) => {
//   return async (dispatch) => {
//     const url = "http://localhost:4000/user/login";
//     await fetch(url, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     }).then((res) => {
//       console.log("RES", res);
//       res.json().then((json) => {
//         console.log("res", json);
//         if (json.token) {
//           const token = json.token;
//           localStorage.setItem("jwtToken", token);
//           SetAuthToken(token);
//           const decoded = jwt_decode(token);
//           dispatch(setCurrentUser(decoded));
//           history.push({
//             pathname: "/home",
//           });
//         }
//       });
//     });
//   };
// };

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

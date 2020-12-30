import {
  SET_CURRENT_USER,
  USER_LOADING,
  SHOW_LOADER,
  HIDE_LOADER,
  USER_DATA,
} from "../ActionTypes/ActionTypes";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  success: false,
  isLoading: false,
  userData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case USER_DATA:
      console.log("namsate");
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}

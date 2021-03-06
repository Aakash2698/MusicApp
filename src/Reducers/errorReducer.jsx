import { GET_ERRORS } from "../ActionTypes/ActionTypes";

const initialState = {};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

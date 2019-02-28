import {
  GET_STAT,
  LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  stat: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STAT:
      return {
        ...state,
        stat: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        stat: null
      };
    case GET_ERRORS:
      return {
        ...state,
        stat: null,
        loading: false
      };
    default:
      return state;
  }
}

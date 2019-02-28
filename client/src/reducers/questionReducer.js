import {
  GET_QUESTION,
  LOADING,
  SAVE_SCORE,
  RESET_QUIZ,
  NEW_QUESTION
} from "../actions/types";

const initialState = {
  question: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUESTION:
      return {
        ...state,
        loading: false,
        question: action.payload
      };
    case SAVE_SCORE:
      return {
        ...state,
        saved: true
      };
    case RESET_QUIZ:
      return {
        ...state,
        saved: false,
        question: {}
      };
    case NEW_QUESTION:
      return {
        ...state,
        success: true
      };
    default:
      return state;
  }
}

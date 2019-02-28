import axios from "axios";

import {
  LOADING,
  GET_ERRORS,
  GET_QUESTION,
  SAVE_SCORE,
  RESET_QUIZ,
  NEW_QUESTION
} from "./types";

//Get current Profile of user
export const getQuestion = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/questions/multiple/one")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_QUESTION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const saveScore = userData => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/stats/add", userData)
    .then(res => {
      console.log(res);
      dispatch({
        type: SAVE_SCORE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const resetQuiz = () => dispatch => {
  dispatch(setLoading());
  dispatch({
    type: RESET_QUIZ,
    payload: {}
  });
};

//Loading
export const setLoading = () => {
  return {
    type: LOADING
  };
};

//Add Question
export const newQuestion = newQ => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/questions/multiple/add", newQ)
    .then(res => {
      console.log(res);
      dispatch({
        type: NEW_QUESTION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

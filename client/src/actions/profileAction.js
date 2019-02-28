import axios from "axios";
import { GET_STAT, LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from "./types";

//Get current Profile of user
export const getCurrentProfile = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/stats")
    .then(res =>
      dispatch({
        type: GET_STAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Loading
export const setLoading = () => {
  return {
    type: LOADING
  };
};

//Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

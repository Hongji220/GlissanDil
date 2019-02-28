import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//User login - Getting the user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Saving the token to local storage
      const { token } = res.data;
      //Saving token
      localStorage.setItem("jwtToken", token);
      //Set to authorization header
      setAuthToken(token);
      //Decoding token to get user data
      const decoded = jwt_decode(token);
      //Set current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove Token from Local Storage
  localStorage.removeItem("jwtToken");
  //Remove auth Header for future requests
  setAuthToken(false);
  //Set current User to {} - empty object which will also unset "isAuthenticated"
  dispatch(setCurrentUser({}));
};

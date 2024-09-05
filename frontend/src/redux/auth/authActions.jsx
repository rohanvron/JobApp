import axios from 'axios';
import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT, APPLY_JOB } from './authTypes';

// action creator for success and failure authentication and storing user data in local storage
export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/signup', userData);
    dispatch({ type: AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response.data.error });
  }
};

// for login action
export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', userData);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
    dispatch({ type: AUTH_SUCCESS, payload: res.data });
    return res.data.user;
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response.data.error });
    throw err;
  }
};

// for logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

// for applying for a job (users)
export const applyForJob = (jobId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/jobs/${jobId}/apply`);
    dispatch({ type: APPLY_JOB, payload: jobId });
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response.data.error });
  }
};

// for checking authentication state
export const checkAuthState = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  if (user && token) {
    dispatch({ type: AUTH_SUCCESS, payload: { user, token } });
    // setting up the token in axios defaults
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

//token in axios defaults
const token = localStorage.getItem('token');

axios.defaults.baseURL = 'https://jobapp.adaptable.app';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
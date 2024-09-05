import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT, APPLY_JOB } from './authTypes';

// Define the initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
};


// Define the reducer function
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case AUTH_FAIL:
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload
      };
    case APPLY_JOB:
      return {
        ...state,
        user: {
          ...state.user,
          appliedJobs: [...(state.user.appliedJobs || []), action.payload]
        }
      };
    default:
      return state;
  }
}
import {
  GET_JOBS,
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  APPLY_JOB,
  SET_APPLIED_JOBS,
} from "./jobTypes";

// initial state for jobs
const initialState = {
  jobs: [],
  appliedJobs: [],
};

// reducer for jobs
export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return { ...state, jobs: action.payload };
    case CREATE_JOB:
      return { ...state, jobs: [...state.jobs, action.payload] };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    case APPLY_JOB:
      return {
        ...state,
        appliedJobs: [...state.appliedJobs, action.payload],
      };
    case SET_APPLIED_JOBS:
        return {
          ...state,
          appliedJobs: action.payload,
        };
    default:
      return state;
  }
}

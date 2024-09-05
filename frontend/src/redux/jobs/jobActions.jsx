import axios from 'axios';

import { CREATE_JOB, GET_JOBS, UPDATE_JOB, DELETE_JOB, APPLY_JOB, SET_APPLIED_JOBS } from './jobTypes';

// for creating a new job (admins)
export const createJob = (jobData) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post('/api/jobs', jobData, config);
    dispatch({
      type: CREATE_JOB,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error creating job:', error);
  }
};

// for getting all jobs (users)
export const getJobs = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get('/api/jobs', config);
    dispatch({
      type: GET_JOBS,
      payload: res.data.jobs,
    });
    dispatch({
      type: SET_APPLIED_JOBS,
      payload: res.data.appliedJobs,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

// for updating a job (admins)
export const updateJob = (id, jobData) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(`/api/jobs/${id}`, jobData, config);
    dispatch({
      type: UPDATE_JOB,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error updating job:', error.response?.data || error.message);
  }
};


// for deleting a job (admins)
export const deleteJob = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/jobs/${id}`);
    dispatch({
      type: DELETE_JOB,
      payload: id,
    });
  } catch (error) {
    console.error('Error deleting job:', error);
  }
};

// for applying for a job (users)
export const applyForJob = (jobId) => async (dispatch, getState) => {
  try {
      const { token } = getState().auth;
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };
      await axios.post(`/api/jobs/${jobId}/apply`, {}, config);
      dispatch({
          type: APPLY_JOB,
          payload: jobId,
      });
  } catch (error) {
      console.error('Error applying for job:', error.response?.data || error.message);
  }
};

// setting up axios defaults with token
const token = localStorage.getItem('token');

axios.defaults.baseURL = 'https://job-app-snowy.vercel.app';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
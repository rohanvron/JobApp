import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthState } from './redux/auth/authActions';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AppContent from './components/AppContent';
import axios from 'axios';

// app component
function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  // check if user is authenticated

   useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  // authorization header for axios requests

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/'element={user ? <AppContent /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
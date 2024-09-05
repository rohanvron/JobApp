// to ease app.jsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/auth/authActions';
import Sidebar from './Sidebar';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';
import AppliedJobsPage from '../pages/AppliedJobsPage';
import MobileHeader from './MobileHeader';

// app content component
function AppContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setSelectedTab(user.role === 'admin' ? 'createJob' : 'jobOpenings');
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="md:hidden">
        <MobileHeader
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          user={user}
          onLogout={handleLogout}
        />
      </div>
      <div className="hidden md:block">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {user.role === 'admin' ? (
          selectedTab === 'createJob' ? (
            <AdminPage />
          ) : (
            <AdminPage showOnlyJobs={true} />
          )
        ) : (
          selectedTab === 'jobOpenings' ? (
            <UserPage />
          ) : (
            <AppliedJobsPage />
          )
        )}
      </main>
    </div>
  );
}

export default AppContent;
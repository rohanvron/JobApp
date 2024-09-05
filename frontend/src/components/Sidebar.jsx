import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authActions';
import { MdAddCircleOutline, MdFormatListBulleted, MdWorkOutline, MdLogout } from 'react-icons/md';
import logo from "../assets/logo1.png";
import ConfirmationPopup from './ConfirmationPopup';
import { useState } from 'react';

// sidebar component for desktop devices
const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
  };

  const handleLogoutConfirm = () => {
    handleLogout();
    setLogoutConfirmOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
    <aside className="w-64 bg-white h-screen flex flex-col">
      <div className="flex flex-col items-center mt-6">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <h1 className="text-2xl font-bold mt-2">JobApp</h1>
      </div>
      <div className="border-b w-full my-4"></div>
      <nav className="flex-grow">
        {user.role === 'admin' ? (
          <>
            <div
              onClick={() => handleTabChange('createJob')}
              className={`flex items-center py-2 px-4 cursor-pointer ${
                selectedTab === 'createJob' ? 'text-purple-700' : 'text-gray-600'
              }`}
            >
              <MdAddCircleOutline className="mr-2 text-2xl"/>
              Create New Job
            </div>
            <div
              onClick={() => handleTabChange('listedJobs')}
              className={`flex items-center py-2 px-4 cursor-pointer ${
                selectedTab === 'listedJobs' ? 'text-purple-700' : 'text-gray-600'
              }`}
            >
              <MdFormatListBulleted className="mr-2 text-2xl" />
              Listed Jobs
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => handleTabChange('jobOpenings')}
              className={`flex items-center py-2 px-4 cursor-pointer ${
                selectedTab === 'jobOpenings' ? 'text-purple-700' : 'text-gray-600'
              }`}
            >
              <MdWorkOutline className="mr-2 text-2xl" />
              Job Openings
            </div>
            <div
              onClick={() => handleTabChange('appliedJobs')}
              className={`flex items-center py-2 px-4 cursor-pointer ${
                selectedTab === 'appliedJobs' ? 'text-purple-700' : 'text-gray-600'
              }`}
            >
              <MdFormatListBulleted className="mr-2 text-2xl" />
              Applied Jobs
            </div>
          </>
        )}
      </nav>
      <div className="mb-6 px-4">
        <p className="text-sm text-gray-600">{user.name}</p>
        <p className="text-xs text-gray-400">{user.email}</p>
      </div>
      <button
        onClick={handleLogoutClick}
        className="flex items-center justify-center w-full py-2 bg-[#682c94] text-white"
      >
        <MdLogout className="mr-2" />
        Logout
      </button>
    </aside>
    <ConfirmationPopup
        isOpen={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
      />
    </>
  );
};

export default Sidebar;

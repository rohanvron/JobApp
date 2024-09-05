import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import logo from "../assets/logo1.png";
import ConfirmationPopup from './ConfirmationPopup';

// different header style for mobile devices
const MobileHeader = ({ selectedTab, setSelectedTab, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
  };

  const handleLogoutConfirm = () => {
    onLogout();
    setLogoutConfirmOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
    <header className="bg-white shadow-md pt-6">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold">JobApp</span>
        </div>
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>
      {menuOpen && (
        <nav className="bg-white p-4">
          {user.role === 'admin' ? (
            <>
              <button onClick={() => setSelectedTab('createJob')} className="block w-full text-left py-2">Create New Job</button>
              <button onClick={() => setSelectedTab('listedJobs')} className="block w-full text-left py-2">Listed Jobs</button>
            </>
          ) : (
            <>
              <button onClick={() => setSelectedTab('jobOpenings')} className="block w-full text-left py-2">Job Openings</button>
              <button onClick={() => setSelectedTab('appliedJobs')} className="block w-full text-left py-2">Applied Jobs</button>
            </>
          )}
          <button onClick={handleLogoutClick} className="block w-full text-left py-2 mt-4 text-red-600">Logout</button>
        </nav>
      )}
    </header>
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

export default MobileHeader;
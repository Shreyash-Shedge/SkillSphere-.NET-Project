import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';  // Import Outlet for nested routing
import CreatorSidebar from './CreatorSidebar';
// import Navbar from '../Navbar/Navbar';


const CreatorDashboard = () => {
  const { name, role } = useSelector((state) => state.auth);

  if (role !== 'Creator') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <CreatorSidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet /> {/* This will render the nested route components */}
        </main>
      </div>
    </div>
  );
};

export default CreatorDashboard;

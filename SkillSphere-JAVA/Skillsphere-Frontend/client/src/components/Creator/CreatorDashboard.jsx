import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CreatorSidebar from '../Sidebar/CreatorSidebar.jsx'

const CreatorDashboard = () => {
  const { role } = useSelector((state) => state.auth);

  if (role !== "CREATOR" && role !== "ROLE_CREATOR") {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <CreatorSidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CreatorDashboard;

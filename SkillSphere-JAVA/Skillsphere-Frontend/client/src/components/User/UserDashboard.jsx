import React from 'react';
import { useSelector } from 'react-redux';
import UserSidebar from '../Sidebar/UserSidebar';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
  const { role } = useSelector((state) => state.auth);

  if (role !== "USER" && role !== "ROLE_USER") {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <UserSidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet /> {/* This will render the nested route components */}
        </main>
      </div>
    </div>  
  );
};

export default UserDashboard;

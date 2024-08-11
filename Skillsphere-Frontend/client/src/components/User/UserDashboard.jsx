import React from 'react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const { name, role } = useSelector((state) => state.auth);

  if (role !== 'User') {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {name}</p>
    </div>
  );
};

export default UserDashboard;

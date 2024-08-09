import React from 'react';
import { useSelector } from 'react-redux';

const CreatorDashboard = () => {
  const { name, role } = useSelector((state) => state.auth);

  if (role !== 'Creator') {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Creator Dashboard</h1>
      <p>Welcome, {name}</p>
    </div>
  );
};

export default CreatorDashboard;

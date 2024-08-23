import React from "react";
import CreatorSidebar from "../components/Sidebar/CreatorSidebar";

function CreatorDashboard() {
  return (
    <div>
      <div className="bg-white flex flex-row h-screen">
        <div className="flex flex-1 border-4">
          <CreatorSidebar />
        </div>
        <div className="flex-1 p-4 text-black">
          <h1>Welcome to creator Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default CreatorDashboard;

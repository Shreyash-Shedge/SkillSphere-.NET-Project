import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarDemo } from "../components/ui/SidebarDemo";

function LearnerDashboard() {
  return (
    <div className="bg-white flex flex-row h-screen">
      <div className="flex flex-1 border-4">
        <Sidebar />
        {/* <SidebarDemo /> */}
      </div>
      <div className="flex-1 p-4 text-black">
        <h1>Course videos page with sidebar</h1>
      </div>
    </div>
  );
}

export default LearnerDashboard;

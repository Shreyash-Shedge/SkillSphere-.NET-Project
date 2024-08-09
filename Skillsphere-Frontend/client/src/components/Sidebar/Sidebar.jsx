import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-white flex flex-col w-64 h-full">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-xl font-semibold text-white">Skillsphere</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <Link
              to="#"
              className="flex items-center p-2 rounded-md text-gray-900 hover:text-blue-600"
            >
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="#"
              className="flex items-center p-2 rounded-md text-gray-900 hover:text-blue-600"
            >
              <span className="ml-2">My Learnings</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="#"
              className="flex items-center p-2 rounded-md text-gray-900 hover:text-blue-600"
            >
              <span className="ml-2">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center p-2 rounded-md text-gray-900 hover:text-blue-600"
            >
              <span className="ml-2">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

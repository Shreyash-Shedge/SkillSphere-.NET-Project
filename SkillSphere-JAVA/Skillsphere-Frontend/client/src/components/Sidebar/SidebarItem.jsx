import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarContext from "./SidebarContext";
import { styled } from '@mui/material/styles';

// Custom styles for the active sidebar item
const ActiveSidebarItem = styled('li')({
  backgroundColor: '#1a73e8', // Bootstrap's nav-active blue color
  color: 'white',
  cursor: 'pointer',
});

// SidebarLink styling to remove underline
const SidebarLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: 'white',
  },
});

export default function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <SidebarLink to={to}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${isActive ? "bg-indigo-500 text-white" : "text-gray-300 hover:text-white"}
        `}
        style={{
          cursor: 'pointer',
        }}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
        >
          {text}
        </span>
      </li>
    </SidebarLink>
  );
}

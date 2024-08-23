import { User, BookOpen, Home, Phone, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarContext from "./SidebarContext.jsx";
import SidebarItem from "./SidebarItem.jsx";
import { styled } from '@mui/material/styles';
import { logout } from "../../store/authSlice";

// Custom styles for SidebarContainer
const SidebarContainer = styled('aside')(({ expanded }) => ({
  height: '100vh',
  backgroundColor: '#263238',  
  borderRight: '1px solid #424242',
  color: 'white',
  width: expanded ? '300px' : '100px', 
  transition: 'width 0.3s ease',
}));

export default function UserSidebar() {
  const [expanded, setExpanded] = useState(true);
  const email = useSelector((state) => state.auth.name);
  const firstLetter = email ? email.charAt(0).toUpperCase() : "U";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

  return (
    <SidebarContainer expanded={expanded}>
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-xl font-bold ${expanded ? "block" : "hidden"}`}>SkillSphere</span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-2 p-2 w-8 h-8 rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none flex items-center justify-center"
              style={{ transition: 'all 0.3s ease' }}
            >
              {firstLetter}
            </button>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 space-y-2">
            <SidebarItem icon={<Home />} text="Home" to="/" />
            <SidebarItem icon={<User />} text="My Profile" to="/user-dashboard/profile" />
            <SidebarItem icon={<BookOpen />} text="My Learnings" to="/user-dashboard/my-learning" />
            <SidebarItem icon={<Phone />} text="My Appointments" to="/user-dashboard/appointments" />
            <SidebarItem icon={<BookOpen />} text="Explore Offerings" to="/user-dashboard/all-courses" />
            <SidebarItem icon={<ShoppingCart />} text="Cart" to="/user-dashboard/cart" />


          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex items-center justify-between p-3">
          <span className={`font-semibold text-white ${expanded ? "block" : "hidden"}`}>{email}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </SidebarContainer>
  );
}

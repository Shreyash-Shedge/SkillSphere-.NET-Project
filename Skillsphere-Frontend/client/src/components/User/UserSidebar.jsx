import { MoreVertical, ChevronLast, ChevronFirst, User, BookOpen, Home, Phone } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthData } from "../../store/authSlice";

const SidebarContext = createContext();

export default function UserSidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate("/"); // Navigate to homepage after logout
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className="flex items-center">
            <img
              className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
              alt="User Sidebar Logo"
            />
            <span
              className={`ml-2 text-xl font-bold ${expanded ? "block" : "hidden"}`}
            >
              UserDashboard
            </span>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 space-y-2">
            <SidebarItem icon={<Home />} text="Home" to="/" />
            <SidebarItem icon={<User />} text="My Profile" to="/user-dashboard/profile" />
            <SidebarItem icon={<BookOpen />} text="My Learnings" to="/user-dashboard/courses" />
            <SidebarItem icon={<Phone />} text="My Appointments" to="/user-dashboard/consultations" />
            <SidebarItem icon={<BookOpen />} text="Explore Offerings" to="/user-dashboard/all-courses" />
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{email}</h4>
              <button
                onClick={handleLogout}
                className="text-xs text-blue-600 mt-2 hover:underline"
              >
                Logout
              </button>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={to}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          hover:bg-indigo-50 text-gray-600
        `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
        >
          {text}
        </span>
      </li>
    </Link>
  );
}

import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const navigation = [
  { name: "Courses", to: "/" },  // Changed from href to to
  { name: "Contact Us", to: "/contactUs" },
  { name: "About Us", to: "/aboutUs" },
  { name: "Link 4", to: "#" },  // Will be updated dynamically
];

const logoStyle = {
  width: "2.5rem",
  height: "auto",
  cursor: "pointer",
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const dashboardLink =
    role === "ADMIN" || role === "ROLE_ADMIN"
      ? "/admin-dashboard"
      : role === "USER" || role === "ROLE_USER"
      ? "/user-dashboard/profile"
      : role === "CREATOR" || role === "ROLE_CREATOR"
      ? "/creator-dashboard/profile"
      : "#";

  console.log('Role stored:', role);
  console.log('Dashboard Link:', dashboardLink);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Skillsphere</span>
            <img src="/logo.webp" style={logoStyle} alt="App Logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="bg-white -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, index) =>
            item.name === "Link 4" && isAuthenticated ? (
              <Link
                key={index}
                to={dashboardLink}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
                style={{ textDecoration: 'none' }}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                key={index}
                to={item.to}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
                style={{ textDecoration: 'none' }}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
              style={{ textDecoration: 'none' }}
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Skillsphere</span>
              <img src="/logo.webp" style={logoStyle} alt="App Logo" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-white -m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item, index) =>
                  item.name === "Link 4" && isAuthenticated ? (
                    <Link
                      key={index}
                      to={dashboardLink}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                      style={{ textDecoration: 'none' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      key={index}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                      style={{ textDecoration: 'none' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

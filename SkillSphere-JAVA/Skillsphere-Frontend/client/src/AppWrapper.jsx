import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";
import UserSignUp from "./pages/UserSignUp";
import CreatorSignUp from "./pages/CreatorSignUp";
import UserDashboard from "./components/User/UserDashboard";
import CreatorDashboard from "./components/Creator/CreatorDashboard";
import { useDispatch } from "react-redux";
import { setAuthData } from "./store/authSlice";
import CreatorProfile from "./components/Creator/CreatorProfile";
import CreatorDashboardRoutes from "./components/Creator/CreatorDashboardRoutes";
import UserDashboardRoutes from "./components/User/UserDashboardRoutes";
import CourseOverview from "./components/Courses/CourseOverview";
import ContactUs from "./components/Home/ContactUs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "signup-user",
        element: <UserSignUp />,
      },
      {
        path: "signup-creator",
        element: <CreatorSignUp />,
      },
      {
        path: "user-dashboard",
        element: <UserDashboard />,
        children: [
          
          {
            path: "*",
            element: <UserDashboardRoutes />, 
          },
          {
            path: "courses/:courseId",
            element: <CourseOverview />, 
          },
        ],
      },
      {
        path: "creator-dashboard",
        element: <CreatorDashboard />,
        children: [
          {
            path: "profile",
            element: <CreatorProfile />,
          },
          {
            path: "*", // This will match any routes under "creator-dashboard"
            element: <CreatorDashboardRoutes />, // Include the CreatorDashboardRoutes here
          },
        ],
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "contactUs",
        element: <ContactUs />,
      },
    ],
  },
]);

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");



    // // Log the retrieved data
    // console.log('Token from localStorage:', token);
    // console.log('Role from localStorage:', role);
    // console.log('Email from localStorage:', email);
    // console.log('Id from localStorage:', id);

  
    if (token && role && email) {
      dispatch(setAuthData({ token, role, name: email, id }));
    }
  }, [dispatch]);
  

  return <RouterProvider router={appRouter} />;
}
export default AppWrapper;

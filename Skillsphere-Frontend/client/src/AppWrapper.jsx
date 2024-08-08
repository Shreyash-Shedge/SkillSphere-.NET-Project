import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import LearnerDashboard from "./pages/LearnerDashboard";
import ErrorPage from "./pages/ErrorPage";
import UserSignUp from "./pages/UserSignUp";
import CreatorSignUp from "./pages/CreatorSignUp";
import UserDashboard from "./components/User/UserDashboard";
import CreatorDashboard from "./components/Creator/CreatorDashboard";

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
      },
      {
        path: "creator-dashboard",
        element: <CreatorDashboard />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "learnerdashboard",
        element: <LearnerDashboard />,
      },
    ],
  },
]);

function AppWrapper() {
  return <RouterProvider router={appRouter} />;
}

export default AppWrapper;

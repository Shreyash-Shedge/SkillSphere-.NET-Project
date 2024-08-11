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
import CreatorCourses from "./components/Creator/CreaterCourses";
import CreatorProfile from "./components/Creator/CreatorProfile";
import CreatorConsultations from "./components/Creator/CreatorConsultations";
import EditCourse from "./components/Courses/EditCourse";
import EditModules from "./components/Courses/EditModules";
import CourseList from "./components/Courses/CourseList";
import CreateCourseForm from "./components/Courses/CreateCourseForm";

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
        children: [
          {
            path: "courses",
            element: <CourseList />,
          },
          {
            path: "courses/create-courses",
            element: <CreateCourseForm />,
          },
          {
            path: "courses/:courseId",
            element: <EditCourse />,
          },
          {
            path: "courses/:courseId/:moduleId",
            element: <EditModules />,
          },
          {
            path: "profile",
            element: <CreatorProfile />,
          },
          {
            path: "consultations",
            element: <CreatorConsultations />,
          },
        ],
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

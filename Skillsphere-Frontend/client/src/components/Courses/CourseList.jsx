import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCourses, deleteCourse } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses(token);
        if (response.data && Array.isArray(response.data.$values)) {
          setCourses(response.data.$values);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token]);

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId, token);
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="courses p-4">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("create-courses")}
      >
        Create Course
      </button>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded shadow-md border border-gray-300">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{course.title}</h2>
            <p className="italic text-gray-600">{course.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/creator-dashboard/courses/${course.id}`)}
              >
                Edit Course
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/creator-dashboard/courses/${course.id}/modules`)}
              >
                Edit Modules
              </button>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded w-full mt-2"
              onClick={() => handleDelete(course.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

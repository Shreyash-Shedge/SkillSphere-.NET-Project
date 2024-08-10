import React, { useState, useEffect } from "react";
import CreateCourseForm from "../Courses/CreateCourseForm";
import { useSelector } from "react-redux";
import { getCourses, deleteCourse } from "../../api/auth";

const CreatorCourses = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses(token);
        if (response.data && Array.isArray(response.data.$values)) {
          setCourses(response.data.$values);
        } else {
          console.error("Unexpected response format:", response.data);
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [token]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCreateCourseClick = () => {
    setShowCreateForm(true);
    setEditingCourse(null); // Reset editing mode
  };

  const handleEditCourseClick = (course) => {
    setEditingCourse(course);
    setShowCreateForm(true);
  };

  const handleDeleteCourseClick = async (courseId) => {
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
        onClick={handleCreateCourseClick}
      >
        {editingCourse ? "Edit Course" : "Create Course"}
      </button>
      {showCreateForm && <CreateCourseForm course={editingCourse} />}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded shadow-md border border-gray-300">
            <h2 className="text-xl font-bold mb-2 text-black">{course.title}</h2>
            <p className="text-gray-600 italic">{course.description}</p>
            <p className="text-gray-500 text-sm mt-1">
              Created by {course.creatorName} on <span className="font-bold">{formatDate(course.createdDate)}</span>
            </p>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => handleEditCourseClick(course)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteCourseClick(course.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorCourses;

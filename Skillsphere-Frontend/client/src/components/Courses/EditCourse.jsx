import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCourseById, updateCourse } from "../../api/auth";

const EditCourse = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await getCourseById(courseId, token);
        const course = response.data;

        // Log the entire course object for debugging
        console.log("Fetched Course Data:", course);

        if (course) {
          setTitle(course.title || "");
          setDescription(course.description || "");
          setPrice(course.price ? course.price.toString() : "");
        } else {
          console.error("Course data not found for the given courseId");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const courseData = { title, description, price: parseFloat(price) };

    try {
      await updateCourse(courseId, courseData, token);
      navigate('/creator-dashboard/courses'); // Navigate back to courses after updating
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="edit-course-form bg-white p-6 rounded shadow-md mt-4 border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-900">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-900">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCourse;

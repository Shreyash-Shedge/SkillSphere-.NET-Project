import React, { useState, useEffect } from "react";
import { getCourses } from "../../api/userDashobard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllOfferings = () => {
  const [courses, setCourses] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses(token);
      setCourses(response.data.$values); // Update the state with the courses data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
      setLoading(false);
    }
  };

  return (
    <div className="user-courses p-4">
      <h1 className="text-2xl font-bold mb-4">All Offerings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="card border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="mt-2">{course.description}</p>
              <p className="mt-2 font-bold">${course.price}</p>
              <Link
                to={`/user-dashboard/course-detail`}
                state={{ course }}  // Pass course data via state
              >
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
                  View More
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOfferings;

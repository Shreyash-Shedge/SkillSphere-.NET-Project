import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../api/auth";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import toastr from "toastr";

const CourseActions = ({ courseId, refreshCourses }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCourse(courseId, token);
          toastr.success("Course deleted successfully.");
          refreshCourses(); // Call the function to refresh the course list
        } catch (error) {
          toastr.error("Failed to delete course.");
        }
      }
    });
  };

  return (
    <>
      <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => navigate(`/creator-dashboard/courses/${courseId}`)}
      >
        Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default CourseActions;

import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteVideo } from "../../api/auth";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import toastr from "toastr";

const VideoActions = ({ videoId, moduleId }) => {
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
          await deleteVideo(moduleId, videoId, token);
          toastr.success("Video deleted successfully.");
          navigate(`/creator-dashboard/modules/${moduleId}/videos`);
        } catch (error) {
          toastr.error("Failed to delete video.");
        }
      }
    });
  };

  return (
    <>
      <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => navigate(`/creator-dashboard/courses/${moduleId}/videos/${videoId}`)}
      >
        Edit Video
      </button>
      <button className="btn btn-danger btn-sm" onClick={handleDelete}>
        Delete Video
      </button>
    </>
  );
};

export default VideoActions;

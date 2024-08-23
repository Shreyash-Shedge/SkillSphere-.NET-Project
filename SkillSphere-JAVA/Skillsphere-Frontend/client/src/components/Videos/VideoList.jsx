import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getVideos, deleteVideo } from "../../api/auth"; // Add deleteVideo import
import { useParams, useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const VideoList = () => {
  const { moduleId, courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [deletionCount, setDeletionCount] = useState(0); // State to track deletions
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos(moduleId, token);
        if (response.data && Array.isArray(response.data)) {
          setVideos(response.data);
        } else {
          toastr.error("Failed to fetch videos. Unexpected response format.");
        }
      } catch (error) {
        toastr.error("Error fetching videos.");
      }
    };

    fetchVideos();
  }, [moduleId, token, deletionCount]); // Re-fetch videos when a deletion occurs

  const handleDelete = async (videoId) => {
    try {
      await deleteVideo(moduleId, videoId, token);
      toastr.success("Video deleted successfully!");
      setDeletionCount(deletionCount + 1); // Trigger re-fetch of videos
    } catch (error) {
      toastr.error("Failed to delete video.");
    }
  };

  return (
    <div className="videos p-4">
      <h1 className="text-2xl font-bold">Videos for Module ID: {moduleId}</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.videoId}>
                <td>{video.title}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/creator-dashboard/courses/${courseId}/modules/${moduleId}/videos/${video.videoId}/edit`)}
                  >
                    Edit Video
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(video.videoId)}
                  >
                    Delete Video
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoList;

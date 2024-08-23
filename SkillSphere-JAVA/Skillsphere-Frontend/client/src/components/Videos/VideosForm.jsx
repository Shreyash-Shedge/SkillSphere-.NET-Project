import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addVideo, updateVideo, getVideoById } from "../../api/auth";
import { useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Button, Container, Row, Col, Alert, Form as BootstrapForm } from "react-bootstrap";

const VideoForm = () => {
  const [videos, setVideos] = useState([{ file: null, name: "" }]);
  const [serverErrors, setServerErrors] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const { moduleId, videoId, courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails(moduleId, videoId);
    }
  }, [moduleId, videoId]);

  const fetchVideoDetails = async (moduleId, videoId) => {
    try {
      const response = await getVideoById(moduleId, videoId, token);
      const { title } = response.data;
      setVideos([{ name: title }]);
    } catch (error) {
      toastr.error("Failed to load video details.");
    }
  };

  const handleVideoChange = (videoIndex, event) => {
    const file = event.target.files[0];

    if (file && file.type === "video/mp4") {
      const updatedVideos = [...videos];
      updatedVideos[videoIndex] = {
        file,
        name: file.name,
      };
      setVideos(updatedVideos);
    } else {
      toastr.error("Invalid file type. Only .mp4 files are allowed.");
      setServerErrors(["Invalid file type. Only .mp4 files are allowed."]);
    }
  };

  const addNewVideo = () => {
    setVideos([...videos, { file: null, name: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerErrors([]);

    try {
      for (let i = 0; i < videos.length; i++) {
        const videoFile = videos[i].file;

        if (videoFile) {
          const videoData = { title: videos[i].name, file: videoFile };
          if (videoId) {
            await updateVideo(moduleId, videoId, videoData, token);
            toastr.success("Video updated successfully!");
          } else {
            await addVideo(moduleId, videoData, token);
            toastr.success("Video added successfully!");
          }
        }
      }
      navigate(`/creator-dashboard/courses/${courseId}/modules`);
    } catch (error) {
      console.error("Error saving video:", error);

      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = extractErrorMessage(error.response.data.message);
        setServerErrors([errorMessage]);
      } else {
        toastr.error("Failed to save video.");
      }
    }
  };

  const extractErrorMessage = (errorMessage) => {
    const match = errorMessage.match(/First error: (.+)/);
    return match ? match[1] : "An error occurred.";
  };

  return (
    <Container className="video-form bg-white p-4 rounded shadow-md mt-4 border border-gray-300">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">{videoId ? "Edit Video" : "Add Video"}</h2>
          {serverErrors.length > 0 && (
            <Alert variant="danger">
              <ul className="mb-0">
                {serverErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            {videos.map((video, videoIndex) => (
              <div key={videoIndex} className="mb-4 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900">Video</h3>
                <BootstrapForm.Group className="mb-4">
                  <BootstrapForm.Label>{video.name || "Upload Video"}</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="file"
                    accept=".mp4"
                    onChange={(e) => handleVideoChange(videoIndex, e)}
                    required
                  />
                </BootstrapForm.Group>
              </div>
            ))}
            <Button variant="primary" type="button" onClick={addNewVideo} className="mr-2">
              Add Another Video
            </Button>
            <Button variant="success" type="submit">
              {videoId ? "Update" : "Submit"}
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoForm;

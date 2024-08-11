import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCourseById, updateModule, addVideo, updateVideo } from "../../api/auth";

const EditModules = () => {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await getCourseById(courseId, token);
        const course = response.data;

        // Ensure modules are fetched correctly from the $values property
        const fetchedModules = course.modules?.$values || [];
        
        // Make sure each module's videos property is an array
        const modulesWithVideos = fetchedModules.map((module) => ({
          ...module,
          videos: Array.isArray(module.videos?.$values) ? module.videos.$values : []
        }));

        setModules(modulesWithVideos);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId, token]);

  const handleModuleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedModules = [...modules];
    updatedModules[index][name] = value;
    setModules(updatedModules);
  };

  const handleVideoChange = (moduleIndex, videoIndex, event) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos[videoIndex] = {
      file: event.target.files[0],
      name: event.target.files[0].name,
    };
    setModules(updatedModules);
  };

  const addNewModule = () => {
    setModules([...modules, { title: "", content: "", videos: [] }]);
  };

  const addNewVideo = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos.push({ file: null, name: "" });
    setModules(updatedModules);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        const moduleData = { title: module.title, content: module.content };

        if (module.id) {
          await updateModule(courseId, module.id, moduleData, token);
        }

        for (let j = 0; j < module.videos.length; j++) {
          const videoFile = module.videos[j].file;

          if (videoFile) {
            const videoData = { title: module.videos[j].name, file: videoFile };

            if (module.videos[j].id) {
              await updateVideo(module.id, module.videos[j].id, videoData, token);
            } else {
              await addVideo(module.id, videoData, token);
            }
          }
        }
      }

      alert('Modules updated successfully!');
      navigate('/creator-dashboard/courses');
    } catch (error) {
      console.error('Error updating modules:', error);
      alert('Failed to update modules');
    }
  };

  return (
    <div className="edit-modules-form bg-white p-6 rounded shadow-md mt-4 border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Edit Modules</h2>
      <form onSubmit={handleSubmit}>
        {modules.length > 0 ? (
          modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-4 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900">Module {moduleIndex + 1}</h3>
              <div className="mb-4">
                <label className="block text-gray-900">Module Title</label>
                <input
                  type="text"
                  name="title"
                  value={module.title || ""}
                  onChange={(e) => handleModuleChange(moduleIndex, e)}
                  className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900">Content</label>
                <textarea
                  name="content"
                  value={module.content || ""}
                  onChange={(e) => handleModuleChange(moduleIndex, e)}
                  className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-900">Videos</h4>
                {module.videos.map((video, videoIndex) => (
                  <div key={videoIndex} className="mb-2">
                    <label className="block text-gray-900">
                      {video.name || "Upload Video"}
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleVideoChange(moduleIndex, videoIndex, e)}
                      className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNewVideo(moduleIndex)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                >
                  Add Another Video
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No modules available. Please add a module.</p>
        )}

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

export default EditModules;

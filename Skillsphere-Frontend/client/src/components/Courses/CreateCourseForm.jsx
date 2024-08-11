import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createCourse, addModule, addVideo } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const CreateCourseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [modules, setModules] = useState([{ title: "", content: "", videos: [] }]);

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

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
      name: event.target.files[0].name
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

    const courseData = {
      title,
      description,
      price: parseFloat(price),
      createdDate: new Date().toISOString(),
    };

    try {
      const courseResponse = await createCourse(courseData, token);
      const courseId = courseResponse.data.id;

      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        const moduleData = { title: module.title, content: module.content };
        const moduleResponse = await addModule(courseId, moduleData, token);
        const moduleId = moduleResponse.data.id;

        for (let j = 0; j < module.videos.length; j++) {
          const videoFile = module.videos[j].file;

          if (videoFile) {
            const videoData = { title: module.videos[j].name, file: videoFile };
            await addVideo(moduleId, videoData, token);
          }
        }
      }

      alert('Course and modules created successfully!');
      navigate('/creator-dashboard/courses'); // Navigate to courses page after creation
    } catch (error) {
      console.error('Error creating course or modules:', error);
      alert('Failed to create course or modules');
    }
  };

  return (
    <div className="create-course-form bg-white p-6 rounded shadow-md mt-4 border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Create New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900">Module {moduleIndex + 1}</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Module Title</label>
              <input
                type="text"
                name="title"
                value={module.title}
                onChange={(e) => handleModuleChange(moduleIndex, e)}
                className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Content</label>
              <textarea
                name="content"
                value={module.content}
                onChange={(e) => handleModuleChange(moduleIndex, e)}
                className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-900">Videos</h4>
              {module.videos.map((video, videoIndex) => (
                <div key={videoIndex} className="mb-2">
                  <label className="block text-gray-700">
                    {video.name || "Upload Video"}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleVideoChange(moduleIndex, videoIndex, e)}
                    className="mt-1 block w-full border rounded p-2 bg-white text-gray-900"
                    required
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
        ))}

        <button
          type="button"
          onClick={addNewModule}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Another Module
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateCourseForm;

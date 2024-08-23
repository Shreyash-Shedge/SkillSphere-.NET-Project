import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getModules } from "../../api/auth";
import { useParams, useNavigate } from "react-router-dom";
import ModuleActions from "./ModuleActions";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const ModuleList = () => {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const fetchModules = async () => {
    try {
      const response = await getModules(courseId, token);
      if (response.data && Array.isArray(response.data)) {
        setModules(response.data);
      } else {
        toastr.error("Failed to fetch modules. Unexpected response format.");
      }
    } catch (error) {
      toastr.error("Error fetching modules.");
    }
  };

  useEffect(() => {
    fetchModules();
  }, [courseId, token]);


  return (
    <div className="modules p-4">
      <h1 className="text-2xl font-bold">Modules for Course</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Module Actions</th>
              <th>Videos</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <React.Fragment key={module.moduleId}>
                <tr>
                  <td>{module.title}</td>
                  <td>{module.content}</td>
                  <td>
                    <ModuleActions moduleId={module.moduleId} courseId={courseId} refreshModules={fetchModules} />
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm mr-3"
                      onClick={() => navigate(`/creator-dashboard/courses/${courseId}/modules/${module.moduleId}/videos/add`)}
                    >
                      Add
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => navigate(`/creator-dashboard/courses/${courseId}/modules/${module.moduleId}/videos`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModuleList;

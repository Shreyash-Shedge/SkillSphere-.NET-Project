import React from "react";
import CreateCourseForm from "../Courses/CreateCourseForm";

const CreateCourse = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <CreateCourseForm />
    </div>
  );
};

export default CreateCourse;

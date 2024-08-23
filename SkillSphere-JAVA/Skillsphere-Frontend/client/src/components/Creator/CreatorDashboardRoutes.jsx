import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseList from "../Courses/CourseList";
import ModuleList from "../Modules/ModuleList";
import VideoList from "../Videos/VideoList";
import VideoForm from "../Videos/VideosForm";
import ModuleForm from "../Modules/ModuleForm";
import CourseForm from "../Courses/CourseForm";
import ConsultationForm from "../Consultations/ConsultationForm";
import ConsultationDetails from "../Consultations/ConsultationDetails";
import ConsultationList from "../Consultations/ConsultationList";
import WorkshopList from "../Workshops/WorkshopList";
import WorkshopForm from "../Workshops/WorkshopForm";
import WorkshopDetails from "../Workshops/WorkshopDetails";

const CreatorDashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/create-courses" element={<CourseForm />} />
      <Route path="/courses/:courseId/edit" element={<CourseForm />} />

      <Route path="/courses/:courseId/add-modules" element={<ModuleForm />} />
      <Route path="/courses/:courseId/modules" element={<ModuleList />} />
      <Route path="/courses/:courseId/modules/:moduleId/edit" element={<ModuleForm />} /> {/* Route for editing a module */}

      <Route path="/courses/:courseId/modules/:moduleId/videos" element={<VideoList />} />
      <Route path="/courses/:courseId/modules/:moduleId/videos/add" element={<VideoForm />} />
      <Route path="/courses/:courseId/modules/:moduleId/videos/:videoId/edit" element={<VideoForm />} /> {/* Route for editing a video */}

      <Route path="/consultations" element={<ConsultationList />} />
      <Route path="/consultations/create" element={<ConsultationForm />} />
      <Route path="/consultations/:consultationId" element={<ConsultationDetails />} />
      <Route path="/consultations/:consultationId/edit" element={<ConsultationForm />} />

      <Route path="/workshops" element={<WorkshopList />} /> {/* Workshop routes */}
      <Route path="/workshops/create" element={<WorkshopForm />} />
      <Route path="/workshops/:workshopId" element={<WorkshopDetails />} />
      <Route path="/workshops/:workshopId/edit" element={<WorkshopForm />} />
    </Routes>
  );
};

export default CreatorDashboardRoutes;

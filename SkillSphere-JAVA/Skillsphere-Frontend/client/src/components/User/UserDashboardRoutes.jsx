import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import ExploreCourses from '../ExploreCourses/ExploreCourses';
import CourseOverview from '../Courses/CourseOverview';
import Cart from '../Cart/Cart';
import ExploreConsultations from '../Consultations/ExploreConsultations';
import ExploreWorkshops from '../Workshops/ExploreWorkshops';
import PurchasesOverview from '../Purchases/PurchasesOverview';
import PurchasedWorkshopDetails from '../Purchases/Workshops/PurchasedWorkshopDetails';
import PurchasedCourseDetails from '../Purchases/Courses/PurchasedCourseDetails';
import PurchasedConsultationDetails from '../Purchases/Consultations/PurchasedConsultationDetails';
import Appointments from '../MyAppointements/Appointments';
import UserProfile from './UserProfile';

const UserDashboardRoutes = () => {

  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="all-courses" element={<ExploreCourses />} />
      <Route path="course/:courseId" element={<CourseOverview />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/all-consultations" element={<ExploreConsultations />} />
      <Route path="/all-workshops" element={<ExploreWorkshops />} />
      <Route path="/my-learning" element={<PurchasesOverview />} />
      <Route path="courses/:courseId" element={<CourseOverview />} />
      <Route path="my-learning/workshops/:workshopId" element={<PurchasedWorkshopDetails />} />
      <Route path="my-learning/courses/:courseId" element={<PurchasedCourseDetails />} />
      <Route path="appointments/:consultationId" element={<PurchasedConsultationDetails />} />
      <Route path="appointments" element={<Appointments />} />
    </Routes>
  );
};

export default UserDashboardRoutes;

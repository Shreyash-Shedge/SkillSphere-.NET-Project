import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import CourseCard from '../CourseCard/CourseCard';
import ExploreConsultations from '../Consultations/ExploreConsultations';
import ExploreWorkshops from '../Workshops/ExploreWorkshops';
import { retrieveAllCourses } from '../../api/auth';
import SearchBox from 'react-search-box';
import './ExploreCourses.css';

const ExploreCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'consultations', 'workshops'
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await retrieveAllCourses(); // Fetch all courses
        setCourses(data);
        setFilteredCourses(data); // Initialize with all courses
      } catch (error) {
        console.error('Error loading courses', error);
      }
    };

    loadCourses();
  }, []);

  const handleSearch = (keyword) => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(keyword.toLowerCase()) ||
      course.description.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const renderCourses = () => (
    <>
      <SearchBox
        placeholder="Search for courses..."
        onChange={handleSearch}
        className="mb-4"
      />

      <Row className="mt-4">
        {filteredCourses.map((course) => (
          <Col 
            key={course.courseId} 
            xs={12} sm={6} md={6} lg={3} 
            className="d-flex align-items-stretch mb-4"
          >
            <CourseCard
              title={course.title}
              description={course.description}
              price={course.price}
              thumbnailImage={course.thumbnailImage}
              onDetailsClick={() => navigate(`/user-dashboard/courses/${course.courseId}`)}  // Use navigate here
              className="course-card"
            />
          </Col>
        ))}
      </Row>
    </>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return renderCourses();
      case 'consultations':
        return <ExploreConsultations />;
      case 'workshops':
        return <ExploreWorkshops />;
      default:
        return renderCourses();
    }
  };

  return (
    <Container fluid className="explore-courses-container">
      <Row className="mb-4">
        <Col>
          <Button
            variant={activeTab === 'courses' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('courses')}
            className={`mr-2 ${activeTab === 'courses' ? 'active-tab' : ''}`}
          >
            Courses
          </Button>
          <Button
            variant={activeTab === 'consultations' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('consultations')}
            className={`mr-2 ${activeTab === 'consultations' ? 'active-tab' : ''}`}
          >
            Consultations
          </Button>
          <Button
            variant={activeTab === 'workshops' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('workshops')}
            className={activeTab === 'workshops' ? 'active-tab' : ''}
          >
            Workshops
          </Button>
        </Col>
      </Row>

      {renderActiveTabContent()}
    </Container>
  );
};

export default ExploreCourses;

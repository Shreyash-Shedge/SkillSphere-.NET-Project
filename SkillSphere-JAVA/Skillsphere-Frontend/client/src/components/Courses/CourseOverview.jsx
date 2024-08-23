import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { FaVideo } from 'react-icons/fa';
import { retrieveAllCourses } from '../../api/auth';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addItemToCart } from '../Cart/cartSlice.js';
import './CourseOverview.css';

const CourseOverview = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lockedModules, setLockedModules] = useState({}); // Initialize lockedModules state
  const playerRefs = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const data = await retrieveAllCourses();
        const selectedCourse = data.find((course) => course.courseId.toString() === courseId);
        setCourse(selectedCourse);

        // Initialize the lockedModules state: first three modules unlocked, others locked
        const initialLocks = {};
        selectedCourse.modules.forEach((_, index) => {
          initialLocks[index] = index > 2; // Lock modules with index > 2
        });
        setLockedModules(initialLocks);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleAddToCart = () => {
    if (course) {
      dispatch(addItemToCart(course));
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${course.title} has been added to your cart.`,
      });
    }
  };

  const handleModuleClick = (moduleIndex) => {
    if (lockedModules[moduleIndex]) {
      Swal.fire({
        icon: 'info',
        title: 'Full Access Required',
        text: 'Please buy the course to access all modules.',
      });
    } else {
      setActiveVideo(null); // Reset the active video
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="course-overview-container">
      <Row>
        <Col md={4} className="course-details">
          <Card className="mb-3 course-card-custom">
            <Card.Img
              variant="top"
              src={`http://localhost:8080/thumbnails/${course.thumbnailImage.split('\\').pop()}`}
              alt={course.title}
              className="course-image-custom"
            />
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Text>{course.description}</Card.Text>
              <Card.Text>
                <strong>Price: ${course.price.toFixed(2)}</strong>
              </Card.Text>
              <Button variant="primary" className="w-100" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outline-secondary" className="w-100 mt-2">
                Wishlist
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} className="course-modules">
          <Accordion defaultActiveKey={null}>
            {course.modules.map((module, moduleIndex) => (
              <Card key={module.moduleId} className="module-card mb-3">
                <Accordion.Item eventKey={`${moduleIndex}`}>
                  <Accordion.Header onClick={() => handleModuleClick(moduleIndex)}>
                    {module.title}
                  </Accordion.Header>
                  {!lockedModules[moduleIndex] && (
                    <Accordion.Body>
                      <p>{module.content}</p>
                      {module.videos.map((video) => (
                        <div key={video.videoId} className="video-item mb-2">
                          <div className="d-flex align-items-center">
                            <FaVideo className="me-2" />
                            <Button
                              variant="link"
                              onClick={() => setActiveVideo(video.videoId)}
                              className="video-title-button p-0"
                            >
                              {video.title}
                            </Button>
                          </div>
                          {activeVideo === video.videoId && (
                            <div className="video-wrapper mt-2">
                              <ReactPlayer
                                ref={(player) => (playerRefs.current[video.videoId] = player)}
                                url={`http://localhost:8080/videos/${video.filePath.split('\\').pop()}`}
                                controls
                                width="100%"
                                playing={true}
                              />
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => setActiveVideo(null)}
                                >
                                  X
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </Accordion.Body>
                  )}
                </Accordion.Item>
              </Card>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseOverview;

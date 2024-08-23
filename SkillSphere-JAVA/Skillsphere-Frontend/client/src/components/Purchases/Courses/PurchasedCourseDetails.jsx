import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { FaVideo } from 'react-icons/fa';
import { getPurchasedCourseDetails } from '../../../api/auth';
import '../../Courses/CourseOverview.css';
import { useSelector } from 'react-redux';

const PurchasedCourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const playerRefs = useRef({});
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await getPurchasedCourseDetails(userId, courseId, token);
        setCourse(courseData);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId, userId, token]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{
        backgroundColor: '#263238',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '10px',
        margin: '0 3px',
        textAlign: 'center',
      }}>
        <h2 style={{ margin: 0 }}>{course.title}</h2>
      </div>
      <Container fluid className="course-overview-container">
        <Row>
          <Col md={4} className="course-details">
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src={`http://localhost:8080/thumbnails/${course.thumbnailImage.split('\\').pop()}`}
                alt={course.title}
              />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Card.Text>
                  <strong>Price: ${course.price.toFixed(2)}</strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8} className="course-modules">
            <Accordion defaultActiveKey={null}>
              {course.modules.map((module, moduleIndex) => (
                <Card key={module.moduleId} className="module-card mb-3">
                  <Accordion.Item eventKey={`${moduleIndex}`}>
                    <Accordion.Header>
                      {module.title}
                    </Accordion.Header>
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
                  </Accordion.Item>
                </Card>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PurchasedCourseDetails;

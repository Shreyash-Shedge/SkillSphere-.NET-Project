import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { retrieveAllCourses } from '../../api/auth';
import './CardHoverEffect.css';

const CardHoverEffect = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await retrieveAllCourses();

        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Expected an array but got:', data);
          setCourses([]);
        }
      } catch (error) {
        console.error('Error loading courses', error);
        setCourses([]);
      }
    };

    loadCourses();
  }, []);

  const handleDetailsClick = (courseId) => {
    navigate(`/user-dashboard/courses/${courseId}`); // Navigate to the course details page
  };

  return (
    <Container fluid className="card-hover-effect-container">
      <Row>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Col key={course.courseId} xs={12} sm={6} md={4} lg={2} className="d-flex align-items-stretch mb-4">
              <Card className="h-100 shadow-sm card-hover">
                <Card.Img
                  variant="top"
                  src={`http://localhost:8080/thumbnails/${course.thumbnailImage.split('\\').pop()}`}
                  alt={course.title}
                  className="card-img-top"
                />
                <Card.Body className="d-flex flex-column">
                  <Row className="flex-grow-1">
                    <Col className="text-center">
                      <Card.Title style={{ fontSize: "1.2rem" }}>{course.title}</Card.Title>
                    </Col>
                  </Row>
                  <Row className="flex-grow-1">
                    <Col className="text-center">
                      <Card.Text style={{ fontSize: "1rem" }}>{course.description}</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Card.Text style={{ fontSize: "1rem", marginTop: "auto" }}>
                        <strong>Price:</strong> ${course.price}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Button variant="primary" className="mt-3" onClick={() => handleDetailsClick(course.courseId)}>
                        View Details
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </Row>
    </Container>
  );
};

export default CardHoverEffect;

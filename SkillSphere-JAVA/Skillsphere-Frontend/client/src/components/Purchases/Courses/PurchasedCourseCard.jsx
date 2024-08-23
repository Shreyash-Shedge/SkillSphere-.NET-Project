import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PurchasedCourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/user-dashboard/my-learning/courses/${course.courseId}`);
  };

  return (
    <Card className="mb-3" style={{ width: '90%',height: '450px' }}>
      <div style={{ height: '220px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={`http://localhost:8080/thumbnails/${course.thumbnailImage.split('\\').pop()}`}
          alt={course.title}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </div>
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>
          <strong>Description: </strong>{course.description}
        </Card.Text>
        <Card.Text>
          <strong>Price: </strong>${course.price.toFixed(2)}
        </Card.Text>
        <Card.Text>
          <strong>Modules: </strong>{course.modules.length} modules
        </Card.Text>
        <Button variant="primary" onClick={handleViewCourse} size="sm">
          View Course
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PurchasedCourseCard;

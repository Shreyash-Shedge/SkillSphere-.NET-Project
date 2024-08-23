import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../CourseCard/CourseCard.css';

const CourseCard = ({ title, description, price, thumbnailImage, onDetailsClick }) => {
  const imageUrl = thumbnailImage
    ? `http://localhost:8080/thumbnails/${thumbnailImage.split('\\').pop()}`
    : 'https://via.placeholder.com/150'; 

  return (
    <Card className="course-card">
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        alt={title} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Text className="text-center">{description}</Card.Text>
        <Card.Text className="text-center">Price: ${price.toFixed(2)}</Card.Text>
        <Button variant="primary" className="mt-auto" onClick={onDetailsClick}>View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;

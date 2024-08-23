import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Container } from 'react-bootstrap';
import { getPurchasedWorkshopDetails } from '../../../api/auth';

const PurchasedWorkshopDetails = () => {
  const { workshopId } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchWorkshopDetails = async () => {
      try {
        const workshopData = await getPurchasedWorkshopDetails(userId, workshopId, token);
        setWorkshop(workshopData);
      } catch (error) {
        console.error('Failed to fetch workshop details.');
      }
    };

    fetchWorkshopDetails();
  }, [workshopId, userId, token]);

  if (!workshop) {
    return <p>Loading workshop details...</p>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-lg mb-4" style={{ border: 'none', borderRadius: '20px', overflow: 'hidden' }}>
        <Card.Body style={{ backgroundColor: '#f0f8ff', padding: '30px' }}>
          <Card.Title className="text-center" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            {workshop.title}
          </Card.Title>
          <Card.Text className="text-center" style={{ fontStyle: 'italic', color: '#555' }}>
            {workshop.description}
          </Card.Text>
          <ListGroup variant="flush" style={{ backgroundColor: '#f7f7f7', marginTop: '20px' }}>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>Duration:</span>
              <span>{workshop.duration} minutes</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>Max Participants:</span>
              <span>{workshop.maxParticipants}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>Platform:</span>
              <span>{workshop.callPlatform}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>Start Date:</span>
              <span>{new Date(workshop.startDate).toLocaleDateString()}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>End Date:</span>
              <span>{new Date(workshop.endDate).toLocaleDateString()}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>Start Time:</span>
              <span>{workshop.startTime}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>End Time:</span>
              <span>{workshop.endTime}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>Topics Covered:</span>
              <span>{workshop.topicsCovered.join(', ')}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
              <span>External Link:</span>
              <span>
                <a href={workshop.externalLink} target="_blank" rel="noopener noreferrer">
                  Join Workshop Before Start time
                </a>
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PurchasedWorkshopDetails;

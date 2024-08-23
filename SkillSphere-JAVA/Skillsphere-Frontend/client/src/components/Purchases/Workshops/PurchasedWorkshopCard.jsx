import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PurchasedWorkshopCard = ({ workshop }) => {
  const navigate = useNavigate();

  const handleViewWorkshop = () => {
    navigate(`/user-dashboard/my-learning/workshops/${workshop.workshopId}`);
  };

  return (
    <Card className="mb-3" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>{workshop.title}</Card.Title>
        <Card.Text>
          <strong>Description: </strong>{workshop.description}
        </Card.Text>
        <Card.Text>
          <strong>Platform: </strong>{workshop.callPlatform}
        </Card.Text>
        <Card.Text>
          <strong>Price: </strong>${workshop.price.toFixed(2)}
        </Card.Text>
        <Card.Text>
          <strong>Date: </strong>{new Date(workshop.startDate).toLocaleDateString()}
        </Card.Text>
        <Button variant="primary" onClick={handleViewWorkshop} size="sm">
          View Workshop
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PurchasedWorkshopCard;

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PurchasedConsultationCard = ({ consultation }) => {
  const navigate = useNavigate();

  const handleViewConsultation = () => {
    navigate(`/user-dashboard/appointments/${consultation.consultationId}`);
  };

  return (
    <Card className="mb-3" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>{consultation.title}</Card.Title>
        <Button variant="primary" onClick={handleViewConsultation}>
          View Consultation
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PurchasedConsultationCard;

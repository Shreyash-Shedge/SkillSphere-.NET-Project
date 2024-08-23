import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PurchasedNoPurchases = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center">
      <Alert variant="info">
        <h4>Hey, nothing is here yet!</h4>
        <p>Want to explore available Consultations</p>
      </Alert>
      <Button variant="primary" onClick={() => navigate('/user-dashboard/all-consultations')}>
        Explore Courses
      </Button>
    </Container>
  );
};

export default PurchasedNoPurchases;

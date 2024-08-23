import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { retrieveUserPurchases } from '../../api/auth';
import NoAppointments from './NoAppointments';
import SearchBox from 'react-search-box';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const consultationsData = await retrieveUserPurchases(userId, 'consultations', token);
        setConsultations(consultationsData);
        setFilteredConsultations(consultationsData); // Initialize with all consultations
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, [userId, token]);

  const handleSearch = (keyword) => {
    const filtered = consultations.filter(consultation =>
      consultation.consultation.title.toLowerCase().includes(keyword.toLowerCase()) ||
      consultation.consultation.description.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredConsultations(filtered);
  };

  const handleJoinConsultation = (consultationId) => {
    navigate(`/user-dashboard/appointments/${consultationId}`);
  };

  return (
    <Container fluid className="appointments-container">
      <Row className="mb-4">
        <Col>
          <div style={{ backgroundColor: '#263238', padding: '10px', color: 'white', borderRadius: '5px' }}>
            <h2 className="text-center" style={{ margin: 0 }}>My Appointments</h2>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <SearchBox
            placeholder="Search for consultations..."
            onChange={handleSearch}
            className="mb-4"
          />
        </Col>
      </Row>

      {!filteredConsultations.length ? (
        <NoAppointments />
      ) : (
        <Row>
          {filteredConsultations.map((purchase) => (
            <Col key={purchase.purchaseId} xs={12} md={6} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{purchase.consultation.title}</Card.Title>
                  <Card.Text>{purchase.consultation.description}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Duration:</strong> {purchase.consultation.duration} minutes</ListGroup.Item>
                    <ListGroup.Item><strong>Slots per User:</strong> {purchase.consultation.slotsPerUser}</ListGroup.Item>
                    <ListGroup.Item><strong>Platform:</strong> {purchase.consultation.callPlatform}</ListGroup.Item>
                    <ListGroup.Item><strong>Price:</strong> ${purchase.consultation.price}</ListGroup.Item>
                    <ListGroup.Item><strong>Scheduled:</strong> {new Date(purchase.consultation.startDate + 'T' + purchase.consultation.startTime).toLocaleString()}</ListGroup.Item>
                  </ListGroup>
                  <Button 
                    variant="success" 
                    className="mt-3 w-100" 
                    onClick={() => handleJoinConsultation(purchase.consultation.consultationId)}
                  >
                    View Consultation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Appointments;

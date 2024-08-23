import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { retrieveAllConsultations } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../Cart/cartSlice';
import SearchBox from 'react-search-box';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './ExploreConsultations.css'; // Import the custom CSS

const ExploreConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        const data = await retrieveAllConsultations();
        setConsultations(data);
        setFilteredConsultations(data);
      } catch (error) {
        console.error('Error loading consultations', error);
      }
    };

    loadConsultations();
  }, []);

  const handleAddToCart = (consultation) => {
    dispatch(addItemToCart(consultation));
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${consultation.title} has been added to your cart.`,
    });
  };

  const handleSearch = (keyword) => {
    const filtered = consultations.filter(consultation =>
      consultation.title.toLowerCase().includes(keyword.toLowerCase()) ||
      consultation.description.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredConsultations(filtered);
  };

  return (
    <Container fluid className="explore-consultations-container">
      <Row className="mb-4 mt-4"> {/* Added margin-top to the row */}
        <Col>
          <SearchBox
            placeholder="Search for consultations..."
            onChange={handleSearch}
            className="mb-4"
          />
        </Col>
      </Row>
      <Row>
        {filteredConsultations.map((consultation) => (
          <Col key={consultation.consultationId} xs={12} md={6} lg={4} className="d-flex mb-4"> {/* Added margin-bottom */}
            <Card className="shadow-sm w-100 d-flex flex-column card-spacing"> {/* Added custom class card-spacing */}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{consultation.title}</Card.Title>
                <Card.Text>{consultation.description}</Card.Text>
                <ListGroup variant="flush" className="flex-grow-1">
                  <ListGroup.Item><strong>Duration:</strong> {consultation.duration} minutes</ListGroup.Item>
                  <ListGroup.Item><strong>Slots per User:</strong> {consultation.slotsPerUser}</ListGroup.Item>
                  <ListGroup.Item><strong>Platform:</strong> {consultation.callPlatform}</ListGroup.Item>
                  <ListGroup.Item><strong>Date:</strong> {new Date(consultation.startDate).toLocaleDateString()} - {new Date(consultation.endDate).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>Time:</strong> {consultation.startTime} - {consultation.endTime}</ListGroup.Item>
                  <ListGroup.Item><strong>Price:</strong> ${consultation.price}</ListGroup.Item>
                </ListGroup>
                <Button variant="success" className="mt-3 w-100" onClick={() => handleAddToCart(consultation)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExploreConsultations;

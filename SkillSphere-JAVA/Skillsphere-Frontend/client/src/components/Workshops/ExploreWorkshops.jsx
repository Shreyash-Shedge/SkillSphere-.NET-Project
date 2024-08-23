import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { retrieveAllWorkshops } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../Cart/cartSlice';
import SearchBox from 'react-search-box';
import Swal from 'sweetalert2';

const ExploreWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await retrieveAllWorkshops();
        setWorkshops(data);
        setFilteredWorkshops(data);
      } catch (error) {
        console.error('Error loading workshops', error);
      }
    };

    loadWorkshops();
  }, []);

  const handleAddToCart = (workshop) => {
    dispatch(addItemToCart(workshop));
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${workshop.title} has been added to your cart.`,
    });
  };

  const handleSearch = (keyword) => {
    const filtered = workshops.filter(workshop =>
      workshop.title.toLowerCase().includes(keyword.toLowerCase()) ||
      workshop.description.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredWorkshops(filtered);
  };

  return (
    <Container fluid className="explore-workshops-container">
      <Row className="mb-4">
        <Col>
          <SearchBox
            placeholder="Search for workshops..."
            onChange={handleSearch}
            className="mb-4"
          />
        </Col>
      </Row>
      <Row>
        {filteredWorkshops.map((workshop) => (
          <Col key={workshop.workshopId} xs={12} md={6} lg={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>{workshop.title}</Card.Title>
                <Card.Text>{workshop.description}</Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Duration:</strong> {workshop.duration} minutes</ListGroup.Item>
                  <ListGroup.Item><strong>Slots per User:</strong> {workshop.slotsPerUser}</ListGroup.Item>
                  <ListGroup.Item><strong>Platform:</strong> {workshop.callPlatform}</ListGroup.Item>
                  <ListGroup.Item><strong>Date:</strong> {new Date(workshop.startDate).toLocaleDateString()} - {new Date(workshop.endDate).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>Time:</strong> {workshop.startTime} - {workshop.endTime}</ListGroup.Item>
                  <ListGroup.Item><strong>Price:</strong> ${workshop.price}</ListGroup.Item>
                </ListGroup>
                <Button variant="success" className="mt-3 w-100" onClick={() => handleAddToCart(workshop)}>
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

export default ExploreWorkshops;

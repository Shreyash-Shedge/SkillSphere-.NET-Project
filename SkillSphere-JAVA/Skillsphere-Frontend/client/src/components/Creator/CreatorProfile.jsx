import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  ListGroup,
  Image,
  Badge,
} from 'react-bootstrap';
import { fetchCreatorDetails } from '../../api/auth';

export default function CreatorProfile() {
  const [creatorData, setCreatorData] = useState(null);
  const [error, setError] = useState(null);
  const [progressValues, setProgressValues] = useState({
    courseDesign: 0,
    videoProduction: 0,
    marketingStrategy: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem('id');
      if (id) {
        try {
          const data = await fetchCreatorDetails(id);
          setCreatorData(data);

        
          const generateRandomProgress = () => Math.floor(Math.random() * 16) + 70;


          setProgressValues({
            courseDesign: generateRandomProgress(),
            videoProduction: generateRandomProgress(),
            marketingStrategy: generateRandomProgress(),
          });
        } catch (error) {
          console.error('Failed to fetch creator details:', error);
          setError('Session expired. Please log in again.');
          localStorage.clear();
          window.location.href = '/signin';
        }
      }
    };

    fetchData();
  }, []);

  if (!creatorData) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f5f7fa' }}>
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-lg mb-4" style={{ borderRadius: '20px' }}>
            <Row className="no-gutters">
              <Col md={4} className="text-center d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#007bff', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                <Image
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="Creator Avatar"
                  roundedCircle
                  fluid
                  style={{ width: '150px', border: '5px solid #fff' }}
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title className="text-center" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
                    {creatorData.name}
                  </Card.Title>
                  <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#555' }}>
                    {creatorData.email}
                  </Card.Text>
                  <Card.Text className="text-center">
                    <Badge bg="primary" className="me-2">
                      Creator
                    </Badge>
                    <Badge bg="success">Verified</Badge>
                  </Card.Text>
                  <Card.Text className="text-center" style={{ fontStyle: 'italic', color: '#777' }}>
                    {creatorData.bio}
                  </Card.Text>
                  <div className="d-flex justify-content-center mt-4">
                    <Button variant="outline-primary" className="me-2">
                      Follow
                    </Button>
                    <Button variant="primary">Message</Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow-sm" style={{ height: '100%' }}>
                <Card.Header className="bg-primary text-white text-center">
                  Project Progress
                </Card.Header>
                <Card.Body>
                  <Card.Text className="mb-1" style={{ fontSize: '1rem' }}>Course Design</Card.Text>
                  <ProgressBar now={progressValues.courseDesign} label={`${progressValues.courseDesign}%`} />
                  <Card.Text className="mt-4 mb-1" style={{ fontSize: '1rem' }}>Video Production</Card.Text>
                  <ProgressBar now={progressValues.videoProduction} label={`${progressValues.videoProduction}%`} />
                  <Card.Text className="mt-4 mb-1" style={{ fontSize: '1rem' }}>Marketing Strategy</Card.Text>
                  <ProgressBar now={progressValues.marketingStrategy} label={`${progressValues.marketingStrategy}%`} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 shadow-sm" style={{ height: '100%' }}>
                <Card.Header className="bg-primary text-white text-center">
                  Social Links
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <i className="fab fa-github fa-lg" style={{ color: '#333' }}></i>
                      <span>creatorGithub</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                      <span>@creatorTwitter</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                      <span>creatorInstagram</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <i className="fab fa-facebook fa-lg" style={{ color: '#3b5998' }}></i>
                      <span>creatorFacebook</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

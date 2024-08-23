import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaSkype } from 'react-icons/fa';
import { fetchUserDetails } from '../../api/auth'; // Assuming the fetchUserDetails function is in auth.js
import { useSelector } from 'react-redux';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const data = await fetchUserDetails(userId);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    getUserDetails();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col md="12" xl="6"> {/* Increased the width of the card */}
            <Card style={{ borderRadius: '15px', padding: '2rem' }}> {/* Added padding */}
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mt-3 mb-4"> {/* Centered the image */}
                  <Image
                    src="/profile.webp" // Correct path for image in the public folder
                    roundedCircle
                    style={{ width: '150px' }}
                    alt="User Avatar"
                  />
                </div>
                <h3>{user.name}</h3> {/* Increased the font size of the name */}
                <Card.Text className="text-muted mb-4">
                  {user.email} <span className="mx-2">|</span> <a href="#!">skillsphere.com</a>
                </Card.Text>
                <div className="mb-4 pb-2">
                  <Button variant="outline-primary" className="me-1">
                    <FaFacebook size={28} />
                  </Button>
                  <Button variant="outline-info" className="me-1">
                    <FaTwitter size={28} />
                  </Button>
                  <Button variant="outline-success">
                    <FaSkype size={28} />
                  </Button>
                </div>
                <Button variant="primary" size="lg">
                  Message now
                </Button>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <Card.Text className="mb-1 h4">8471</Card.Text> {/* Increased the font size of the statistics */}
                    <Card.Text className="small text-muted mb-0">Wallets Balance</Card.Text>
                  </div>
                  <div className="px-3">
                    <Card.Text className="mb-1 h4">8512</Card.Text> {/* Increased the font size of the statistics */}
                    <Card.Text className="small text-muted mb-0">Followers</Card.Text>
                  </div>
                  <div>
                    <Card.Text className="mb-1 h4">4751</Card.Text> {/* Increased the font size of the statistics */}
                    <Card.Text className="small text-muted mb-0">Total Transactions</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

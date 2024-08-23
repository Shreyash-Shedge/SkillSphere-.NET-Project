import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PurchasedCourseCard from '../Purchases/Courses/PurchasedCourseCard';
import PurchasedWorkshopCard from '../Purchases/Workshops/PurchasedWorkshopCard';
import NoPurchases from './NoPurchases';
import { retrieveUserPurchases } from '../../api/auth';

const PurchasesOverview = () => {
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [courses, setCourses] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [activeSection, setActiveSection] = useState('courses'); // Default to 'courses'

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const coursesData = await retrieveUserPurchases(userId, 'courses', token);
        const workshopsData = await retrieveUserPurchases(userId, 'workshops', token);
        
        setCourses(coursesData);
        setWorkshops(workshopsData);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, [userId, token]);

  const handleSectionToggle = (section) => {
    setActiveSection(section);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Button
            variant={activeSection === 'courses' ? 'primary' : 'outline-primary'}
            onClick={() => handleSectionToggle('courses')}
            style={{
              width: '100%',
              borderBottomLeftRadius: activeSection === 'courses' ? '0' : '5px',
              borderBottomRightRadius: activeSection === 'courses' ? '0' : '5px',
              zIndex: activeSection === 'courses' ? '1' : '0',
            }}
          >
            Courses
          </Button>
        </Col>
        <Col>
          <Button
            variant={activeSection === 'workshops' ? 'primary' : 'outline-primary'}
            onClick={() => handleSectionToggle('workshops')}
            style={{
              width: '100%',
              borderBottomLeftRadius: activeSection === 'workshops' ? '0' : '5px',
              borderBottomRightRadius: activeSection === 'workshops' ? '0' : '5px',
              zIndex: activeSection === 'workshops' ? '1' : '0',
            }}
          >
            Workshops
          </Button>
        </Col>
      </Row>
      <Row>
        {activeSection === 'courses' && (
          <Container>
            <Row>
              {courses.length > 0 ? (
                courses.map((purchase) => (
                  <Col key={purchase.purchaseId} md={3} className="mb-4"> {/* 4 cards per row */}
                    <PurchasedCourseCard course={purchase.course} />
                  </Col>
                ))
              ) : (
                <p>No Courses Purchased</p>
              )}
            </Row>
          </Container>
        )}

        {activeSection === 'workshops' && (
          <Container>
            <Row>
              {workshops.length > 0 ? (
                workshops.map((purchase) => (
                  <Col key={purchase.purchaseId} md={3} className="mb-4"> {/* 4 cards per row */}
                    <PurchasedWorkshopCard workshop={purchase.workshop} />
                  </Col>
                ))
              ) : (
                <p>No Workshops Purchased</p>
              )}
            </Row>
          </Container>
        )}
      </Row>
    </Container>
  );
};

export default PurchasesOverview;

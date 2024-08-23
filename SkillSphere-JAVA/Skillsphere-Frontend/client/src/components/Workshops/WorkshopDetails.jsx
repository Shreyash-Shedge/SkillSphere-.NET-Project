import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Row, Col, Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getWorkshop } from '../../api/auth';
import '../Purchases/Consultations/PurchasedConsultationDetails.css';

const WorkshopDetails = () => {
  const { workshopId } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const creatorId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await getWorkshop(creatorId, workshopId, token);
        setWorkshop(response.data);
      } catch (error) {
        console.error('Failed to fetch workshop data.');
      }
    };

    fetchWorkshop();
  }, [workshopId, creatorId, token]);

  if (!workshop) {
    return <p>Loading workshop details...</p>;
  }

  const events = [
    {
      title: workshop.title,
      start: `${workshop.startDate}T${workshop.startTime}`,
      end: `${workshop.endDate}T${workshop.endTime}`,
    },
  ];

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="shadow-lg mb-4" style={{ border: 'none', borderRadius: '20px', overflow: 'hidden', height: '100%' }}>
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
              </ListGroup>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              Register before: {new Date(workshop.registrationDeadline).toLocaleString()}
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg mb-4" style={{ border: 'none', borderRadius: '20px', overflow: 'hidden' }}>
            <Card.Body style={{ padding: '30px' }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  start: 'title',
                  center: '',
                  end: 'today prev,next',
                }}
                events={events}
                height="auto"
                contentHeight="400px"
                slotMinTime="00:00:00"
                slotMaxTime="24:00:00"
                scrollTime="00:00:00"
                slotDuration="01:00:00"
                slotLabelInterval="01:00:00"
                allDaySlot={false}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkshopDetails;

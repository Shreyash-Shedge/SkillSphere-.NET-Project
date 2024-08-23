import '../Purchases/Consultations/PurchasedConsultationDetails.css'; // Custom CSS for styling

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getConsultation } from '../../api/auth';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Row, Col, Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const ConsultationDetails = () => {
  const { consultationId } = useParams();
  const [consultation, setConsultation] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const creatorId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await getConsultation(creatorId, consultationId, token);
        setConsultation(response.data);
      } catch (error) {
        console.error('Failed to fetch consultation data.');
      }
    };

    fetchConsultation();
  }, [consultationId, creatorId, token]);

  if (!consultation) {
    return <p>Loading consultation details...</p>;
  }

  const events = [
    {
      title: consultation.title,
      start: `${consultation.startDate}T${consultation.startTime}`,
      end: `${consultation.endDate}T${consultation.endTime}`,
    },
  ];

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="shadow-lg mb-4" style={{ border: 'none', borderRadius: '20px', overflow: 'hidden', height: 'auto' }}>
            <Card.Body style={{ backgroundColor: '#f0f8ff', padding: '20px' }}>
              <Card.Title className="text-center" style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#007bff' }}>
                {consultation.title}
              </Card.Title>
              <Card.Text className="text-center" style={{ fontStyle: 'italic', color: '#555' }}>
                {consultation.description}
              </Card.Text>
              <ListGroup variant="flush" style={{ backgroundColor: '#f7f7f7', marginTop: '10px' }}>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>Duration:</span>
                  <span>{consultation.duration} minutes</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>Slots per User:</span>
                  <span>{consultation.slotsPerUser}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>Platform:</span>
                  <span>{consultation.callPlatform}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>Start Date:</span>
                  <span>{new Date(consultation.startDate).toLocaleDateString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>End Date:</span>
                  <span>{new Date(consultation.endDate).toLocaleDateString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>Start Time:</span>
                  <span>{consultation.startTime}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>End Time:</span>
                  <span>{consultation.endTime}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold', padding: '10px' }}>
                  <span>External Link:</span>
                  <span>
                    <a href={consultation.externalLink} target="_blank" rel="noopener noreferrer">
                      Join Consultation
                    </a>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg mb-4" style={{ border: 'none', borderRadius: '20px', overflow: 'hidden', height: 'auto' }}>
            <Card.Body style={{ padding: '20px' }}>
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
                contentHeight="300px"
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

export default ConsultationDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPurchasedConsultationDetails } from '../../../api/auth';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Row, Col, Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './PurchasedConsultationDetails.css'; // Add this line to include custom CSS

const PurchasedConsultationDetails = () => {
  const { consultationId } = useParams();
  const [consultation, setConsultation] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchConsultationDetails = async () => {
      try {
        const consultationData = await getPurchasedConsultationDetails(userId, consultationId, token);
        setConsultation(consultationData);
      } catch (error) {
        console.error('Failed to fetch consultation details.');
      }
    };

    fetchConsultationDetails();
  }, [consultationId, userId, token]);

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
          <Card className="shadow-lg mb-4" style={{ border: 'none', borderRadius: '20px', overflow: 'hidden', height: '100%' }}>
            <Card.Body style={{ backgroundColor: '#f0f8ff', padding: '30px' }}>
              <Card.Title className="text-center" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
                {consultation.title}
              </Card.Title>
              <Card.Text className="text-center" style={{ fontStyle: 'italic', color: '#555' }}>
                <div dangerouslySetInnerHTML={{ __html: consultation.description }} />
              </Card.Text>
              <ListGroup variant="flush" style={{ backgroundColor: '#f7f7f7', marginTop: '20px' }}>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                  <span>Duration:</span>
                  <span>{consultation.duration} minutes</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                  <span>Slots per User:</span>
                  <span>{consultation.slotsPerUser}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                  <span>Platform:</span>
                  <span>{consultation.callPlatform}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                  <span>Start Date:</span>
                  <span>{new Date(consultation.startDate).toLocaleDateString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                  <span>End Date:</span>
                  <span>{new Date(consultation.endDate).toLocaleDateString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                  <span>Start Time:</span>
                  <span>{consultation.startTime}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                  <span>End Time:</span>
                  <span>{consultation.endTime}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
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

export default PurchasedConsultationDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-bootstrap-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import { Editor } from '@tinymce/tinymce-react';
import { createWorkshop, getWorkshop, updateWorkshop } from '../../api/auth';
import { setLastCreatedWorkshopId } from '../../store/authSlice';

const WorkshopForm = () => {
  const { workshopId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    callPlatform: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: 0,
    endTime: 0,
    externalLink: '',
    price: '',
    topicsCovered: [],
    maxParticipants: '',
    registrationDeadline: new Date(),
  });
  const token = useSelector((state) => state.auth.token);
  const creatorId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = Boolean(workshopId);

  useEffect(() => {
    if (isEdit) {
      const fetchWorkshop = async () => {
        try {
          const response = await getWorkshop(creatorId, workshopId, token);
          setFormData({
            ...response.data,
            startDate: new Date(response.data.startDate),
            endDate: new Date(response.data.endDate),
            startTime: convertTimeToSeconds(response.data.startTime),
            endTime: convertTimeToSeconds(response.data.endTime),
            registrationDeadline: new Date(response.data.registrationDeadline),
          });
        } catch (error) {
          console.error('Failed to fetch workshop data.');
        }
      };

      fetchWorkshop();
    }
  }, [isEdit, workshopId, creatorId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleTimeChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      description: content.replace(/\n/g, ''),
    });
  };

  const convertTimeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const convertSecondsToTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        startDate: formData.startDate.toISOString().split('T')[0],
        endDate: formData.endDate.toISOString().split('T')[0],
        startTime: convertSecondsToTime(formData.startTime),
        endTime: convertSecondsToTime(formData.endTime),
        registrationDeadline: formData.registrationDeadline.toISOString(),
      };

      let response;
      if (isEdit) {
        response = await updateWorkshop(creatorId, workshopId, dataToSend, token);
      } else {
        response = await createWorkshop(creatorId, dataToSend, token);
        const newWorkshopId = response.data.workshopId;
        dispatch(setLastCreatedWorkshopId(newWorkshopId)); // Store in Redux
        console.log(`New Workshop ID: ${newWorkshopId}`);
      }

      navigate('/creator-dashboard/workshops');
    } catch (error) {
      console.error('Failed to submit the form.', error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="p-4 border rounded shadow bg-white">
        <h2>{isEdit ? 'Edit' : 'Create'} Workshop</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="duration">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="callPlatform">
                <Form.Label>Call Platform</Form.Label>
                <Form.Control
                  type="text"
                  name="callPlatform"
                  value={formData.callPlatform}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="externalLink">
                <Form.Label>External Link</Form.Label>
                <Form.Control
                  type="url"
                  name="externalLink"
                  value={formData.externalLink}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Editor
              apiKey="4bdmeb9rspr0fo73ayz1gggbzy9eri4lp57hcyba1ivbh84d"
              value={formData.description}
              init={{
                height: 300,
                menubar: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
                branding: false,
              }}
              onEditorChange={handleEditorChange}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => handleDateChange(date, 'endDate')}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="startTime">
                <Form.Label>Start Time</Form.Label>
                <TimePicker
                  start="00:00"
                  end="23:59"
                  step={30}
                  value={formData.startTime}
                  onChange={(value) => handleTimeChange(value, 'startTime')}
                  className="form-control"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endTime">
                <Form.Label>End Time</Form.Label>
                <TimePicker
                  start="00:00"
                  end="23:59"
                  step={30}
                  value={formData.endTime}
                  onChange={(value) => handleTimeChange(value, 'endTime')}
                  className="form-control"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="topicsCovered">
            <Form.Label>Topics Covered</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="topicsCovered"
              value={formData.topicsCovered.join(', ')}
              onChange={(e) => setFormData({ ...formData, topicsCovered: e.target.value.split(',').map(topic => topic.trim()) })}
              required
            />
          </Form.Group>
          <Form.Group controlId="maxParticipants">
            <Form.Label>Max Participants</Form.Label>
            <Form.Control
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="registrationDeadline">
            <Form.Label>Registration Deadline</Form.Label>
            <DatePicker
              selected={formData.registrationDeadline}
              onChange={(date) => handleDateChange(date, 'registrationDeadline')}
              dateFormat="yyyy-MM-dd HH:mm"
              className="form-control"
              showTimeSelect
              timeFormat="HH:mm"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4">
            {isEdit ? 'Update' : 'Create'} Workshop
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default WorkshopForm;

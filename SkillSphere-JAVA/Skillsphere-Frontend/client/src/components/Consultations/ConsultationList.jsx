import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConsultations, deleteConsultation } from '../../api/auth';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import toastr from 'toastr';

const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const creatorId = useSelector((state) => state.auth.id); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await getConsultations(creatorId, token);
        setConsultations(response.data);
      } catch (error) {
        toastr.error('Failed to fetch consultations.');
      }
    };

    fetchConsultations();
  }, [creatorId, token]);

  const handleDelete = async (consultationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteConsultation(creatorId, consultationId, token);
          setConsultations(consultations.filter(c => c.consultationId !== consultationId));
          toastr.success('Consultation deleted successfully.');
        } catch (error) {
          toastr.error('Failed to delete consultation.');
        }
      }
    });
  };

  const handleEdit = (consultationId) => {
    if (consultationId) {
      navigate(`/creator-dashboard/consultations/${consultationId}/edit`);
    } else {
      console.error('No consultation ID found.');
    }
  };

  const handleView = (consultationId) => {
    if (consultationId) {
      navigate(`/creator-dashboard/consultations/${consultationId}`);
    } else {
      console.error('No consultation ID found.');
    }
  };

  return (
    <div className="container mt-4">
      <Button className="mb-3" onClick={() => navigate('/creator-dashboard/consultations/create')}>
        + Create Consultation
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Slots per User</th>
            <th>Platform</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map(consultation => (
            <tr key={consultation.consultationId}>
              <td>{consultation.consultationId}</td>
              <td>{consultation.title}</td>
              <td>{consultation.duration} minutes</td>
              <td>{consultation.slotsPerUser}</td>
              <td>{consultation.callPlatform}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleView(consultation.consultationId)}
                  className="me-2"
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(consultation.consultationId)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(consultation.consultationId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ConsultationList;

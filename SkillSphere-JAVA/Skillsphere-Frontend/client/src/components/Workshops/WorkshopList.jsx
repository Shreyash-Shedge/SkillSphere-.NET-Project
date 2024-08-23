import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { deleteWorkshop, getWorkshops } from '../../api/auth';

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const creatorId = useSelector((state) => state.auth.id); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await getWorkshops(creatorId, token);
        setWorkshops(response.data);
      } catch (error) {
        toastr.error('Failed to fetch workshops.');
      }
    };

    fetchWorkshops();
  }, [creatorId, token]);

  const handleDelete = async (workshopId) => {
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
          await deleteWorkshop(creatorId, workshopId, token);
          setWorkshops(workshops.filter(w => w.workshopId !== workshopId));
          toastr.success('Workshop deleted successfully.');
        } catch (error) {
          toastr.error('Failed to delete workshop.');
        }
      }
    });
  };

  const handleEdit = (workshopId) => {
    navigate(`/creator-dashboard/workshops/${workshopId}/edit`);
  };

  const handleView = (workshopId) => {
    navigate(`/creator-dashboard/workshops/${workshopId}`);
  };

  return (
    <div className="container mt-4">
      <Button className="mb-3" onClick={() => navigate('/creator-dashboard/workshops/create')}>
        + Create Workshop
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Max Participants</th>
            <th>Platform</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workshops.map(workshop => (
            <tr key={workshop.workshopId}>
              <td>{workshop.workshopId}</td>
              <td>{workshop.title}</td>
              <td>{workshop.duration} minutes</td>
              <td>{workshop.maxParticipants}</td>
              <td>{workshop.callPlatform}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleView(workshop.workshopId)}
                  className="me-2"
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(workshop.workshopId)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(workshop.workshopId)}
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

export default WorkshopList;

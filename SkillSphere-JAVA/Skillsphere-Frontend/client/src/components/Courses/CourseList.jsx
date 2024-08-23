import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCourses, deleteCourse } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await getCourses(token);
      if (response.data && Array.isArray(response.data)) {
        setCourses(response.data);
        setFilteredCourses(response.data);
      } else {
        toastr.error("Failed to fetch courses. Unexpected response format.");
      }
    } catch (error) {
      toastr.error("Error fetching courses.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(keyword) ||
      course.description.toLowerCase().includes(keyword)
    );
    setFilteredCourses(filtered);
  };

  const handleDelete = async (courseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCourse(courseId, token);
          toastr.success("Course deleted successfully!");
          fetchCourses(); // Refresh the course list
        } catch (error) {
          toastr.error("Failed to delete course.");
        }
      }
    });
  };

  return (
    <Container className="my-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <Button variant="primary" onClick={() => navigate("create-courses")}>
            Create Course
          </Button>
        </div>

        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search for courses..."
            onChange={handleSearch}
          />
        </Form>

        <Row className="gx-2 gy-3 justify-content-start">
          {filteredCourses.map((course) => (
            <Col key={course.courseId} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
              <Card className="h-100 shadow-sm" style={{ margin: "auto", width: "220px" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:8080/thumbnails/${course.thumbnailImage.split('\\').pop()}`}
                  alt={course.title}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center" style={{ fontSize: "1rem" }}>{course.title}</Card.Title>
                  <Card.Text className="text-center flex-grow-1" style={{ fontSize: "0.875rem" }}>
                    {course.description}
                  </Card.Text>
                  <Card.Text className="text-center" style={{ fontSize: "0.875rem" }}>
                    <strong>Price:</strong> ${course.price}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between mb-2">
                    <Button
                      variant="primary"
                      style={{ fontSize: "0.75rem", width: "48%" }}
                      onClick={() => navigate(`/creator-dashboard/courses/${course.courseId}/edit`)}
                    >
                      Edit Course
                    </Button>
                    <Button
                      variant="danger"
                      style={{ fontSize: "0.75rem", width: "48%" }}
                      onClick={() => handleDelete(course.courseId)}
                    >
                      Delete Course
                    </Button>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="success"
                      style={{ fontSize: "0.75rem", width: "48%" }}
                      onClick={() => navigate(`/creator-dashboard/courses/${course.courseId}/add-modules`)}
                    >
                      Add Modules
                    </Button>
                    <Button
                      variant="info"
                      style={{ fontSize: "0.75rem", width: "48%" }}
                      onClick={() => navigate(`/creator-dashboard/courses/${course.courseId}/modules`)}
                    >
                      View Modules
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default CourseList;

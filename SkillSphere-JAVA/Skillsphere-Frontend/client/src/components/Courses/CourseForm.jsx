import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createCourse, updateCourse, getCourseById } from "../../api/auth";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Button, Container, Row, Col, Alert, Form as BootstrapForm } from "react-bootstrap";

const CourseForm = () => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    price: "",
    thumbnailImage: null,
  });
  const [serverErrors, setServerErrors] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const creatorId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await getCourseById(courseId, token);
      const { title, description, price, thumbnailImage } = response.data;
      setInitialValues({
        title,
        description,
        price,
        thumbnailImage,
      });
    } catch (error) {
      toastr.error("Failed to load course details.");
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/webp" || file.type === "image/png")) {
      setFieldValue("thumbnailImage", file);
    } else {
      toastr.error("Invalid file type. Only .jpg, .webp, and .png are allowed.");
      setFieldValue("thumbnailImage", null);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerErrors([]);
    const courseData = {
      title: values.title,
      description: values.description,
      price: parseFloat(values.price),
    };
  
    const formData = new FormData();
    formData.append("data", JSON.stringify(courseData));
    if (values.thumbnailImage) {
      formData.append("thumbnailImage", values.thumbnailImage);
    }
  
    try {
      if (courseId) {
        await updateCourse(courseId, formData, token);
        toastr.success("Course updated successfully!");
      } else {
        await createCourse(creatorId, formData, token);
        toastr.success("Course created successfully!");
      }
      navigate("/creator-dashboard/courses");
    } catch (error) {
      console.error("Error saving course:", error);
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessages = extractErrorMessages(error.response.data.message);
        setServerErrors(errorMessages);
      } else {
        toastr.error("Failed to save course.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  const extractErrorMessages = (errorMessage) => {
    const matches = errorMessage.match(/messageTemplate='([^']+)'/g);
    return matches ? matches.map((msg) => msg.replace("messageTemplate=", "").replace(/'/g, "")) : [];
  };

  return (
    <Container className="course-form bg-white p-4 rounded shadow-md mt-4 border border-gray-300">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">{courseId ? "Edit Course" : "Create New Course"}</h2>
          {serverErrors.length > 0 && (
            <Alert variant="danger">
              <ul className="mb-0">
                {serverErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Course Title</BootstrapForm.Label>
                  <Field
                    name="title"
                    type="text"
                    className="form-control"
                    required
                  />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Description</BootstrapForm.Label>
                  <Field
                    name="description"
                    as="textarea"
                    className="form-control"
                    required
                  />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Price</BootstrapForm.Label>
                  <Field
                    name="price"
                    type="number"
                    className="form-control"
                    required
                  />
                  <ErrorMessage name="price" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Thumbnail Image (.jpg, .webp, .png only)</BootstrapForm.Label>
                  <input
                    name="thumbnailImage"
                    type="file"
                    accept=".jpg,.webp,.png"
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    className="form-control"
                    required={!courseId} // Only required when creating a new course
                  />
                  <ErrorMessage name="thumbnailImage" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <div className="d-grid">
                  <Button variant="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : courseId ? "Update" : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseForm;

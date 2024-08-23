import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addModule, updateModule, getModuleById } from "../../api/auth";
import { useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Button, Container, Row, Col, Alert, Form as BootstrapForm } from "react-bootstrap";

const ModuleForm = () => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
  });
  const [serverErrors, setServerErrors] = useState("");
  const token = useSelector((state) => state.auth.token);
  const { courseId, moduleId } = useParams(); // Get courseId and moduleId from params
  const navigate = useNavigate();

  useEffect(() => {
    if (moduleId) {
      fetchModuleDetails(courseId, moduleId);
    }
  }, [courseId, moduleId]);

  const fetchModuleDetails = async (courseId, moduleId) => {
    try {
      const response = await getModuleById(courseId, moduleId, token);
      const { title, content } = response.data;
      setInitialValues({
        title,
        content,
      });
    } catch (error) {
      toastr.error("Failed to load module details.");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerErrors("");
    const moduleData = {
      title: values.title,
      content: values.content,
    };

    try {
      if (moduleId) {
        await updateModule(courseId, moduleId, moduleData, token);
        toastr.success("Module updated successfully!");
      } else {
        await addModule(courseId, moduleData, token);
        toastr.success("Module added successfully!");
      }
      navigate(`/creator-dashboard/courses/${courseId}/modules`);
    } catch (error) {
      console.error("Error saving module:", error);

      // Extract and display the first error message
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = extractErrorMessage(error.response.data.message);
        setServerErrors(errorMessage);
      } else {
        toastr.error("Failed to save module.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const extractErrorMessage = (errorMessage) => {
    const match = errorMessage.match(/First error: (.+)/);
    return match ? match[1] : "An error occurred.";
  };

  return (
    <Container className="module-form bg-white p-4 rounded shadow-md mt-4 border border-gray-300">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">{moduleId ? "Edit Module" : "Add Module"}</h2>
          {serverErrors && (
            <Alert variant="danger">
              {serverErrors}
            </Alert>
          )}
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Module Title</BootstrapForm.Label>
                  <Field
                    name="title"
                    type="text"
                    className="form-control"
                    required
                  />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Content</BootstrapForm.Label>
                  <Field
                    name="content"
                    as="textarea"
                    className="form-control"
                    required
                  />
                  <ErrorMessage name="content" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <div className="d-grid">
                  <Button variant="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : moduleId ? "Update" : "Submit"}
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

export default ModuleForm;

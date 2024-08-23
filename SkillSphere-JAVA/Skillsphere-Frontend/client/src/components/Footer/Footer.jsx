import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const logoStyle = {
  width: "2.5rem",
  height: "auto",
  cursor: "pointer",
};

const Footer = () => {
  return (
    <footer className="bg-light py-5" >
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <img src="/logo.webp" style={logoStyle} alt="logo of app" />
            <p className="text-muted mt-3">Learn something new every day.</p>
            <div className="d-flex gap-2 mt-3">
              <Button variant="dark" className="rounded-circle">
                <i className="bi bi-twitter"></i>
              </Button>
              <Button variant="dark" className="rounded-circle">
                <i className="bi bi-facebook"></i>
              </Button>
              <Button variant="dark" className="rounded-circle">
                <i className="bi bi-instagram"></i>
              </Button>
              <Button variant="dark" className="rounded-circle">
                <i className="bi bi-github"></i>
              </Button>
            </div>
          </Col>
          <Col md={2}>
            <h6 className="text-uppercase text-muted">Company</h6>
            <ul className="list-unstyled" >
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>About</a>
              </li>
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>Features</a>
              </li>
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>Works</a>
              </li>
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>Career</a>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h6 className="text-uppercase text-muted">Help</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>Customer Support</a>
              </li>
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>Delivery Details</a>
              </li>
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-dark"  style={{ textDecoration: 'none' }}>Privacy Policy</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="text-uppercase text-muted">Subscribe to newsletter</h6>
            <Form className="mt-3">
              <Form.Group controlId="email">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Button variant="primary" className="mt-3">Subscribe</Button>
            </Form>
          </Col>
        </Row>
        <hr className="mt-5" />
        <p className="text-center text-muted">
          © 2024 Skillsphere, All Rights Reserved
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

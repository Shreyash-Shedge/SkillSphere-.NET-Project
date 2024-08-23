// "use client";

import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CardHoverEffect from "../ui/CardHoverEffect.jsx"

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Container fluid className="px-5 pt-5" style={{ scrollBehavior: 'smooth' }}>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center py-5">
            <h1 className="display-4 font-weight-bold mb-4">Empower Your Passion, Share Your Expertise.</h1>
            <p className="lead text-muted mb-5">
              SkillSphere is a dynamic platform driven by cutting-edge technology, designed to enhance your learning journey. Discover a wide range of courses, connect with expert content creators, and gain new skills effortlessly.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/signup-user">
                <Button variant="primary" className="px-4 py-2">Enroll Now</Button>
              </Link>
              <Link to="/signup-creator">
                <Button variant="primary" className="px-4 py-2">Join as a Creator</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <CardHoverEffect />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Nav, Row } from "react-bootstrap";

const Header = () => {
  return (
    <div className="main-header-container">
      <Container fluid style={{ width: "95%" }}>
        <Row>
          <Col xs="auto">
            <div>
              <Link
                to="/"
                className="nav-link active"
                style={{ fontWeight: "bold"}}
              >
                VTAssessment
              </Link>
            </div>
          </Col>
          <Col>
            <Nav activeKey="/">
              <Nav.Item>
                <Link to="/teams" className="nav-link">
                  Teams
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/reports" className="nav-link">
                  Reports
                </Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;

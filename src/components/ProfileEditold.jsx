import React from "react";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProfilePic from "./profileImage.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdateProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

const ProfileEdit = () => (
  <>
    <Container>
      <h3>Update Profile 1/3</h3>

      <hr />

      {/* image */}

      <img id="profilePicEdit" src={ProfilePic} alt="" />
      <Row className="justify-content-end">
        <Col>
          <FontAwesomeIcon id="DpEditIcon" icon={faPenSquare} size={"2x"} />
        </Col>
      </Row>

      {/* image */}

      {/* form */}
      <Form>
        {/* First name & last name */}
        <Row>
          {/* First name */}
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name*</Form.Label>
              <Form.Control type="email" placeholder="" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Col>
          {/* First name */}

          {/* last name */}
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
          </Col>
          {/* last name */}
        </Row>
        {/* First name & last name */}

        <Row>
          <Col md={{ span: 3, offset: 3 }}>
            <p>I am currently</p>
          </Col>

          <Col xs={12} md={4}>
            <Form>
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={"A student"}
                  />

                  <Form.Check
                    type={type}
                    label={"A teacher"}
                    id={`disabled-default-${type}`}
                  />
                </div>
              ))}
            </Form>
          </Col>
        </Row>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Education</Form.Label>
          <Form.Control placeholder="Select a school" as="select">
            <option>Select a school</option>
            <option>University of Toronto</option>
            <option>Memorial University</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Current Position</Form.Label>
          <Form.Control
            type="email"
            placeholder="e.g Software Developer at IBM"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Country / Region</Form.Label>
              <Form.Control placeholder="Select country" as="select">
                <option>Select country</option>
                <option>Canada</option>
                <option>Bangladesh</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="password" placeholder="Enter ZIP Code" />
            </Form.Group>
          </Col>
        </Row>

        {/* next button */}
        <Row className="justify-content-end">
          <Button id="nextBtn" type="submit">
            Next
          </Button>
        </Row>

        {/* next button */}
      </Form>

      {/* form */}
    </Container>
  </>
);

export default ProfileEdit;

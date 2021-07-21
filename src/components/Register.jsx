import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { config } from "src/helpers/config.js";
import axios from "axios";
import "src/assets/css/registerPage.css";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      student: 0,
      teacher: 0,
      errors: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      error_message: "",
    };

    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateCheckbox(e) {
    let value = 0;
    if (this.state[e.target.name] === 0) {
      value = 1;
    } else {
      value = 0;
    }
    this.setState({ [e.target.name]: value });
  }

  register(e) {
    // Simple POST request with a JSON body using fetch
    // POST request using fetch with error handling
    e.preventDefault();
    let self = this;
    axios
      .post(config.apiUrl + "/api/register", this.state)
      .then(function (res) {
        //console.log(res.data);
        self.props.loginAfterRegistered(res.data.access_token, res.data.user);
      })
      .catch(function (error) {
        console.error("Registration failed. " + error);
        //console.log(error.response);
        if (error.response.data.errors !== undefined) {
          self.setState({ errors: error.response.data.errors });
        } else {
          self.setState({ error_message: "Registration failed." });
        }
      });
  }

  render() {
    return (
      <>
        <div className="registerPage">
          <Container>
            <Row>
              <Col md="6" className="leftColumn">
                <div>
                  <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus dui quam, aliquam vitae.
                  </h2>
                  <p>
                    Suspendisse condimentum nulla eu massa fringilla tempor.
                    Mauris et rutrum erat. Duis blandit, est ac aliquam viverra,
                    arcu nibh lacinia nibh, vel rhoncus urna lorem dignissim
                    felis. Nam egestas quam arcu, id viverra ante eleifend
                    vitae. Mauris congue, ligula in iaculis rhoncus, mauris
                    justo porta massa, quis interdum leo odio a velit. Proin
                    tellus nunc, euismod at ornare sit amet, dapibus sit amet
                    augue.
                  </p>
                </div>
              </Col>
              <Col md="6" className="rightColumn">
                <Form>
                  <>
                    {/* Name */}
                    <Form.Group>
                      <Form.Label>Name:</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                      <Form.Text className="text-danger">
                        {this.state.errors.first_name}
                      </Form.Text>
                      <Form.Text className="text-danger">
                        {this.state.errors.last_name}
                      </Form.Text>
                    </Form.Group>
                    {/* Name */}
                    {/* email */}
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email Address:</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={this.onChange}
                      />
                      <Form.Text className="text-danger">
                        {this.state.errors.email}
                      </Form.Text>
                    </Form.Group>
                    {/* email */}
                    {/* username */}
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        onChange={this.onChange}
                      />
                      <Form.Text className="text-danger">
                        {this.state.errors.username}
                      </Form.Text>
                    </Form.Group>
                    {/* username */}
                    {/* password */}
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange}
                      />
                      <Form.Text className="text-danger">
                        {this.state.errors.password}
                      </Form.Text>
                    </Form.Group>
                    {/* password */}
                    {/* retype password */}
                    <Form.Group controlId="formBasicRePassword">
                      <Form.Label>Confirm Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="password_confirmation"
                        onChange={this.onChange}
                      />
                    </Form.Group>
                    {/* retype password */}

                    <Form.Group controlId="student" style={{ margin: 0 }}>
                      Are you a?
                      <Form.Check
                        type="checkbox"
                        name="student"
                        label="Student"
                        onChange={this.updateCheckbox}
                      />
                    </Form.Group>
                    <Form.Group controlId="teacher">
                      <Form.Check
                        type="checkbox"
                        name="teacher"
                        label="Teacher"
                        onChange={this.updateCheckbox}
                      />
                    </Form.Group>

                    {/* register button */}
                    <Form.Group controlId="submit">
                      <Button
                        id="uploadBtn"
                        variant="danger"
                        onClick={this.register}
                        type="submit"
                      >
                        Register
                      </Button>
                      <Form.Text className="text-danger">
                        {this.state.error_message}
                      </Form.Text>
                    </Form.Group>
                    {/* register button */}
                  </>
                </Form>

                {/* sign in button */}
                <p>
                  Already Registered? <a href="/login">Sign In.</a>
                </p>
                {/* sign in button */}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Register;

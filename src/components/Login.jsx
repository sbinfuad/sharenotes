import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { config } from "src/helpers/config";
import "src/assets/css/login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
      error_message: "",
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    let self = this;
    axios
      .post(config.apiUrl + "/api/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("sharenotes-jwt", res.data.access_token);
        self.props.loginAfterRegistered(res.data.access_token, res.data.user);
      })
      .catch(function (err) {
        if (
          err.response !== undefined &&
          err.response.data !== undefined &&
          err.response.data.message !== undefined
        ) {
          self.setState({
            errors: err.response.data.errors,
            error_message: err.response.data.message,
          });
        }
        localStorage.removeItem("sharenotes-jwt");
        console.log("Error in login");
      });
  }

  render() {
    return (
      <>
        <div className="login-page">
          {" "}
          <Container>
            <Row>
              <Col md={3}></Col>
              <Col md={6} className="login-box">
                <Form>
                  {/* username */}
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.change}
                    />
                  </Form.Group>
                  {/* username */}
                  {/* password */}
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      onChange={this.change}
                    />
                  </Form.Group>
                  {/* password */}
                  <Form.Group controlId="submit">
                    <Button
                      id="uploadBtn"
                      variant="danger"
                      onClick={this.submit}
                      type="submit"
                    >
                      Login
                    </Button>
                    <Form.Text className="text-danger">
                      {this.state.error_message}
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Login);

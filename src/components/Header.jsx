import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import logo from "src/assets/images/logo.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { config } from "src/helpers/config";

import "src/assets/css/header.css";

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar id="navbar" expand="lg">
          <Navbar.Brand href="/">
            <img id="logo" src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle
            id="navbarToggleIcon"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Row className="justify-content-center">
                  <Col lg={11}>
                    <InputGroup className="seachBar">
                      <FormControl
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchbar"
                      />
                      <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">
                          <FontAwesomeIcon icon={faSearch} />
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Row>
              </Nav.Link>

              <Nav.Link>
                <Row className="justify-content-md-center">
                  <Col md={12}>
                    <Dropdown className="filterButtonContainer">
                      <Dropdown.Toggle variant="success" id="filterBtn">
                        Filter
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <FormControl
                          className="navFilter"
                          type="text"
                          placeholder="Enter School Name"
                        />

                        <FormControl
                          className="navFilter"
                          type="text"
                          placeholder="Enter Course Name"
                        />

                        <FormControl
                          className="navFilter"
                          type="text"
                          placeholder="Enter Subject"
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Nav.Link>

              <Row>
                <Col>
                  <Nav.Link href="#home">
                    <Button id="locationBtn" variant="danger">
                      <FontAwesomeIcon id="locationIcon" icon={faCompass} /> St.
                      John's
                    </Button>
                  </Nav.Link>
                </Col>
              </Row>
            </Nav>

            <Nav className="justify-content-end" activeKey="/home">
              
              {this.props.appState.authenticated ? (
                <>
                <Nav.Item>
                <Nav.Link >
                  <Button
                    onClick={() =>  window.open(`/user/${this.props.appState.user.username}/dashboard`)}
                    // href={`/user/${this.props.appState.user.username}/dashboard}`}
                    id="uploadBtn"
                    variant="danger"
                    className="justify-content-lg-end"
                    
                  >
                    Upload
                  </Button>
                </Nav.Link>
              </Nav.Item>
               
                  <Nav.Item>
                    <Dropdown className="nav-link">
                      <Dropdown.Toggle variant="primary" id="profileBtn">
                        <img
                          id="profilePic"
                          src={config.apiUrl + this.props.appState.user.avatar}
                          alt=""
                        />
                        {this.props.appState.user.first_name}{" "}
                        {this.props.appState.user.last_name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu-right">
                        <Dropdown.Item
                          href={`/user/${this.props.appState.user.username}`}
                        >
                          My Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          href={`/user/${this.props.appState.user.username}/dashboard`}
                        >
                          Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={this.props.logout}>
                          Log out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                  
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link href="/register">
                      <Button id="profileBtn" variant="primary">
                        Register
                      </Button>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/login">
                      <Button id="profileBtn" variant="primary">
                        Login
                      </Button>
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Header;

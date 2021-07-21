import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Dashboard from "src/components/Dashboard"
import { config } from "src/helpers/config.js";
import axios from "axios";
import { getJwt } from "src/helpers/auth";

class Courseform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            description:"",
            school_name:"",
            price:"",
            showCourseList: false,
            anonymous: 0,
            errors: {
                name: "",
                price:"",
              },
              error_message: "",
        };

        this.onChange = this.onChange.bind(this);
        this._onDashboardClick = this._onDashboardClick.bind(this);

    }

    _onDashboardClick() {
        this.setState({
            showCourseList: true,
        });
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        let self = this;

        //grabs the access token stored in local storage
        const jwt = getJwt();

        //FormData is required to upload files
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("description", this.state.description);
        data.append("school_name", this.state.school_name);
        data.append("price", this.state.price);
        data.append("anonymous", this.state.anonymous);

        axios.post(config.apiUrl + "/api/courses", data,
        {
          headers: { Authorization: `Bearer ${jwt}` },
          Accept: "application/json",
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

      // register(e) {
    //     // Simple POST request with a JSON body using fetch
    //     // POST request using fetch with error handling
    //     e.preventDefault();
    //     let self = this;
    //     axios
    //       .post(config.apiUrl + "/api/register", this.state)
    //       .then(function (res) {
    //         //console.log(res.data);
    //         self.props.loginAfterRegistered(res.data.access_token, res.data.user);
    //       })
    //       .catch(function (error) {
    //         console.error("Registration failed. " + error);
    //         //console.log(error.response);
    //         if (error.response.data.errors !== undefined) {
    //           self.setState({ errors: error.response.data.errors });
    //         } else {
    //           self.setState({ error_message: "Registration failed." });
    //         }
    //       });
    //   }

    render() {
        return (
            <>
                <div className="profile">
                <Row className="no-margin">
                    <Col md={1} className="column-first ">
                        <Container fluid>
                            <Row className="justify-content-md-center">
                                <Col >
                                    <div ><Button id="dashbtn" variant="light" href={`/user/${this.props.appState.user.username}/dashboard`}
                                    onClick={this._onDashboardClick} 
                                    >
                                    Dashboard</Button> 
                                    </div>
                                </Col>

                            </Row>
                            <Row className="justify-content-md-center">
                                <Col >
                                    <div ><Button id="addcoursebtn" variant="light" onClick={this._onAddCourseClick}
                                     >
                                    Add Course
                                    </Button>

                                    </div>
                                </Col>

                            </Row>
                        </Container>
                    </Col>
                    <span className="divider" />


                    <Col>

                        <span className="dividerh" />
                        <div >
                            <Container fluid className="fill">
                                <div>
                                <Form onSubmit={this.submitHandler}>
                                    <Form.Group >
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control type="text" placeholder="" name="name" onChange={this.onChange}/>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Course Description</Form.Label>
                                        <Form.Control type="text" placeholder="" name="description" onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>School Name</Form.Label>
                                        <Form.Control type="text" placeholder="" name="school_name" onChange={this.onChange}/>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Course Price</Form.Label>
                                        <Form.Control type="text" placeholder="" name="price" onChange={this.onChange}/>
                                    </Form.Group>
                                    <Button variant="danger" type="submit">
                                        Add Course
                                    </Button>
                                </Form>
                                </div>
                                <div className="cards">
                                    {this.state.showCourseList ?
                                        <Dashboard /> :
                                        null
                                    }
                                </div>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </div>;
            </>
            );
    }
}

export default Courseform;
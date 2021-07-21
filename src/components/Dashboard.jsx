import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Courseform from "src/components/Courseform";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import CourseView from "src/components/CourseView";
import { config } from "src/helpers/config.js";
import axios from 'axios';
import { getJwt } from "src/helpers/auth";

 //custom css always stay below all styles
import "src/assets/css/dashboard.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCourseForm: false,
            showCourseList: false,
            courses: [],
        };
        this._onAddCourseClick = this._onAddCourseClick.bind(this);
        this._onDashboardClick = this._onDashboardClick.bind(this);

    }

    _onAddCourseClick() {
        this.setState({
            showCourseForm: true,
            showCourseList: false,
        });
    }

    _onDashboardClick() {
        this.setState({
            showCourseForm: false,
            showCourseList: true,
        });
    }

    componentDidMount() {

        const username = this.props.appState.user.username;
        const jwt = getJwt();

        axios.get(config.apiUrl + "/api/" + username + "/courses",
        {
            headers: { Authorization: `Bearer ${jwt}` },
          })
        .then(response => {
            console.log(response)
            this.setState({courses: response.data})
            console.log(this.state.courses);
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

            return (
                <>
                    <div className="profile">
                    <Row className="no-margin">
                        <Col md={1} className="column-first ">
                            <Container fluid>
                                <Row className="justify-content-md-center">
                                    <Col >
                                        <div ><Button id="dashbtn" variant="light" onClick={this._onDashboardClick} 
                                        >
                                        Dashboard</Button> 
                                        </div>
                                    </Col>

                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col >
                                        <div ><Button id="addcoursebtn" variant="light" href={`/user/${this.props.appState.user.username}/addcourse`}
                                        onClick={this._onAddCourseClick}
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
                                            <CourseView /> 
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

export default Dashboard;
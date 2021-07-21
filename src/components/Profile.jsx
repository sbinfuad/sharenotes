import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faGraduationCap,
  faBriefcase,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ItemCard from "src/components/ItemCard";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { config } from "src/helpers/config";
import Loading from "src/components/Loading";

import "src/assets/css/profileMain.css"; //custom css always stay below all styles

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      allowEdit: false,
    };

    this.allowEdit = this.allowEdit.bind(this);
    this.addLineBreaks = this.addLineBreaks.bind(this);
  }

  componentDidMount() {
    //console.log(this.props);
    const username = this.props.match.params.username;
    axios
      .get(config.apiUrl + "/api/username/" + username)
      .then((response) => {
        //console.log(response.data);
        if (
          this.props.authenticated &&
          this.props.appState.user.id === response.data.id
        ) {
          this.setState({ user: response.data, allowEdit: true });
        } else {
          this.setState({ user: response.data });
        }
      })
      .catch((err) => {
        this.setState({ error: err.message, user: false });
      });
  }

  allowEdit() {
    return this.state.allowEdit;
  }

  addLineBreaks(string) {
    return string.split("\n").map((text, index) => (
      <React.Fragment key={`${text}-${index}`}>
        {text}
        <br />
      </React.Fragment>
    ));
  }

  render() {
    if (this.state.user === undefined) {
      return <Loading />;
    }
    if (this.state.user === false) {
      return this.state.error;
    }
    return (
      <>
        <div className="profile">
          <Row className="no-margin">
            <Col md={2} className="column-first">
              <Container fluid>
                <div className="text-center">
                  <Image
                    id="mainprofilePic"
                    src={config.apiUrl + this.state.user.avatar}
                    roundedCircle
                  />
                  <h2 className="mHeader">
                    {this.state.user.first_name} {this.state.user.last_name}
                  </h2>
                </div>

                <p className="p1">
                  Students helped : 2651 <br></br>
                  Materials Uploaded : 32
                  <br></br>
                  Reviews: 12
                </p>
                <a href="/" className="social-links">
                  <div>
                    <div className="iconCol float-left">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className="icon-text">St. John's</div>
                    <div className="clear"></div>
                  </div>
                </a>
                <a href="/" className="social-links">
                  <div>
                    <div className="iconCol float-left">
                      <FontAwesomeIcon icon={faGraduationCap} />
                    </div>
                    <div className="icon-text">MUN</div>
                    <div className="clear"></div>
                  </div>
                </a>
                <a href="/" className="social-links">
                  <div>
                    <div className="iconCol float-left">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    <div className="icon-text">Mc Donald's</div>
                    <div className="clear"></div>
                  </div>
                </a>
                <a href="/" className="social-links">
                  <div>
                    <div className="iconCol float-left">
                      <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <div className="icon-text">sanjid.ca</div>
                    <div className="clear"></div>
                  </div>
                </a>
                {this.allowEdit() ? (
                  <Button
                    variant="light"
                    className="editProfile"
                    href={`/user/${this.state.user.username}/edit`}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  ""
                )}
              </Container>
            </Col>
            <span className="divider" />

            <Col>
              {this.state.user.description ? (
                <>
                  <Container fluid>
                    <div className="pText">
                      {this.addLineBreaks(this.state.user.description)}
                    </div>
                  </Container>
                  <span className="dividerh" />
                </>
              ) : (
                ""
              )}
              <div className="profile-background">
                <Container fluid>
                  <div className="document-type-btn">
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        All documents
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle variant="light">SORT BY</Dropdown.Toggle>

                      <Dropdown.Menu alignRight>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="cards">
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                  </div>
                </Container>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Profile;

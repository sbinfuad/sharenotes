import React from "react";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdateProfile.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Loading from "src/components/Loading";
import { config } from "src/helpers/config.js";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { getJwt } from "src/helpers/auth";
import Unauthorised from "src/components/Unauthorised";

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //method PUT is required for updating as per Laravel's requirements
      _method: "PUT",
      first_name: "",
      last_name: "",
      student: "",
      teacher: "",
      description: "",
      username: "",
      location: "",
      avatar: "", //for image
      avatar_preview: undefined, //for preview only
      errors: [],
      redirect: null,
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.onAvatarUpload = this.onAvatarUpload.bind(this);
  }

  componentDidMount() {
    //gets the username from the url
    const username = this.props.match.params.username;

    //editable checks if the user logged in is editing the profile he entered
    //will return false if he is not authenticated
    const editable = username == this.props.appState.user.username;
    this.setState({ editable: editable });

    //get request to get the data of the user
    if (editable) {
      axios
        .get(config.apiUrl + "/api/username/" + username)
        .then((response) => {
          //console.log(response.data);
          this.setState(response.data);
        })
        .catch((err) => {
          this.setState({ error: err.message });
        });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onAvatarUpload(e) {
    this.setState({
      avatar: e.target.files[0],
      avatar_preview: URL.createObjectURL(e.target.files[0]),
    });
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

  submit(e) {
    e.preventDefault();
    let self = this;

    //grabs the access token stored in local storage
    const jwt = getJwt();

    //FormData is required to upload files
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("avatar", this.state.avatar);
    data.append("first_name", this.state.first_name);
    data.append("last_name", this.state.last_name);
    data.append("student", this.state.student);
    data.append("teacher", this.state.teacher);
    data.append("location", this.state.location);
    data.append("username", this.state.username);
    data.append("description", this.state.description);

    axios
      .post(
        config.apiUrl +
          "/api/userid/" +
          this.props.appState.user.id +
          "/update",
        data,
        {
          headers: { Authorization: `Bearer ${jwt}` },
          Accept: "application/json",
        }
      )
      .then(function (res) {
        //console.log(res.data);

        //setting this state redirects user to his profile after submit is succesful
        self.setState({ redirect: "/user/" + res.data.username });
      })
      .catch(function (error) {
        console.error(error);
        console.log(error.response);
        if (error.response.data.errors !== undefined) {
          self.setState({ errors: error.response.data.errors });
        } else {
          self.setState({ error_message: "Update error" });
        }
      });
  }

  render() {
    console.log(this.state);

    //Loading page when user data is being retrieved
    if (this.state.username === undefined) {
      return <Loading />;
    }

    //Self explanatory
    if (!this.state.editable) {
      return <Unauthorised />;
    }

    //Redirect page whenever redirect in state is set
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    //if everything goes fine, return the form
    return (
      <>
        <Container>
          <Col md={{ span: 8, offset: 2 }}>
            <h3>Update Profile</h3>

            <hr />

            {/* image */}
            <Form.Group className="text-center">
              <Image
                src={
                  this.state.avatar_preview == undefined
                    ? config.apiUrl + this.state.avatar
                    : this.state.avatar_preview
                }
                alt="ProfileIMG"
                roundedCircle
                width="100px"
                height="100px"
                style={{ objectFit: "cover" }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Change profile picture: </Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                onChange={this.onAvatarUpload}
              />
            </Form.Group>

            {/* image */}

            {/* form */}
            <Form>
              <input
                type="hidden"
                name="_method"
                value="PUT"
                onChange={this.onChange}
              />
              {/* First name & last name */}
              <Row>
                {/* First name */}
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={this.state.first_name}
                      onChange={this.onChange}
                      name="first_name"
                    />
                    <Form.Text className="text-danger">
                      {this.state.errors.first_name}
                    </Form.Text>
                  </Form.Group>
                </Col>
                {/* First name */}

                {/* last name */}
                <Col>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={this.state.last_name}
                      onChange={this.onChange}
                      name="last_name"
                    />
                    <Form.Text className="text-danger">
                      {this.state.errors.last_name}
                    </Form.Text>
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
                  {["checkbox"].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check
                        type={type}
                        id={`default-${type}`}
                        label={"A student"}
                        checked={this.state.student}
                        onChange={this.updateCheckbox}
                        name="student"
                      />

                      <Form.Check
                        type={type}
                        label={"A teacher"}
                        id={`disabled-default-${type}`}
                        checked={this.state.teacher}
                        onChange={this.updateCheckbox}
                        name="teacher"
                      />
                    </div>
                  ))}
                </Col>
              </Row>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g Software Developer at IBM"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="basic-url">Username</label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                      sharenotes.org/user/
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={this.state.username}
                    name="username"
                    onChange={this.onChange}
                  />
                </InputGroup>
                <Form.Text className="text-danger">
                  {this.state.errors.username}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <label htmlFor="basic-url"> Profile Description &nbsp; </label>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  value={this.state.description}
                  name="description"
                  onChange={this.onChange}
                />
                <Form.Text className="text-danger">
                  {this.state.errors.description}
                </Form.Text>
              </Form.Group>
              &nbsp;
              {/* Finish button */}
              <Row className="justify-content-end">
                <Form.Group>
                  <Button id="nextBtn" type="submit" onClick={this.submit}>
                    Finish
                  </Button>
                </Form.Group>
              </Row>
              {/* Finish button */}
            </Form>

            {/* form */}
          </Col>
        </Container>
      </>
    );
  }
}

export default ProfileEdit;

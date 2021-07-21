import React from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

class Main extends React.Component {
  render() {
    document.title = "Share Notes";
    return (
      <>
        <Jumbotron>
          <h1>Welcome To Share Notes!!!</h1>
        </Jumbotron>
      </>
    );
  }
}

export default withRouter(Main);

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Bookpic from "./books.jpg";
import Card from "react-bootstrap/Card";
import StarRatingComponent from "react-star-rating-component";

import "src/assets/css/ItemCard.css";

class ItemCard extends React.Component {
  render() {
    return (
      <Card style={{ width: "13rem", height: "19rem", margin: "5px" }}>
        <Card.Img variant="top" src={Bookpic} className="itemCardImage" />
        <Card.Body>
          <Card.Title className="itemCardTitle">
            Lprenm ipsum dolor Title
          </Card.Title>
          <Card.Text className="p2">Some quick example text.</Card.Text>
          <div className="p2">
            <StarRatingComponent
              name="rate2"
              editing={false}
              renderStarIcon={() => <FontAwesomeIcon icon={faStar} />}
              starCount={5}
              value={4}
              className="float-left"
            />{" "}
            <div className="itemRating">
              <span className="itemRatingBold">4.2</span> (2162)
            </div>
            <div className="clear"></div>
          </div>
          <div className="text-right itemPrice">
            <Card.Link href="#" className="itemRatingBold">
              CA$ 50.00
            </Card.Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default ItemCard;

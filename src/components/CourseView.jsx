import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Courseform from "src/components/Courseform";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ItemCard from "src/components/ItemCard";

class CourseView extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <>
            <ItemCard/>
            </>
        )
    }
}

export default CourseView;
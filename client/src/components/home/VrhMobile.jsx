import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import HomeSlajd from "./HomeSlajd";

class VrhMobile extends Component {
    constructor() {
        super();
        this.state = {
            SliderData: [],
        };
    }

    componentDidMount() {
        axios
            .get(AppURL.AllSlider)
            .then((response) => {
                this.setState({ SliderData: response.data });
            })
            .catch((error) => {});
    }

    render() {
        return (
            <Fragment>
                <Container className="p-0 m-0 overflow-hidden" fluid={true}>
                    <Row className="p-0 m-0 overflow-hidden">
                        <Col lg={12} md={12} sm={12}>
                            <HomeSlajd data={this.state.SliderData} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default VrhMobile;

import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import HomeSlajd from "./HomeSlajd";
import Meni from "./Meni";
import AppURL from "../../api/AppURL";
import axios from "axios";
import SliderLoading from "../PlaceHolder/SliderLoading";

class Dno extends Component {
    constructor() {
        super();
        this.state = {
            MenuData: [],
            SliderData: [],
            isLoading: "",
            mainDiv: "d-none",
        };
    }

    componentDidMount() {
        axios
            .get(AppURL.AllCategoryDetails)
            .then((response) => {
                this.setState({ MenuData: response.data });
            })
            .catch((error) => {});
        axios
            .get(AppURL.AllSlider)
            .then((response) => {
                this.setState({
                    SliderData: response.data,
                    isLoading: "d-none",
                    mainDiv: "",
                });
            })
            .catch((error) => {});
    }
    render() {
        return (
            <Fragment>
                <SliderLoading isLoading={this.state.isLoading} />

                <div className={this.state.mainDiv}>
                    <Container className="p-0 m-0 overflow-hidden" fluid={true}>
                        <Row>
                            <Col lg={3} md={3} sm={12}>
                                <Meni data={this.state.MenuData} />
                            </Col>

                            <Col lg={9} md={9} sm={12}>
                                <HomeSlajd data={this.state.SliderData} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default Dno;

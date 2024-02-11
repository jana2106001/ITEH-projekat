import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import HomeSlajd from "./HomeSlajd";
import AppURL from "../../api/AppURL";
import axios from "axios";
import SliderLoading from "../PlaceHolder/SliderLoading";

class Vrh extends Component {
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
                            <div className="section-title text-center">
                                <h2>Dobrodošli u Auto Servis</h2>
                                <p>
                                    Projekat razvijen uz pomoć React i Laravel
                                    framework-a.
                                </p>
                            </div>
                            <HomeSlajd data={this.state.SliderData} />
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default Vrh;

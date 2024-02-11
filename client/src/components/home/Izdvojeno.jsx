import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";
import axios from "axios";
import IzdvojenoLoading from "../PlaceHolder/IzdvojenoLoading";

class Izdvojeno extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none",
        };
    }

    componentDidMount() {
        axios
            .get(AppURL.ProductListByRemark("FEATURED"))
            .then((response) => {
                this.setState({
                    ProductData: response.data,
                    isLoading: "d-none",
                    mainDiv: " ",
                });
            })
            .catch((error) => {});
    }

    render() {
        const FeaturedList = this.state.ProductData;
        const MyView = FeaturedList.map((FeaturedList, i) => {
            if (FeaturedList.special_price == "na") {
                return (
                    <Col
                        className="p-1"
                        key={1}
                        xl={2}
                        lg={2}
                        md={2}
                        sm={4}
                        xs={6}
                    >
                        <Link
                            className="text-link"
                            to={"/productdetails/" + FeaturedList.id}
                        >
                            <Card className="image-box card">
                                <img
                                    className="center"
                                    src={FeaturedList.image}
                                />
                                <Card.Body>
                                    <p className="product-name-on-card">
                                        {FeaturedList.title}
                                    </p>
                                    <p className="product-price-on-card">
                                        Price : {FeaturedList.price} dinara
                                    </p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                );
            } else {
                return (
                    <Col
                        className="p-1"
                        key={1}
                        xl={2}
                        lg={2}
                        md={2}
                        sm={4}
                        xs={6}
                    >
                        <Link
                            className="text-link"
                            to={"/productdetails/" + FeaturedList.id}
                        >
                            <Card className="image-box card">
                                <img
                                    className="center"
                                    src={FeaturedList.image}
                                />
                                <Card.Body>
                                    <p className="product-name-on-card">
                                        {FeaturedList.title}
                                    </p>
                                    <p className="product-price-on-card">
                                        Price :{" "}
                                        <strike className="text-secondary">
                                            {FeaturedList.price} dinara
                                        </strike>{" "}
                                        {FeaturedList.special_price} dinara
                                    </p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                );
            }
        });

        return (
            <Fragment>
                <IzdvojenoLoading isLoading={this.state.isLoading} />

                <div className={this.state.mainDiv}>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55">
                            <h2>Veliki Servis Automobila</h2>
                            <p>
                                Odaberi svoj model automobila za koji možeš
                                rezervisati servis!
                            </p>
                        </div>

                        <Row>{MyView}</Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default Izdvojeno;

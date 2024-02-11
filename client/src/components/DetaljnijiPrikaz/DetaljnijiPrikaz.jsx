import React, { Component, Fragment } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Redirect } from "react-router-dom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import Predlozeno from "./Predlozeno";
import ReviewList from "./ReviewList";
import cogoToast from "cogo-toast";
import AppURL from "../../api/AppURL";
import axios from "axios";

class DetaljnijiPrikaz extends Component {
    constructor() {
        super();
        this.state = {
            previewImg: "0",
            datum: "",
            productCode: null,
            addToCart: "Rezerviši u auto servisu!",
            PageRefreshStatus: false,
            addToFav: "Dodaj u omiljeno",
        };
    }

    imgOnClick = (event) => {
        let imgSrc = event.target.getAttribute("src");
        this.setState({ previewImg: imgSrc });
    };

    addToCart = () => {
        let productCode = this.state.productCode;
        let email = localStorage.getItem("email");
        let datum = this.state.datum;

        let MyFormData = new FormData();

        if (datum.length === 0) {
            cogoToast.error("Unesite datum!", {
                position: "top-right",
            });
        } else {
            this.setState({ addToCart: "Rezervisanje i dodavanje u korpu..." });

            MyFormData.append("product_code", productCode);
            MyFormData.append("datum", datum);
            MyFormData.append("email", email);

            axios
                .post(AppURL.addToCart, MyFormData)
                .then((response) => {
                    if (response.data === 1) {
                        cogoToast.success(
                            "Uspešna rezervacija! Potvrdi u korpi!",
                            {
                                position: "top-right",
                            }
                        );
                        this.setState({
                            addToCart: "Rezerviši u auto servisu!",
                        });
                        this.setState({ PageRefreshStatus: true });
                    } else {
                        cogoToast.error("Greška pri rezervisanju!", {
                            position: "top-right",
                        });
                        this.setState({
                            addToCart: "Rezerviši u auto servisu!",
                        });
                    }
                })
                .catch((error) => {
                    cogoToast.error("Error adding the product! 2" + error, {
                        position: "top-right",
                    });
                    this.setState({ addToCart: "Add To Cart" });
                });
        }
    };

    addToFav = () => {
        this.setState({ addToFav: "Dodavanje..." });
        let productCode = this.state.productCode;
        let email = localStorage.getItem("email");

        axios
            .get(AppURL.AddFavourite(productCode, email))
            .then((response) => {
                if (response.data === 1) {
                    cogoToast.success("Dodato u omiljeno!", {
                        position: "top-right",
                    });
                    this.setState({ addToFav: "Dodaj u omiljeno" });
                } else {
                    cogoToast.error("Greška pri dodavanju u omiljeno!", {
                        position: "top-right",
                    });
                    this.setState({ addToFav: "Dodaj u omiljeno" });
                }
            })
            .catch((error) => {
                cogoToast.error("Greška pri dodavanju u omiljeno! 2", {
                    position: "top-right",
                });
                this.setState({ addToFav: "Dodaj u omiljeno" });
            });
    }; // end ADD TO FAV

    datumOnChange = (event) => {
        let datum = event.target.value;
        this.setState({ datum: datum });
    };

    PageRefresh = () => {
        if (this.state.PageRefreshStatus === true) {
            let URL = window.location;
            return <Redirect to={URL} />;
        }
    };

    PriceOption(price, special_price) {
        if (special_price == "na") {
            return (
                <p className="product-price-on-card">
                    {" "}
                    Price : {price} dinara{" "}
                </p>
            );
        } else {
            return (
                <p className="product-price-on-card">
                    Price :{" "}
                    <strike className="text-secondary">{price} dinara </strike>{" "}
                    {special_price} dinara!
                </p>
            );
        }
    }

    render() {
        let ProductAllData = this.props.data;
        let title = ProductAllData["productList"][0]["title"];
        let brand = ProductAllData["productList"][0]["brand"];
        let category = ProductAllData["productList"][0]["category"];
        let subcategory = ProductAllData["productList"][0]["subcategory"];
        let image = ProductAllData["productList"][0]["image"];

        if (this.state.previewImg === "0") {
            this.setState({ previewImg: image });
        }

        let price = ProductAllData["productList"][0]["price"];
        let product_code = ProductAllData["productList"][0]["product_code"];
        let remark = ProductAllData["productList"][0]["remark"];
        let special_price = ProductAllData["productList"][0]["special_price"];
        let star = ProductAllData["productList"][0]["star"];

        let image_one = ProductAllData["productDetails"][0]["image_one"];
        let image_two = ProductAllData["productDetails"][0]["image_two"];
        let image_three = ProductAllData["productDetails"][0]["image_three"];
        let image_four = ProductAllData["productDetails"][0]["image_four"];

        let product_id = ProductAllData["productDetails"][0]["product_id"];
        let short_description =
            ProductAllData["productDetails"][0]["short_description"];
        let long_description =
            ProductAllData["productDetails"][0]["long_description"];

        if (this.state.productCode === null) {
            this.setState({ productCode: product_code });
        }

        return (
            <Fragment>
                <Container fluid={true} className="BetweenTwoSection">
                    <div className="breadbody">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                {" "}
                                <Link to="/"> Home </Link>{" "}
                            </Breadcrumb.Item>

                            <Breadcrumb.Item>
                                {" "}
                                <Link to={"/productcategory/" + category}>
                                    {" "}
                                    {category}{" "}
                                </Link>{" "}
                            </Breadcrumb.Item>

                            <Breadcrumb.Item>
                                {" "}
                                <Link
                                    to={
                                        "/productsubcategory/" +
                                        category +
                                        "/" +
                                        subcategory
                                    }
                                >
                                    {" "}
                                    {subcategory}{" "}
                                </Link>{" "}
                            </Breadcrumb.Item>

                            <Breadcrumb.Item>
                                {" "}
                                <Link to={"/productdetails/" + product_id}>
                                    {" "}
                                    {title}{" "}
                                </Link>{" "}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <Row className="p-2">
                        <Col
                            className="shadow-sm bg-white pb-3 mt-4"
                            md={12}
                            lg={12}
                            sm={12}
                            xs={12}
                        >
                            <Row>
                                <Col
                                    className="p-3"
                                    md={6}
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <InnerImageZoom
                                        className="detailimage"
                                        zoomScale={1.8}
                                        zoomType={"hover"}
                                        src={this.state.previewImg}
                                        zoomSrc={this.state.previewImg}
                                    />

                                    <Container className="my-3">
                                        <Row>
                                            <Col
                                                className="p-0 m-0"
                                                md={3}
                                                lg={3}
                                                sm={3}
                                                xs={3}
                                            >
                                                <img
                                                    onClick={this.imgOnClick}
                                                    className="w-100 smallimage product-sm-img"
                                                    src={image_one}
                                                />
                                            </Col>
                                            <Col
                                                className="p-0 m-0"
                                                md={3}
                                                lg={3}
                                                sm={3}
                                                xs={3}
                                            >
                                                <img
                                                    onClick={this.imgOnClick}
                                                    className="w-100 smallimage product-sm-img"
                                                    src={image_two}
                                                />
                                            </Col>
                                            <Col
                                                className="p-0 m-0"
                                                md={3}
                                                lg={3}
                                                sm={3}
                                                xs={3}
                                            >
                                                <img
                                                    onClick={this.imgOnClick}
                                                    className="w-100 smallimage product-sm-img"
                                                    src={image_three}
                                                />
                                            </Col>
                                            <Col
                                                className="p-0 m-0"
                                                md={3}
                                                lg={3}
                                                sm={3}
                                                xs={3}
                                            >
                                                <img
                                                    onClick={this.imgOnClick}
                                                    className="w-100 smallimage product-sm-img"
                                                    src={image_four}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col
                                    className="p-3 "
                                    md={6}
                                    lg={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <h5 className="Product-Name"> {title} </h5>
                                    <h6 className="section-sub-title">
                                        {" "}
                                        {short_description}{" "}
                                    </h6>

                                    {this.PriceOption(price, special_price)}

                                    <h6 className="mt-2">
                                        Kategorija : <b>{category}</b>{" "}
                                    </h6>

                                    <h6 className="mt-2">
                                        Podkategorija : <b>{subcategory}</b>
                                    </h6>

                                    <h6 className="mt-2">
                                        Brend : <b>{brand}</b>
                                    </h6>

                                    <h6 className="mt-2">
                                        Kod : <b>{product_code}</b>
                                    </h6>

                                    <div className="">
                                        <h6 className="mt-2"> </h6>
                                        <select
                                            onChange={this.datumOnChange}
                                            className="form-control form-select"
                                        >
                                            <option>Odaberi datum:</option>
                                            <option value="21. Avgust 2023.">
                                                21. Avgust 2023.
                                            </option>
                                            <option value="29. Avgust 2023.">
                                                29. Avgust 2023.
                                            </option>
                                            <option value="07. Septembar 2023.">
                                                07. Septembar 2023.
                                            </option>
                                            <option value="10. Septembar 2023.">
                                                10. Septembar 2023.
                                            </option>
                                            <option value="15. Septembar 2023.">
                                                15. Septembar 2023.
                                            </option>
                                            <option value="22. Septembar 2023.">
                                                22. Septembar 2023.
                                            </option>
                                            <option value="27. Septembar 2023.">
                                                27. Septembar 2023.
                                            </option>
                                            <option value="30. Septembar 2023.">
                                                30. Septembar 2023.
                                            </option>
                                            <option value="01. Oktobar 2023.">
                                                01. Oktobar 2023.
                                            </option>
                                            <option value="03. Oktobar 2023.">
                                                03. Oktobar 2023.
                                            </option>
                                        </select>
                                    </div>

                                    <div className="input-group mt-3">
                                        <button
                                            onClick={this.addToCart}
                                            className="btn site-btn m-1 "
                                        >
                                            {" "}
                                            <i className="fa fa-flag  "></i>{" "}
                                            {this.state.addToCart}{" "}
                                        </button>

                                        <button
                                            onClick={this.addToFav}
                                            className="btn btn-primary m-1"
                                        >
                                            {" "}
                                            <i className="fa fa-heart"></i>{" "}
                                            {this.state.addToFav}{" "}
                                        </button>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">Detalji:</h6>
                                    <p> {long_description} </p>
                                </Col>

                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <ReviewList code={product_id} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <Predlozeno subcategory={subcategory} />

                {this.PageRefresh()}
            </Fragment>
        );
    }
}

export default DetaljnijiPrikaz;

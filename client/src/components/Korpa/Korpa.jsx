import React, { Component, Fragment } from "react";
import { Navbar, Container, Row, Col, Button, Card } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Redirect } from "react-router-dom";
class Korpa extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none",
            PageRefreshStatus: false,
            PageRedirectStaus: false,

            confirmBtn: "PORUČI",
            city: "",
            payment: "",
            name: "",
            address: "",
        };
    }
    componentDidMount() {
        axios
            .get(AppURL.CartList(this.props.user.email))
            .then((response) => {
                this.setState({
                    ProductData: response.data,
                    isLoading: "d-none",
                    mainDiv: " ",
                });
            })
            .catch((error) => {});
    }
    removeItem = (id) => {
        axios
            .get(AppURL.RemoveCartList(id))
            .then((response) => {
                if (response.data === 1) {
                    cogoToast.success("Stavka iz korpe rezervacija izbačena!", {
                        position: "top-right",
                    });
                    this.setState({ PageRefreshStatus: true });
                } else {
                    cogoToast.error(
                        "Tvoj zahtev još nije završen! Pokušaj ponovo.",
                        {
                            position: "top-right",
                        }
                    );
                }
            })
            .catch((error) => {
                cogoToast.error(
                    "Tvoj zahtev još nije završen! Pokušaj ponovo.",
                    {
                        position: "top-right",
                    }
                );
            });
    }; // End Remove Item Mehtod
    PageRefresh = () => {
        if (this.state.PageRefreshStatus === true) {
            let URL = window.location;
            return <Redirect to={URL} />;
        }
    };

    cityOnChange = (event) => {
        let city = event.target.value;
        this.setState({ city: city });
    };
    paymentMethodOnChange = (event) => {
        let payment = event.target.value;
        this.setState({ payment: payment });
    };
    nameOnChange = (event) => {
        let name = event.target.value;
        this.setState({ name: name });
    };
    addressOnChange = (event) => {
        let address = event.target.value;
        this.setState({ address: address });
    };
    confirmOnClick = () => {
        let city = this.state.city;
        let payment = this.state.payment;
        let name = this.state.name;
        let address = this.state.address;
        let email = this.props.user.email;
        if (city.length === 0) {
            cogoToast.error("Unesite grad", { position: "top-right" });
        } else if (payment.length === 0) {
            cogoToast.error("Unesite način plaćanja", {
                position: "top-right",
            });
        } else if (name.length === 0) {
            cogoToast.error("Unesite ime", {
                position: "top-right",
            });
        } else if (address.length === 0) {
            cogoToast.error("Unesite adresu", {
                position: "top-right",
            });
        } else {
            let invoice = new Date().getTime();
            let MyFromData = new FormData();
            MyFromData.append("city", city);
            MyFromData.append("payment_method", payment);
            MyFromData.append("name", name);
            MyFromData.append("delivery_address", address);
            MyFromData.append("email", email);
            MyFromData.append("invoice_no", invoice);
            MyFromData.append("delivery_charge", "00");

            axios
                .post(AppURL.CartOrder, MyFromData)
                .then((response) => {
                    if (response.data === 1) {
                        cogoToast.success(
                            "Poslat zahtev za rezervaciju! Hvala Vam puno :)",
                            {
                                position: "top-right",
                            }
                        );
                        this.setState({ PageRedirectStaus: true });
                    } else {
                        cogoToast.error(
                            "Tvoj zahtev još nije završen! Pokušaj ponovo.",
                            { position: "top-right" }
                        );
                    }
                })
                .catch((error) => {
                    cogoToast.error("v", {
                        position: "top-right",
                    });
                });
        }
    }; // edn confim order method

    PageRedirect = () => {
        if (this.state.PageRedirectStaus === true) {
            return <Redirect to="/orderlist" />;
        }
    };

    render() {
        const MyList = this.state.ProductData;
        let totalPriceSum = 0;
        const MyView = MyList.map((ProductList, i) => {
            totalPriceSum = totalPriceSum + parseInt(ProductList.unit_price);
            return (
                <div>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={3} lg={3} sm={6} xs={6}>
                                    <img
                                        className="cart-product-img"
                                        src={ProductList.image}
                                    />
                                </Col>
                                <Col md={6} lg={6} sm={6} xs={6}>
                                    <h5 className="product-name">
                                        {ProductList.product_name}
                                    </h5>
                                    <h6> Datum: {ProductList.datum} </h6>

                                    <h6>
                                        Cena je {ProductList.unit_price} dinara.
                                    </h6>
                                </Col>
                                <Col md={3} lg={3} sm={12} xs={12}>
                                    <Button
                                        onClick={() =>
                                            this.removeItem(ProductList.id)
                                        }
                                        className="btn mt-2 mx-1 btn-lg site-btn"
                                    >
                                        <i className="fa fa-trash-alt"></i>{" "}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            );
        });
        return (
            <Fragment>
                <Container fluid={true}>
                    <div className="section-title text-center mb-55">
                        <h2>Pregled korpe</h2>
                    </div>
                    <Row>
                        <Col className="p-1" lg={7} md={7} sm={12} xs={12}>
                            {MyView}
                        </Col>
                        <Col className="p-1" lg={5} md={5} sm={12} xs={12}>
                            <div className="card p-2">
                                <div className="card-body">
                                    <div className="container-fluid ">
                                        <div className="row">
                                            <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                <h5 className="Product-Name text-danger">
                                                    Ukupno zaduženje:{" "}
                                                    {totalPriceSum} dinara.
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">
                                                    Odaberi grad:
                                                </label>
                                                <select
                                                    onChange={this.cityOnChange}
                                                    className="form-control"
                                                >
                                                    <option
                                                        value=""
                                                        defaultValue={"Beograd"}
                                                    >
                                                        Odaberi...
                                                    </option>
                                                    <option value="Beograd">
                                                        Beograd
                                                    </option>
                                                    <option value="Novi Sad">
                                                        Novi Sad{" "}
                                                    </option>
                                                    <option value="Niš">
                                                        Niš{" "}
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">
                                                    Odaberi način plaćanja
                                                </label>
                                                <select
                                                    onChange={
                                                        this
                                                            .paymentMethodOnChange
                                                    }
                                                    className="form-control"
                                                >
                                                    <option value="">
                                                        Odaberi...
                                                    </option>
                                                    <option value="Gotovina">
                                                        Gotovina
                                                    </option>
                                                    <option value="Kartica">
                                                        Kartica
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">
                                                    Vaše ime:
                                                </label>
                                                <input
                                                    onChange={this.nameOnChange}
                                                    className="form-control"
                                                    type="text"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">
                                                    Adresa:
                                                </label>
                                                <textarea
                                                    onChange={
                                                        this.addressOnChange
                                                    }
                                                    rows={2}
                                                    className="form-control"
                                                    type="text"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <button
                                                    onClick={
                                                        this.confirmOnClick
                                                    }
                                                    className="btn  site-btn"
                                                >
                                                    {" "}
                                                    {this.state.confirmBtn}{" "}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

                {this.PageRefresh()}

                {this.PageRedirect()}
            </Fragment>
        );
    }
}
export default Korpa;

import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router";
import AppURL from "../../api/AppURL";
import axios from "axios";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
} from "react-bootstrap";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      show: false,
      NotificationData: [],
      isLoading: "",
      mainDiv: "d-none",
      Notificationmsg: "",
      Notificationtitle: "",
      Notificationdate: "",
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.OrderListAll())
      .then((response) => {
        this.setState({ ProductData: response.data });
      })
      .catch((error) => {});
  }

  render() {
    let name;
    let email;
    if (this.props.user) {
      name = this.props.user.name;
      email = this.props.user.email;
    }

    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }

    const MyList = this.state.ProductData;
    const MyView = MyList.map((ProductList, i) => {
      return (
        <div>
          <Col md={6} lg={6} sm={6} xs={6}>
            <h5 className="product-name">{ProductList.product_name}</h5>

            <h4>Cena = {ProductList.unit_price}</h4>

            <p>Datum: {ProductList.datum}</p>
            <p>Status = {ProductList.order_status} </p>

            <h6>Ime: {ProductList.name}</h6>
            <h6>Email kupca: {ProductList.email}</h6>
          </Col>

          <hr></hr>
        </div>
      );
    });

    return (
      <Fragment>
        <h1 className="text-center"> ADMIN STRANA </h1>

        <ul className="list-group">
          <li className="list-group-item text-center">
            Dobrodošli na admin stranu sajta Auto Servisa. Unutar ove stranice administrator platforme ima uvid u sve porudžbine koje su kreirane korišćenjem platforme Auto Servis.
          </li>
        </ul>

        <div className="section-title text-center mb-55">
          <h2> Sve porudžbine korišćenjem Auto Servis platforme </h2>
        </div>

        <Card>
          <Card.Body>
            <Row>{MyView}</Row>
          </Card.Body>
        </Card>
      </Fragment>
    );
  }
}

export default Admin;

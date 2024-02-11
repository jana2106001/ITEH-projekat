import React, { Component, Fragment } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import validation from "../../validation/validation";
import axios from "axios";
import AppURL from "../../api/AppURL";
import GoogleMaps from "../../components/others/GoogleMaps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Contact extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            message: "",
        };
    }

    nameOnChange = (event) => {
        let name = event.target.value;
        // alert(name);
        this.setState({ name: name });
    };

    emailOnChange = (event) => {
        let email = event.target.value;
        // alert(email);
        this.setState({ email: email });
    };

    messageOnChange = (event) => {
        let message = event.target.value;
        // alert(message);
        this.setState({ message: message });
    };

    onFormSubmit = (event) => {
        let name = this.state.name;
        let email = this.state.email;
        let message = this.state.message;
        let sendBtn = document.getElementById("sendBtn");
        let contactForm = document.getElementById("contactForm");

        if (message.length == 0) {
            toast.error("Napiši poruku!");
        } else if (name.length == 0) {
            toast.error("Unesite ime!");
        } else if (email.length == 0) {
            toast.error("Unesite mejl!");
        } else if (!validation.NameRegx.test(name)) {
            toast.error("Neispravno ime!");
        } else if (!validation.EmailRegx.test(email)) {
            toast.error("Neispravan Mejl!");
        } else {
            sendBtn.innerHTML = "Slanje...";
            let MyFormData = new FormData();
            MyFormData.append("name", name);
            MyFormData.append("email", email);
            MyFormData.append("message", message);

            axios
                .post(AppURL.PostContact, MyFormData)
                .then(function (response) {
                    if (response.status == 200 && response.data == 1) {
                        toast.success("Poruka uspešno poslata!");
                        sendBtn.innerHTML = "POŠALJI";
                        contactForm.reset();
                    } else {
                        toast.error("error");
                        sendBtn.innerHTML = "POŠALJI";
                    }
                })
                .catch(function (error) {
                    toast.error(error);
                    sendBtn.innerHTML = "POŠALJI";
                });
        }

        event.preventDefault();
    };

    render() {
        return (
            <Fragment style={{ display: "flex", justifyContent: "center" }}>
                <Container>
                    <Row className="p-2 text-center justify-content-center">
                        <Row className="text-center">
                            <Col className="justify-content-center">
                                <Form
                                    id="contactForm"
                                    onSubmit={this.onFormSubmit}
                                    className="onboardForm"
                                >
                                    <h4 className="section-title-login">
                                        Kontakt{" "}
                                    </h4>
                                    <h6 className="section-sub-title">
                                        Konktaktiraj nas kako bi dobio više
                                        informacija o ponudama i servisima koje
                                        pružamo!{" "}
                                    </h6>

                                    <input
                                        onChange={this.nameOnChange}
                                        className="form-control m-2"
                                        type="text"
                                        placeholder="Unesi svoje ime..."
                                    />

                                    <input
                                        onChange={this.emailOnChange}
                                        className="form-control m-2"
                                        type="email"
                                        placeholder="Unesi svoj mejl..."
                                    />

                                    <Form.Control
                                        onChange={this.messageOnChange}
                                        className="form-control m-2"
                                        as="textarea"
                                        rows={3}
                                        placeholder="Poruka..."
                                    />

                                    <Button
                                        id="sendBtn"
                                        type="submit"
                                        className="btn btn-block m-2 site-btn-login"
                                    >
                                        {" "}
                                        POŠALJI{" "}
                                    </Button>
                                </Form>
                            </Col>

                            <br></br>
                            <br></br>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <GoogleMaps />
                            </div>
                        </Row>
                    </Row>
                </Container>

                <ToastContainer />
            </Fragment>
        );
    }
}

export default Contact;

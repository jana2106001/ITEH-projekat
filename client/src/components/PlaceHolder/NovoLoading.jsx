import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

class NovoLoading extends Component {
    render() {
        let isLoading = this.props.isLoading;

        return (
            <div className={isLoading}>
                <Container className="text-center" fluid={true}>
                    <div className="section-title text-center mb-55">
                        <h2>Akumulatori</h2>
                        <p>Najnovija ponuda akumulatora za vaš automobil!</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <div class="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small" />
                                            <div className="ph-col-12 small" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <div class="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small" />
                                            <div className="ph-col-12 small" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <div class="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small" />
                                            <div className="ph-col-12 small" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <div class="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small" />
                                            <div className="ph-col-12 small" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* // end row div */}
                </Container>
            </div>
        );
    }
}

export default NovoLoading;

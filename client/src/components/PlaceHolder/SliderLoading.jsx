import React, { Component } from "react";

class SliderLoading extends Component {
    render() {
        let isLoading = this.props.isLoading;

        return (
            <div className={isLoading}>
                <div className="section-title text-center mb-55">
                    <h2>Učitavanje...</h2>
                </div>

                <div className="row">
                    <div className="col-3">
                        <div class="ph-row">
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                            <div class="ph-col-12"></div>
                        </div>
                    </div>

                    <div className="col-9">
                        <div class="ph-picture"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SliderLoading;

import React, { Component, Fragment } from "react";
import Korpa from "../components/Korpa/Korpa";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
class KorpaPage extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        const User = this.props.user;

        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop />
                </div>
                <div className="Mobile">
                    <NavMenuMobile />
                </div>

                <Korpa user={User} />

                <div className="Desktop">
                    <FooterDesktop />
                </div>
                <div className="Mobile">
                    <FooterMobile />
                </div>
            </Fragment>
        );
    }
}
export default KorpaPage;

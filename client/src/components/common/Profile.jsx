import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router";

class Profile extends Component {
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

        return (
            <Fragment>
                <h1 className="text-center"> Profilna strana </h1>

                <ul className="list-group">
                    <li className="list-group-item">
                        Dobrodošli na sajt Auto Servisa. Vaše ime je {name} !
                    </li>
                    <li className="list-group-item">
                        Vaša Email adresa je {email}.{" "}
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default Profile;

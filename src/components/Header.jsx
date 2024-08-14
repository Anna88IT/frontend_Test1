import React from "react";
import "../styles/Header.css";

export const Header = () => {

    return(
        <nav>
            <div className="container">
                <div className="user">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                </div>
                <div className="menu">
                    <div className="home">Home</div>
                    <div className="contact">Contact</div>
                    <div className="about">About</div>
                </div>
            </div>
            <div className="login">Login</div>
        </nav>
    )
}


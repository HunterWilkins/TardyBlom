import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

function Footer() {
    return(
        <footer>
            <p>tardyblom@gmail.com</p>

            <a href = "https://twitter.com/tardyblom" target = "__blank">
                <img className = "icon" src = "/images/twitter-icon.png" />
            </a>
        </footer>
    );
}

export default Footer;
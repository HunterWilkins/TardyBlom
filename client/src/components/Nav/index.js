import React from "react";
import {Link} from "react-router-dom";
import "./style.css";
function Nav() {
    return(
        <nav>
            <Link to = "/literature">Literature</Link>
            <Link to = "/home">Film</Link>
            <Link to = "/home">Games</Link>
            <Link to = "/home">Music</Link>
        </nav>
    );
}

export default Nav;
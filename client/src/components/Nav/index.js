import React from "react";
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";

function Nav() {

    const [, dispatch] = useGlobalContext();

    function updateMedium() {
        dispatch({
            type: "switchMedium",
            medium: window.location.pathname.split("/")[1]
        })
    }

    return(
        <nav>
            <Link to = "/literature" onClick = {updateMedium}>Literature</Link>
            <Link to = "/games" onClick = {updateMedium}>Games</Link>
            <Link to = "/music" onClick = {updateMedium}>Music</Link>
            <Link to = "/art" onClick = {updateMedium}>Art</Link>
        </nav>
    );
}

export default Nav;
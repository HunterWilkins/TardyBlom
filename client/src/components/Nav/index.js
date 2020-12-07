import React from "react";
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";

function Nav() {

    const [, dispatch] = useGlobalContext();

    function clearPosts() {
        dispatch({
            type: "clearPosts"
        });
    }

    return(
        <nav>
            <Link to = "/checkit">Check This Out</Link>
            <Link to = "/theory">Theory Theater</Link>
            <Link to = "/nonsequiturs">Nonsequiturs</Link>
        </nav>
    );
}

export default Nav;
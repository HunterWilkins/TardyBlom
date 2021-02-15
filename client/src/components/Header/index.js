import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import LoginForm from "../../components/LoginForm";

import Nav from "../Nav";

function Header({mobileWidth}) {

    const [state, dispatch] = useGlobalContext();
    const [modal, setModal] = useState(false);

    // function handleLogout() {
    //     API.logout().then(dispatch({
    //         type: "logout"
    //     }))
    // }

    function resetGenre() {
        dispatch({
            type: "genre",
            genre: ""
        });
    }

    return(
        <header>
            <Link to = "/home" id = "logo" onClick = {resetGenre}>Tardyblom</Link>
            {
                mobileWidth ?
                ""
                :
                <Nav />
            }
            {/* {
                state.username ? 
                <button className = "darkbutton" onClick = {() => handleLogout()}>Logout</button>
                :
                <p id = "login-prompt" onClick = {() => setModal(!modal)}>Login / Signup</p>
            }
            {
                modal ? 
                <LoginForm modal = {modal} closeModal = {() => setModal(false)}/>
                :
                ""
            } */}
        </header>
    );
}

export default Header;
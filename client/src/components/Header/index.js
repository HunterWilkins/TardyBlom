import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import LoginForm from "../../components/LoginForm";

import Nav from "../Nav";

function Header({mobileWidth}) {

    const [loginState, dispatch] = useGlobalContext();
    const [modal, setModal] = useState(false);

    function handleLogout() {
        API.logout().then(dispatch({
            type: "logout"
        }))
    }

    return(
        <header>
            <Link to = "/home" id = "logo">Tardyblom</Link>
            {
                mobileWidth ?
                ""
                :
                <Nav />
            }
            {
                loginState.username ? 
                <button className = "darkbutton" onClick = {() => handleLogout()}>Logout</button>
                :
                <p id = "login-prompt" onClick = {() => setModal(!modal)}>Login / Signup</p>
            }
            {
                modal ? 
                <LoginForm modal = {modal} closeModal = {() => setModal(false)}/>
                :
                ""
            }
        </header>
    );
}

export default Header;
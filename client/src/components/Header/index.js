import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import LoginForm from "../../components/LoginForm";

import Nav from "../Nav";

function Header() {

    const [loginState, dispatch] = useGlobalContext();
    const [modal, setModal] = useState(false);

    return(
        <header>
            <Link to = "/home" id = "logo">The Good Stuff</Link>
            {
                loginState.username ? 
                <button className = "darkbutton" onClick = {() => API.logout()}>Logout</button>
                :
                <button className = "darkbutton" onClick = {() => setModal(!modal)}>Login/Signup</button>
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
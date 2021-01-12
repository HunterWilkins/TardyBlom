import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";

import Nav from "../Nav";

function Header() {

    const [loginState, dispatch] = useGlobalContext();
    const [login, setLogin] = useState(true);
    const [state, setState] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    function handleInputChange(event) {
        setState({
            ...state,
            [event.target.placeholder.toLowerCase()]: event.target.value
        });
        console.log(state);
    }

    return(
        <header>
            <Link to = "/home" id = "logo">The Good Stuff</Link>
            {
                loginState.username ? 
                <button>Logout</button>
                :
                <form id = "login-box" onChange = {handleInputChange}>
                <input placeholder = "Username" style = {login ? {display: "none"} : {display: "initial"}} />
                <input type = "email" placeholder = "Email" />
                <input type = "password" placeholder = "Password" />
                <button onClick = {login ? (event) => {event.preventDefault(); API.login(state).then(response => dispatch({type: "login", username: response.data.username}))}: (event) => {event.preventDefault(); API.signup(state)}}>{login ? "Login" : "Signup"}</button>
                <button onClick = {(event) => {
                    event.preventDefault();
                    setLogin(!login)
                    }}>{!login ? "Login?" : "Sign Up?"}</button>
                </form>
            }
           
            
        </header>
    );
}

export default Header;
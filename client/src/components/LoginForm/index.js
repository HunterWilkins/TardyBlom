import {useEffect, useState} from "react";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";

function LoginForm(props) {

    const [loginState, dispatch] = useGlobalContext();


    const [login, setLogin] = useState(true);
    const [state, setState] = useState({
        username: "",
        password: "",
        email: ""
    });

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

    function handleLogin(event) {
        event.preventDefault();
        if (login) {
            API.login(state).then(response => {
                dispatch({
                    type: "login", 
                    username: response.data.username, 
                    userId: response.data.id
                });
                props.closeModal();
            });    
        }

        else {
            API.signup(state).then(response => {
                dispatch({
                    type: "login", 
                    username: response.data.username, 
                    userId: response.data.id
                });
                props.closeModal();
            });
        }
    }

    return(
        <div id = "login-modal" style = {props.modal ? {display: "flex"} : {display: "none"}}>
            <form id = "login-box" onChange = {handleInputChange}>
                <input placeholder = "Username" style = {login ? {display: "none"} : {display: "block"}} />
                <input type = "email" placeholder = "Email" />
                <input type = "password" placeholder = "Password" />
                <span id = "login-buttons">
                    <button onClick = {(event) => handleLogin(event)}>{login ? "Login" : "Signup"}</button>
                    <button onClick = {(event) => {
                        event.preventDefault();
                        setLogin(!login)
                        }}>{!login ? "Login?" : "Sign Up?"}</button>
                </span>
            </form>
            <div className = "darkbutton" id = "close-modal" onClick = {() => props.closeModal()}>
                <p>x</p>
            </div>
        </div>
    )
}

export default LoginForm;
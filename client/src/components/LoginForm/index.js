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

    const [failureMessage, setFailureMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleInputChange(event) {
        setState({
            ...state,
            [event.target.placeholder.toLowerCase()]: event.target.value
        });
        // console.log(state);
    }

    function handleLogin(event) {
        event.preventDefault();

        if (state.email === "" || state.password === "") {
            if (state.username === "" && !login) {
                setFailureMessage("All fields must be filled.");
            }
            else {
                setFailureMessage("Your email and password cannot be blank!");
            }
        }
        else {

            if (login) {
                API.login(state).then(response => {
                    dispatch({
                        type: "login", 
                        username: response.data.username, 
                        userId: response.data.id
                    });
                    setFailureMessage("");
                    props.closeModal();    
                    
                }).catch((err) => {
                    // console.log(err);
                    
                    setFailureMessage("Incorrect Credentials");
                    
                });    
            }

            else {
                API.signup(state).then(response => {
                    // console.log(response);
                    if (response.data.message) {
                        setFailureMessage(response.data.message);
                    }
                    else {
                        dispatch({
                            type: "login", 
                            username: response.data.username, 
                            userId: response.data.id
                        });
                        setFailureMessage("");
                        props.closeModal();    
                    }
                }).catch((err) => {
                    // console.log(err);
                    setFailureMessage("");
                });
            }
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
                <span id = "failure-box">
                    <br />
                    {
                        failureMessage !== "" ?
                        <p id = "failure-message">{failureMessage}</p>
                        :
                        ""
                    }
                </span>
            </form>

            <div id = "close-modal" onClick = {() => props.closeModal()}>
                    
            </div>
            
        </div>
    )
}

export default LoginForm;
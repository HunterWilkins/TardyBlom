import {useEffect, useState} from "react";
import "./style.css";
import {useGlobalContext} from "../../utils/GlobalContext";
import API from "../../utils/API";

function Main(props) {    
    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
        API.checkLoggedIn().then((response) => {
            dispatch({
                type: "login",
                username: response.data.username,
                userId: response.data.id
            });
        })
    }, [])

    return(
        <main {...props}>
            {props.children}
        </main>
    );
}

export default Main;
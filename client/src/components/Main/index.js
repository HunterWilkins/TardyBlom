import {useEffect, useState} from "react";
import "./style.css";
import {useGlobalContext} from "../../utils/GlobalContext";
import API from "../../utils/API";

function Main(props) {
    
    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
        API.checkLoggedIn().then((response) => {
            console.log(response.data);
            dispatch({
                type: "login",
                username: response.data
            });
        })
    }, [])

    return(
        <main>
            {props.children}
        </main>
    );
}

export default Main;
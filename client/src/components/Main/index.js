import React from "react";
import "./style.css";

function Main(props) {
    
    
    return(
        <main>
            {props.children}
        </main>
    );
}

export default Main;
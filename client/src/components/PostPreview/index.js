import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

function PostPreview(props) {

    function fixDate(date) {
        let slashDate = date.replace(/-/g, "/");
        return slashDate.replace(date.replace(/-/g, "/").split("/")[2].slice(2), "");
    }
    
    return(
        <div className = "post-preview">
            <h3>{props.title}</h3>
            <p className = "date">{fixDate(props.createdAt)}</p>
            <br />
            <p className = "body">{props.body}</p>
        </div>
    );
}

export default PostPreview;
import React from "react";
import "./style.css";

function PostPreview(props) {

    function fixDate(date) {
        let slashDate = date.replace(/-/g, "/");
        return slashDate.replace(date.replace(/-/g, "/").split("/")[2].slice(2), "");
    }
    
    return(
        <div className = "post-preview">
            <h3>{props.title}</h3>
            <p>{fixDate(props.createdAt)}</p>
        </div>
    );
}

export default PostPreview;
import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

function PostPreview(props) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function fixDate(date) {
        let convertedDate = date.replace(date.replace(/-/g, "/").split("/")[2].slice(2), "");
        let splitDates = convertedDate.split("-");
        let wordDate = months[parseInt(splitDates[1]) -1] + " " + splitDates[2] + ", " + splitDates[0];
        return wordDate;
    }

    function formatBody(body) {
        return body.replace(/\n/g, "\n\n");
    }
    
    return(
        <div className = "post-preview">
            <h3>{props.title}</h3>
            <p className = "date">{fixDate(props.createdAt)}</p>
            <br />
            <p className = "body">{formatBody(props.body)}</p>
        </div>
    );
}

export default PostPreview;
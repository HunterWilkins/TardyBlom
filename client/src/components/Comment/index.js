import {useState, useEffect} from "react";
import "./style.css";

function Comment({item, fixDate}) {
    return(
        <div className = "comment">
            <p className = "author">{item.User.username}</p>
            <p className = "comment-date"><em>{fixDate(item.createdAt)}</em></p>
            <br />
            <p className = "comment-body">{item.body}</p>
        </div>
    );
}

export default Comment;
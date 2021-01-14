import {useState, useEffect} from "react";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";

function CommentBox({articleId, userId}) {
    const [state, dispatch] = useGlobalContext();
    const [comment, setComment] = useState("");

    function handleInputChange(event) {
        setComment(event.target.value);
    }

    function submitComment(event) {
        event.preventDefault(); 
        
        const detail = {
            articleId: articleId,
            userId: state.userId,
            comment: comment
        }
        API.postComment(detail);
    }

    return(
        <div id = "commentbox">
            <textarea 
                onChange = {handleInputChange} 
                id = "commentbox"
                placeholder = "Comment...">
            </textarea>

            <button className = "darkbutton" onClick = {(event) => submitComment(event)}>Submit</button>
        </div>
       
    )
}

export default CommentBox;
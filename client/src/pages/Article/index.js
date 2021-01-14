import React, {useState, useEffect} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import API from "../../utils/API";
import CommentBox from "../../components/CommentBox";
import Comment from "../../components/Comment";

import "./style.css";

function Article() {
    const [state, dispatch] = useGlobalContext();

    const [article, setArticle] = useState({
        data: 0
    });

    const [comments, setComments] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        API.getArticle(window.location.pathname.split("/")[2])
        .then(({data}) => {
            
            let newBody = "\t" + data.body.replace(/\n/g, "\n\t");
            setArticle({
                ...data,
                newBody
            });
            setLoaded(true);
        });

        API.getComments(window.location.pathname.split("/")[2])
        .then(({data}) => {
            console.log(data);
            setComments(data);
            console.log(comments);
        });
    }
    ,[state.article]);

    function fixDate(date) {
        try {
            let slashDate = date.replace(/-/g, "-");
            let numberedDate = slashDate.replace(date.replace(/-/g, "/").split("/")[2].slice(2), "");
            let monthNum = parseInt(numberedDate.split("-")[1]);
            return months[monthNum-1] + " " + numberedDate.split("-")[2] + ", " + numberedDate.split("-")[0]
        }
        catch {
            return date
        }
    }

    function capitalize(string) {
        try {
            return (string.slice(0)[0].toUpperCase() + string.slice(1));
        }
        catch {
            return string;
        }
    }

    return(
        <div>
            <article>
            {
                loaded ?
                <>
                 <div id = "topper">
                    <h3>{article.title}</h3>
                    <span id = "top-wrapper">
                        {/* <p id = "genre">{capitalize(article.genre)}</p> */}
                        <p id = "medium">{capitalize(article.medium)}</p>
                        <p id = "date">{fixDate(article.createdAt)}</p>
                    </span>
                </div>

                <p id = "body">{article.newBody}</p>
             </>
             :
             <p>Please Wait</p>
            }
            </article>
            {
                state.userId ? 
                <CommentBox articleId = {window.location.pathname.split("/")[2]} />
                :
                ""
            }
            <div id = "comment-section">
                {
                    comments ? 
                    comments.map(item => {
                        return(
                            <Comment item = {item} fixDate = {fixDate}/>
                        );
                    })
                    :
                    ""
                }
            </div>
        </div>
    )
}

export default Article;
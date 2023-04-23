import React, {useState, useEffect} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import { ReactMarkdown as Markdown} from "react-markdown/lib/react-markdown";
import API from "../../utils/API";
import CommentBox from "../../components/CommentBox";
import Comment from "../../components/Comment";
import {Helmet} from "react-helmet";

import "./style.css";

function Article() {
    const [state, dispatch] = useGlobalContext();

    const [article, setArticle] = useState({
        data: 0
    });
    const [mobileWidth, setMobileWidth] = useState(false);

    const [topOfPage, setTopOfPage] = useState(true);

    const [title, setTitle] = useState("");

    const [comments, setComments] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        API.getArticle(window.location.pathname.split("/")[2])
        .then(({data}) => {
            // console.log(data);
            setTitle(data.article.title);
            
            // let newBody = spacedBody.replace(/\[.*?\]/g, "<img src = 'https://gamerdame.files.wordpress.com/2011/06/rof2.jpg' alt = " + imgLink + "/>")
            // console.log(splitBody);
            // let newBodyWithImg = newBody.replace(/###LINK/g, )
            setArticle({
                ...data.article,
                markdown: data.markdown
            });
            setLoaded(true);
        });

        API.getComments(window.location.pathname.split("/")[2])
        .then(({data}) => {
            setComments(data);
        });
    }, [state.article]);

    function renderBody() {
        return (
            <Markdown className = "article-image-handler">
                {article.markdown}
            </Markdown>
        )
    }

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

    function handleScroll() {
        if (window.scrollY > 0 && topOfPage === true) {
            setTopOfPage(false);
        }

        if (window.scrollY === 0 && !topOfPage) {
            setTopOfPage(true);
        }
    }

    function jumpUp() {
        window.scrollTo(0, 0);
    }

    return(
        <div>
            <Helmet>
                {
                    // title ?
                    // <>
                    // <title>{title} | tardyblom.com</title>
                    // <link rel = "icon" href = "/images/logo.png"></link>
                    // </>
                    
                    // :
                    // <>
                   
                    //</>
                }
                <title>{title}</title>
                <link rel = "icon" href = "/images/logo.png"></link>
            </Helmet>
            <article>
            {
                loaded ?
                <>
                 <div id = "topper">
                    <h3>{article.title}</h3>
                    <p id = "date">{fixDate(article.createdAt)}</p>    
                </div>
               <br />

                <div id = "body">
                    {renderBody()}
                </div>
             </>
             :
             <p>Please Wait...</p>
            }
            </article>
            {/* {
            state.userId ? 
            <CommentBox articleId = {window.location.pathname.split("/")[2]} />
            :
            ""
            }

            <div id = "comment-section">
                <h3>Comments</h3>
                
                
                {
                comments.length > 0 ?
                comments.map(item => {
                    return(
                        <Comment item = {item} fixDate = {fixDate}/>
                    );
                })
                :
                <p><em>- No comments yet -</em></p>
            
                }
            </div>
            */}
            {
             
                
            }
            <div id = "tools">
                <figure id = "jumpUp">
                    <img alt = "Jump to Top" src = "/images/up-arrow.png" onClick = {jumpUp} />
                </figure>

                {/* <figure id = "theme" onClick = {() => props.changeTheme()}>
                    <img alt = "Brightness Controller" src = "/images/brightness.png" />
                </figure> */}

            </div>
        </div>
    )
}

export default Article;
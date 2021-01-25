import React, {useState, useEffect} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
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
        // window.addEventListener("scroll", handleScroll);
        // window.addEventListener("resize", handleResize);
        API.getArticle(window.location.pathname.split("/")[2])
        .then(({data}) => {
            setTitle(data.title);
            
            // let newBody = spacedBody.replace(/\[.*?\]/g, "<img src = 'https://gamerdame.files.wordpress.com/2011/06/rof2.jpg' alt = " + imgLink + "/>")
            // console.log(splitBody);
            // let newBodyWithImg = newBody.replace(/###LINK/g, )
            setArticle({
                ...data,
                newBody: data.body
            });
            setLoaded(true);
        });

        API.getComments(window.location.pathname.split("/")[2])
        .then(({data}) => {
            setComments(data);
        });
    }, [state.article]);

    function renderBody() {
        article.newBody = article.newBody.trimEnd();
        if (article.newBody.indexOf("###IMG") !== -1) {  
            let trimbody = article.newBody.replace(/\t/g, "");      
            let spacedBody =  "\t" + trimbody.replace(/\n/g, "\n\n\t");
            let imgSplit = spacedBody.split(/(\[.*?\]+)/);
            return(
                imgSplit.map(item => {
                    if (item.indexOf("###IMG") !== -1) {
                        let imgSrc = "/images/" + item.slice(8, item.indexOf("###]")).trim();

                        let alt = article.title;
                        return <img alt = {alt} src = {imgSrc} />
                    }
                    else {
                        return <p>{item}</p>
                    }
                })
            );
        }

        else {
            return <p>{article.newBody}</p>
        } 
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
                    title !== "" ?
                    <title>{title} | tardyblom.com</title>
                    :
                    ""
                }
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
            {
            state.userId ? 
            <CommentBox articleId = {window.location.pathname.split("/")[2]} />
            :
            ""
            }
           
            {
                comments.length > 0 ? 
                <div id = "comment-section">
                    <h3>Comments</h3>
                   
                   
                    {comments.map(item => {
                        return(
                            <Comment item = {item} fixDate = {fixDate}/>
                        );
                    })}
                </div>
                :
                ""
            }
            <img alt = "Jump to Top" src = "/images/up-arrow.png" id = "jumpUp" onClick = {jumpUp} />
        </div>
    )
}

export default Article;
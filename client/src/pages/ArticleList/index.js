import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import {Helmet} from "react-helmet";
import "./style.css";

function ArticleList() {

    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
        if (!state.genre) {
            dispatch({
                type: "genre",
                genre: window.location.pathname.split("/")[2]
            })
        }
    }, []);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

    function renderArticles() {
        try {
            if (state.articles.filter(item => item.genre.toLowerCase() === state.genre.toLowerCase()).length > 0) {
                return(
                    <div id = "article-list">
                    { 
                        state.articles.filter(item => item.genre.toLowerCase() === state.genre.toLowerCase()).map(item => {
                            return(
                                
                                <Link className = "article-link" to = {"/article/" + item.id}>
                                    <p>{item.title}</p>
                                    <p className = "medium" value = {item.medium}>{item.medium}</p>
                                    <p className = "date">{fixDate(item.createdAt)}</p>
                                </Link>
                            
                            )
                        })
                    }                
                    </div>        
                )                
            }

            else {
                return(<p>No results for {state.genre}.</p>);
            }
             
        }
        catch {
            return <p>Something went wrong when grabbing articles. Please come back later!</p>
        }
    }

    return(
        <div>
            <Helmet>
                <title>Articles | tardyblom.com</title>
            </Helmet>
            {
                renderArticles()
            }
           
        </div>
    )

}

export default ArticleList;
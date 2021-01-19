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

    return(
        <div>
            <Helmet>
                <title>Articles | tardyblom.com</title>
            </Helmet>
            {
                state.articles.filter(item => item.genre.toLowerCase() === state.genre.toLowerCase()).length > 0 ?
                <ul>
                { 
                    state.articles.filter(item => item.genre.toLowerCase() === state.genre.toLowerCase()).map(item => {
                        return(
                            <li className = "article-link">
                                <Link to = {"/article/" + item.id}>
                                    <p>{item.title}</p>
                                    <p className = "date">{fixDate(item.createdAt)}</p>
                                </Link>
                            </li>
                        )        
                        
                    })
                }                
                </ul>
                :
                <p>No results for {state.genre}.</p>
            }
           
        </div>
    )

}

export default ArticleList;
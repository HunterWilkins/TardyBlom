import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";

function ArticleList() {

    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
        console.log(state.articles);
        if (!state.genre) {
            console.log("NO GENRE");
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
            <ul>
                {
                    state.articles ?
                    state.articles.filter(item => item.genre.toLowerCase() === state.genre.toLowerCase()).map(item => {
                        console.log(item);
                        return(
                        <li className = "article-link">
                            <Link to = {"/article/" + item.id}>
                                <p>{item.title}</p>
                                <p className = "date">{fixDate(item.createdAt)}</p>
                            </Link>
                        </li>
                        )
                    })
                    :
                    ""
                }
            </ul>
        </div>
    )

}

export default ArticleList;
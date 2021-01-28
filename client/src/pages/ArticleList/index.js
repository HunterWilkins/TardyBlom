import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {useGlobalContext} from "../../utils/GlobalContext";
import {Helmet} from "react-helmet";
import "./style.css";

function ArticleList() {

    const [state, dispatch] = useGlobalContext();
    const [articles, setArticles] = useState([]);
    const limit = 5;
    const [max, setMax] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!state.genre) {
            dispatch({
                type: "genre",
                genre: window.location.pathname.split("/")[2]
            });
        }

        else {
            API.getArticles(page, state.genre).then(function(response) {
                console.log(response);
                setArticles(response.data.rows);
                setMax(response.data.count);
            });
        }

        
    }, [state.genre]);

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

    function flipPage(num) {
        setArticles([]);
        console.log(page);
        if ((page + num) < (max / limit) && (page + num) > -1 ) {
            setPage(page + num);

            API.getArticles(page + num, state.genre).then(function(response) {
                setArticles(response.data.rows);
                window.scrollTo(0, 0);
            });
        }

       
    }

    function renderArticles() {
        try {
            if (articles.filter(item => item.genre.toLowerCase() === state.genre.toLowerCase()).length > 0) {
                return(
                    <div id = "article-list">
                    { 
                        articles.filter(item => item.genre.toLowerCase() === state.genre.toLowerCase()).map(item => {
                            
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
        <div id = "article-list-wrapper">
            <Helmet>
                <title>Articles | tardyblom.com</title>
            </Helmet>
            <span id = "pagination">
                <p>Page {page + 1} / { max > 0 ? Math.ceil(max / limit) : 1}</p>
                <img className = {page === 0 ? "deactivated" : ""} id = "backpage" src = "/images/forward-arrow.png" onClick = {() => flipPage(-1)} />
                <img className = {page + 1 === Math.ceil(max / limit) || max <= 0 ? "deactivated" : ""} src = "/images/forward-arrow.png" onClick = {() => flipPage(1)} />
            </span>
            <br />
            <hr />
            {
                renderArticles()
            }
           
        </div>
    )

}

export default ArticleList;
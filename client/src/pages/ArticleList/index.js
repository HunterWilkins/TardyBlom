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
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!state.genre) {
            dispatch({
                type: "genre",
                genre: window.location.pathname.split("/")[2]
            });
        }

        else {
            API.getArticles(0, state.genre).then(function(response) {
                setPage(0);
                setArticles(response.data.rows);
                setLoaded(true);
                setMax(response.data.count);
            });
        }

        
    }, [state.genre]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // function handleInputChange() {

    // }

    // function searchArticles(term){
    //     API.searchArticles(term, page, state.genre).then(function(response) {
    //         setArticles(response.data.rows);
    //         setMax(response.data.count);
    //     })
    // }

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
        setLoaded(false);
        setArticles([]);
        // console.log(page);
        if ((page + num) < (max / limit) && (page + num) > -1 ) {
            setPage(page + num);

            API.getArticles(page + num, state.genre).then(function(response) {
                setArticles(response.data.rows);
                setLoaded(true);
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
                if (loaded) {
                    return(<p id = "no-results">No results for {state.genre}</p>);                                    
                }
                else {
                    return(<p id = "no-results">Please Wait...</p>);                                    
                }
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
                <link rel = "icon" href = "/images/logo.png"></link>
            </Helmet>
            <span id = "pagination">
                <p>Page {page + 1} / { max > 0 ? Math.ceil(max / limit) : 1}</p>
                {/* <input name = "search" onChange = {handleInputChange} placeholder = "Article Name"/> */}
                <span id = "arrows">
                    <img className = {page === 0 ? "deactivated" : ""} id = "backpage" src = "/images/forward-arrow.png" onClick = {() => flipPage(-1)} />
                    <img className = {page + 1 === Math.ceil(max / limit) || max <= 0 ? "deactivated" : ""} src = "/images/forward-arrow.png" onClick = {() => flipPage(1)} />
                </span>
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
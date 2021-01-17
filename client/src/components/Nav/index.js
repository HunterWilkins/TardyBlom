import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";
import API from "../../utils/API";

import Dropdown from "../../components/Dropdown";

function Nav() {

    const [, dispatch] = useGlobalContext();
    // const [genre, setGenre] = useState("");
    const [hover, setHover] = useState({
        review: false,
        ruminations: false,
        random: false
    });
    const [articles, setArticles] = useState(false);
    // let filteredArticles = articles ? articles.filter(article => article.genre === genre) : [];

    useEffect(() => {
        API.getArticles().then(function(response) {
            setArticles(response.data.rows);
            dispatch({
                type: "getArticles",
                articles: response.data.rows
            });
        });
    }, []);

    function setUpGenre(genre) {
        dispatch({
            type: "genre",
            genre: genre
        });
    }

    return(
        <>
        <nav onMouseLeave = {() => setHover(false)}>
            <Link to = "/genres/reviews" onClick = {() => setUpGenre("reviews")} className = "navbutton">
                Reviews
            </Link>
            <Link to = "/genres/ruminations" onClick = {() => setUpGenre("ruminations")} className = "navbutton">
                Ruminations
            </Link>
            <Link to = "/genres/random" onClick = {() => setUpGenre("random")} className = "navbutton">
                Random
            </Link>
            
        </nav>
        </>

    );
}

export default Nav;
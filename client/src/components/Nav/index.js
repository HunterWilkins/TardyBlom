import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";
import API from "../../utils/API";

import Dropdown from "../../components/Dropdown";

function Nav() {

    const [, dispatch] = useGlobalContext();
    const [genre, setGenre] = useState("");
    const [hover, setHover] = useState({
        review: false,
        ruminations: false,
        random: false
    });
    const [articles, setArticles] = useState(false);
    let filteredArticles = articles ? articles.filter(article => article.genre === genre) : [];

    useEffect(() => {
        API.getArticles().then(function(response) {
            console.log(response);
            setArticles(response.data.rows);
            filteredArticles = response.data.rows.filter(article => article.genre === genre);
        });

    }, []);

    return(
        <>
        <nav onMouseLeave = {() => setHover(false)}>
            <div className = "navbutton" onMouseEnter = {() => {
                    setHover({
                        ruminations: false,
                        random: false,
                        review: true
                    });
                    setGenre("Reviews");
                }} 
                // onMouseLeave = {() => setHover(false)}
                >
                <p>Reviews</p>
                {
                    hover.review ? 
                    <Dropdown filteredArticles = {filteredArticles} onMouseLeave = {() => setHover(false)} genre = {genre}/>
                    :
                    ""
                }
            </div>
            <div className = "navbutton" onMouseEnter = {() => {
                    setHover({
                        review: false,
                        random: false,
                        ruminations: true
                    });
                    setGenre("Ruminations");
                }} 
                // onMouseLeave = {() => setHover(false)}
                >
                <p>Ruminations</p>
                {
                    hover.ruminations ? 
                    <Dropdown filteredArticles = {filteredArticles} onMouseLeave = {() => setHover(false)} genre = {genre}/>
                    :
                    ""
                }
            </div>
            <div className = "navbutton" onMouseEnter = {() => {
                    setHover({
                        review: false,
                        ruminations: false,
                        random: true
                    });
                    setGenre("Random");
                }} 
                // onMouseLeave = {() => setHover(false)}
                >
                <p>Random</p>
                {
                    hover.random ?
                    <Dropdown filteredArticles = {filteredArticles} onMouseLeave = {() => setHover(false)} genre = {genre}/>
                    :
                    ""
                }
            </div>
        </nav>
        </>

    );
}

export default Nav;
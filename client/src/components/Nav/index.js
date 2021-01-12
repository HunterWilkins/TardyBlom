import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../utils/GlobalContext";
import "./style.css";
import API from "../../utils/API";

import Dropdown from "../../components/Dropdown";

function Nav() {

    const [, dispatch] = useGlobalContext();
    const [genre, setGenre] = useState("");
    const [hover, setHover] = useState(false);
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
        <nav>
            <p  onMouseEnter = {() => {
                    setHover(true);
                    setGenre("Reviews");
                }} 
                // onMouseLeave = {() => setHover(false)}
                >Reviews</p>
            <p onMouseEnter = {() => {
                    setHover(true);
                    setGenre("Ruminations");
                }} >Ruminations</p>
            <p onMouseEnter = {() => {
                    setHover(true);
                    setGenre("Random");
                }} >Random</p>
        </nav>
        {
            hover ? 
            <Dropdown filteredArticles = {filteredArticles} onMouseLeave = {() => setHover(false)} genre = {genre}/>
            :
            ""
        }

        </>

    );
}

export default Nav;
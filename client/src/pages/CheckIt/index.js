import React, {useEffect} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import PostPreview from "../../components/PostPreview";
import "./style.css";
import API from "../../utils/API";

function CheckIt() {

    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
    }, []);

    function capitalize(string) {
        return (string.slice(0)[0].toUpperCase() + string.slice(1));
    }

    return(
        <div id = "checkit">
            <h2>Check THIS out!</h2>
            <h3>Entertainment reccomendations (not necessarily reviews) that give you everything you need to know about the product</h3>
            {
                state.posts.length < 1 ? <p>No Posts Found. Maybe I just don't like {window.location.pathname.split("/")[1]}?</p>
                :
                state.posts.map(post => {
                    return(
                        <PostPreview key = {post.title + post.createdAt} title = {post.title} createdAt = {post.createdAt}/>
                    );
                })
            }
        </div>
    );
}

export default CheckIt;
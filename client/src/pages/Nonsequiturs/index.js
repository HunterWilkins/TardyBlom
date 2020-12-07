import React, {useEffect} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import PostPreview from "../../components/PostPreview";
import "./style.css";
import API from "../../utils/API";

function Nonsequiturs() {

    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
    }, []);

    function capitalize(string) {
        return (string.slice(0)[0].toUpperCase() + string.slice(1));
    }

    return(
        <div id = "nonsequiturs">
            <h2>Nonsequiturs</h2>
            <h3>All the thoughts that don't fit in the vein of recommendations or theory.</h3>
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

export default Nonsequiturs;
import React, {useEffect} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import PostPreview from "../../components/PostPreview";
import "./style.css";
import API from "../../utils/API";

function Frontpage() {

    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
        API.getPosts(window.location.pathname.split("/")[1])
        .then(res => {
            dispatch({
                type: "getPosts",
                posts: res.data
            });
        }).catch(err => console.log(err));
    }, [window.location.pathname.split("/")[1]]);

    function capitalize(string) {
        return (string.slice(0)[0].toUpperCase() + string.slice(1));
    }

    return(
        <div id = "frontpage">
            <h2>{capitalize(window.location.pathname.split("/")[1])}</h2>
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

export default Frontpage;
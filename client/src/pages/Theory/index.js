import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import PostPreview from "../../components/PostPreview";
import "./style.css";
import API from "../../utils/API";

function Theory() {

    // const [state, dispatch] = useGlobalContext();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.switchChannel("theory").then(({data}) => {
            
            setPosts(data);
            // dispatch({
            //     type: "switchChannel",
            //     channel: "theory",
            //     posts: data
            // });    
        })
    }, []);

    function capitalize(string) {
        return (string.slice(0)[0].toUpperCase() + string.slice(1));
    }

    return(
        <div id = "theory">
            <h2 id = "title">Let's talk Theory</h2>
            <h3 id = "desc">Theory discussion from a jack-of-all-trades</h3>
            <section id = "posts">
            {
                posts.length < 1 ? <p>No Posts Found. Maybe I just don't like {window.location.pathname.split("/")[1]}?</p>
                :
                posts.map(post => {
                    return(
                        <PostPreview key = {post.title + post.createdAt} 
                        title = {post.title} 
                        genre = {post.genre}
                        createdAt = {post.createdAt}
                        />
                    );
                })
            }
            </section>
        </div>
    );
}

export default Theory;
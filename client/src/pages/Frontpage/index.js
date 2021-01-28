import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import PostPreview from "../../components/PostPreview";
import Aside from "../../components/Aside";
import "./style.css";
import API from "../../utils/API";
import {Helmet} from "react-helmet";

function Frontpage() {

    const [state, dispatch] = useGlobalContext();
    const [asideFixed, setAsideFixed] = useState(false);
    const [postPage, setPostPage] = useState(0);
    const [isBottom, setBottom] = useState(false);
    const [max, setMax] = useState(0);
    // const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.getPosts(postPage)
        .then(({data}) => {
            console.log(data);
            setMax(data.count);
            dispatch({
                type: "getPosts",
                posts: data.rows
            });
            // window.addEventListener("scroll", handleScroll);
        });

    }, []);

    // function handleScroll() {
    //     console.log(max + " " + state.posts);
    //     const isBottom = Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight;
    //     // if (isBottom) {
    //     //     addPosts();
    //     // }
    //     if (isBottom) {
    //         addPosts();
    //     }
    //     // setBottom(isBottom);      
    // }
      
    function addPosts() {
    
        if (state.posts.length < max && state.posts.length !== 0) {
            console.log(state.posts.length < max);
            API.getPosts(postPage + 1)
            .then(({data}) => {
                // console.log(data.rows);
                // console.log(state.posts);
                // console.log(state.posts.concat(data.rows));
                dispatch({
                    type: "addToPosts",
                    posts: data.rows
                });
            })    
        }
    }

    function capitalize(string) {
        try {
            return (string.slice(0)[0].toUpperCase() + string.slice(1));
        }

        catch {
            return string;
        }
    }

    return(
        <div id = "frontpage">
            <Helmet>
                <title>Tardyblom Home</title>
            </Helmet>
            <div id = "posts">
            {
                state.posts.length > 0 ?
                state.posts.map(post => {
                    return(
                        <PostPreview 
                            title = {post.title}
                            body = {post.body}
                            createdAt = {post.createdAt}    
                        />
                    );
                })
                : 
                <p>There don't appear to be any posts.</p>
            }
            <button id = "see-more-posts" style = {state.posts.length < max ? {"display":"block"} : {"display":"none"}}onClick = {addPosts}>~ See More ~</button>
            </div>

            <div id = "spacer">
                <Aside />
            </div>
        </div>
    );
}

export default Frontpage;
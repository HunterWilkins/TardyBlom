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
    // const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.getPosts()
        .then(({data}) => {
            console.log(data);
            dispatch({
                type: "getPosts",
                posts: data.rows
            })
        }
        );
    }, []);



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
            </div>

            <div id = "spacer">
                <Aside />
            </div>
        </div>
    );
}

export default Frontpage;
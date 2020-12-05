import React, {useEffect, useState} from "react";
import "./style.css";
import API from "../../utils/API";

function Literature() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.getPosts("literature").then(res => {
            console.log(res.data);
            setPosts(res.data);
        });
    }, [])

    return(
        <div id = "literature">
            <h2>Literature Page</h2>
            {
                posts.map(post => {
                    return(
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Literature;
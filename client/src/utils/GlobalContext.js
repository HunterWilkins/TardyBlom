import React, {useReducer, useContext, createContext} from "react";
import API from "./API";
const GlobalContext = createContext();

const {Provider} = GlobalContext;

const reducer = (state, action) => {
    switch(action.type) {
        case "switchChannel":
            return{
                ...state,
                channel: action.channel,
                posts: []
            }
        case "getPosts":
            return {
                ...state,
                posts: action.posts
            }
        case "clearPosts":
            return {
                ...state,
                posts: []
            }
        case "getArticle":
            return {
                ...state,
                article: API.getArticle(action.article)
            }

        case "login":
            console.log(action.username);
            return {
                ...state,
                username: action.username
            }
        
        default: return state;
    }
}

const GlobalContextProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        channel: "checkit",
        posts: [],
        article: 0,
        username: null
    });

    return <Provider value = {[state, dispatch]} {...props} />
}

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export {GlobalContextProvider, useGlobalContext};
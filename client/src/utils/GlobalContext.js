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
        case "genre":
            return {
                ...state,
                genre: action.genre
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
                article: action.article
            }

        case "login":
            return {
                ...state,
                username: action.username,
                userId: action.userId
            }

        case "logout":
            return {
                ...state,
                username: null,
                userId: null
            }
        case "getArticles":
            return {
                ...state,
                articles: action.articles
            }
        
        default: return state;
    }
}

const GlobalContextProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        channel: "checkit",
        posts: [],
        articles: [],
        genre: null,
        article: 0,
        username: null,
        userId: null,
        darkMode: false
    });

    return <Provider value = {[state, dispatch]} {...props} />
}

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export {GlobalContextProvider, useGlobalContext};
import React, {useReducer, useContext, createContext} from "react";

const GlobalContext = createContext();

const {Provider} = GlobalContext;

const reducer = (state, action) => {
    switch(action.type) {
        case "switchChannel":
            return{
                ...state,
                channel: action.channel,
                posts: action.posts
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
        
        default: return state;
    }
}

const GlobalContextProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        medium: "literature",
        posts: []
    });

    return <Provider value = {[state, dispatch]} {...props} />
}

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export {GlobalContextProvider, useGlobalContext};
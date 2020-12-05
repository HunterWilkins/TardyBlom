import React, {useReducer, useContext, createContext} from "react";

const GlobalContext = createContext();

const {Provider} = GlobalContext;

const reducer = (state, action) => {
    switch(action.type) {
        case "switchMedium":
            return{
                ...state,
                medium: action.medium,
            }
        case "getPosts":
            return {
                ...state,
                posts: action.posts
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
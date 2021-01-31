import axios from "axios";

const API = {
    getPosts: function(page) {
        return axios.get("/api/posts/" + page);
    },
    
    getArticles: function(page, genre) {
        console.log(genre);
        return axios.post("/api/articles/list/" + page, 
        {
            genre: genre
        });
    },

    getArticle: function(id) {
        return axios.get("/api/articles/" + id);
    },

    searchArticles: function(term, page, genre) {
        return axios.post("/api/articles/search", {term: term, page: page, genre: genre});
    },

    getComments: function(id) {
        return axios.get("/api/comment/" + id);
    },

    login: function(body) {
        return axios.post("/api/user/login", body);
    },

    signup: function(body) {
        return axios.post("/api/user/signup", body);
    },

    logout: function() {
        return axios.get("/api/user/logout");
    },
    checkLoggedIn: function() {
        return axios.get("/api/user/check");
    },

    postComment: function(comment) {
        return axios.post("/api/comment", comment);
    }
}

export default API;
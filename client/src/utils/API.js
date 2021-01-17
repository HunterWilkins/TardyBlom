import axios from "axios";

const API = {
    getPosts: function() {
        return axios.get("/api/posts/");
    },
    
    getArticles: function() {
        return axios.get("/api/articles");
    },

    getArticle: function(id) {
        return axios.get("/api/articles/" + id);
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
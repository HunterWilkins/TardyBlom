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

    login: function(body) {
        return axios.post("/api/user/login", body);
    },

    signup: function(body) {
        console.log(body);
        return axios.post("/api/user/signup", body);
    },

    checkLoggedIn: function() {
        return axios.get("/api/user/check");
    }
}

export default API;
import axios from "axios";

const API = {
    getPosts: function(medium) {
        return axios.get("/api/posts/" + medium);
    }
}

export default API;
import axios from "axios";

export default {
    getPosts: function(medium) {
        return axios.get("/api/posts/" + medium);
    }
}
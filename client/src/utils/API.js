import axios from "axios";

const API = {
    switchChannel: function(medium) {
        return axios.get("/api/posts/channel/" + medium);
    }
}

export default API;
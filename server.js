const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
};

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log("The Good Stuff is Listening on Port " + PORT);
});
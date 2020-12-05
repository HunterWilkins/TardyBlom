const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();
const apiRoutes = require("./apiRoutes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
};

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log("The Good Stuff is Listening on Port " + PORT);
});
const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();
const db = require("./models");
const controllers = require("./controllers");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    autoRemove: "interval",
    autoRemoveInterval: 24 * 60,
    cookie: {
        maxAge: (24 * 60 * 60 * 1000)
    }
}))

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
};

app.use("/api/posts", controllers.post);
app.use("/api/comments", controllers.comment);
app.use("/api/articles", controllers.article);
app.use("/api/user", controllers.user);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

db.sequelize.sync().then(function(){
    app.listen(PORT, () => {
        console.log("The Good Stuff is Listening on Port " + PORT);
    });
});
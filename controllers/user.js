const db = require("../models");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    console.log("Hitting login route: " + req.body.email + req.body.password);
    db.User.findOne(
        {
            where: {
                email: req.body.email
            }
        }
    ).then((dbUser) => {
        if (dbUser.validate(req.body.password)) {
            console.log("Found user: " + dbUser.username);
            const response = {
                username: dbUser.username,
                email: dbUser.email
            };
            req.session.user = dbUser.username;
            res.json(response);
        }

        else {
            res.json(false);
        }
       
    }).catch(err => res.json(err));
});

router.get("/check", (req, res) => {
    console.log("This is the current user: " + req.session.user);
    // if (!req.User) {
    //     req.User = "smash";
    // }
    res.json(req.session.user !== null || req.User !== undefined);
})


router.post("/signup", (req, res) => {
    console.log("Creating user...");
    console.log(req.body);
    db.User.create(req.body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
});

module.exports = router;
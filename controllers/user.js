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
            const response = {
                id: dbUser.id,
                username: dbUser.username,
                email: dbUser.email
            };
            req.session.user = response;
            res.json(response);
        }

        else {
            res.json(false);
        }
       
    }).catch(err => res.json(err));
});

router.get("/check", (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    }
    else {
        res.json(false);
    }
});

router.get("/logout", (req, res) => {
    req.session.user = null;
    res.send(200);
})


router.post("/signup", (req, res) => {
    db.User.create(req.body).then(dbUser => {
        const response = {
            id: dbUser.id,
            username: dbUser.username,
            email: dbUser.email
        };
        req.session.user = response;
        res.json(response);
    })
    .catch(err => res.json(err));
});

module.exports = router;
const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/:medium", (req, res) => {
    // if (req.params.medium === "all") {
    //     db.Post.findAll({}).then(dbPosts => res.json(dbPosts))
    //     .catch(err => res.json(err));
    // }

    // else {
        db.Post.findAll(
            req.params.medium === "all" ?
            {}
            :
            {
                medium: req.params.medium
            }
        ).then(dbPosts => res.json(dbPosts)).catch(err => res.json(err));
    // }

});

router.post("/", (req, res) => {
    db.Post.create(req.body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
})

module.exports = router;
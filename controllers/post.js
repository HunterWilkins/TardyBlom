const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    db.Post.findAndCountAll(
        {
           limit: 10,
           offset: 0,
           order: [["id", "DESC"]]
        }
    ).then(dbPosts => {res.json(dbPosts)}).catch(err => res.json(err));
});

router.get("/:title", (req, res) => {
    db.Post.findOne({
        where: {
            title: req.params.title
        }
    }).then(dbPost => res.json(dbPost)).catch(err => res.json(err));
});

router.post("/", (req, res) => {
    db.Post.create(req.body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
});

module.exports = router;
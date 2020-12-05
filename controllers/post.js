const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
    db.Post.findAll({}).then(dbPosts => res.json(dbPosts))
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
    db.Post.create(req.body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
})

module.exports = router;
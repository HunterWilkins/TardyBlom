const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
    db.Comment.findAll({}).then(dbPosts => res.json(dbPosts))
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
    db.Comment.create(req.body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
})

module.exports = router;
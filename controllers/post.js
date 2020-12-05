const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
    db.Post.findAll({}).then(dbPost => res.json(dbPosts))
    .catch(err => res.json(err));
});

module.exports = router;
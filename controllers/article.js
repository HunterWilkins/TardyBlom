const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    db.Article.findAndCountAll(
        {
            limit: 10,
            offset: 0,
            order: [["id", "DESC"]],
            attributes: ["title", "id", "createdAt", "updatedAt", "genre", "medium"]
        }
    ).then(dbPosts => {
        console.log(dbPosts);
        res.json(dbPosts)}).catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
    db.Article.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbPost => res.json(dbPost)).catch(err => res.json(err));
});

router.post("/", (req, res) => {
    db.Article.create(req.body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
});

module.exports = router;
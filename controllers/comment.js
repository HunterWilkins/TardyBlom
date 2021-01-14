const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/:articleId", (req, res) => {
    db.Comment.findAll({
        where: {
            ArticleId: req.params.articleId
        },
        include: [{
            model: db.User,
            attributes: ["username"] 
        }],
        order: [["id", "DESC"]]
    }).then(dbComments => {
        res.json(dbComments);
    })
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
    console.log("Posting a comment...");
    console.log(req.body);
    const body = {
        ArticleId: req.body.articleId,
        UserId: req.body.userId,
        body: req.body.comment
    }
    db.Comment.create(body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
})

module.exports = router;
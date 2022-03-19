const db = require("../models");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const {Op} = require("sequelize");

router.post("/list/:page", (req, res) => {
    const limit = 5;
    db.Article.findAndCountAll(
        {
            where: {
                genre: req.body.genre
            },
            limit: limit,
            offset: req.params.page * limit,
            order: [["id", "DESC"]],
            attributes: ["title", "id", "createdAt", "updatedAt", "genre", "medium"]
        }
    ).then(dbArticles => {   
        console.log(dbArticles); 
        res.json(dbArticles);
    
    }).catch(err => res.json(err));
});

router.get("/:id", async (req, res) => {
    db.Article.findOne({
        where: {
            id: req.params.id
        }
    }).then(async (article) => {
        fs.readFile(path.join(__dirname, `../client/src/assets/articles/${article.body}`), 
        "utf-8",
            (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.json({article, markdown: data});
            });
        


    }).catch(err => res.json(err));

});

router.post("/search", (req, res) => {
    const limit = 5;
    db.Article.findAndCountAll({
        where: {
            [Op.or] : [
                {title: req.body.term},
                {medium: req.body.term}
            ]
        },
        limit: limit,
        offset: req.body.page * limit,
        order: [["id", "DESC"]],
        attributes: ["title", "id", "createdAt", "updatedAt", "genre", "medium"]
    }).then(dbArticles => res.json(dbArticles)).catch(err => res.json(err));
})

// router.post("/", (req, res) => {
//     db.Article.create(req.body).then(dbPost => res.json(dbPost))
//     .catch(err => res.json(err));
// });

module.exports = router;
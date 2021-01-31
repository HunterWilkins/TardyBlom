const db = require("../models");
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

router.get("/:id", (req, res) => {
    // console.log("THIS IS TEH TITLE OF THE THING \n\n\n\n\n\n");
    // console.log(req.params.title);
    // let urlToTitle = req.params.title.replace(/_/g, " ");
    // console.log(urlToTitle);
    db.Article.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbPost => res.json(dbPost)).catch(err => res.json(err));
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
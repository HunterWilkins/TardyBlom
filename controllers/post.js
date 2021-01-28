const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/:page", (req, res) => {
    const limit = 5;
    db.Post.findAndCountAll(
        {
           limit: 5,
           offset: req.params.page * limit,
           order: [["id", "DESC"]],
           attributes: ["title", "body", "createdAt", "updatedAt"]
        }
    ).then(dbPosts => {res.json(dbPosts)}).catch(err => res.json(err));
});

// router.get("/:title", (req, res) => {
//     db.Post.findOne({
//         where: {
//             title: req.params.title
//         }
//     }).then(dbPost => res.json(dbPost)).catch(err => res.json(err));
// });

router.post("/", (req, res) => {
    db.Post.create(req.body).then(dbPost => res.json(dbPost))
    .catch(err => res.json(err));
});

module.exports = router;
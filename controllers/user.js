const db = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// router.post("/login", (req, res) => {   
//     db.User.findOne(
//         {
//             where: {
//                 email: req.body.email,
        
//             }
//         }
//     ).then((dbUser) => {

//         const valid = dbUser.validPassword(req.body.password);
//         if (dbUser === null) {
//             res.sendStatus(404);
//         }
//         else if (valid) {
//             const response = {
//                 id: dbUser.id,
//                 username: dbUser.username,
//                 email: dbUser.email
//             };
//             req.session.user = response;
//             res.json(response);
//         }

//         else {
//             res.sendStatus(401);
//         }
       
//     }).catch(err => {
//         console.log(err);
//         res.sendStatus(401);
//     });
// });

// router.get("/check", (req, res) => {
//     if (req.session.user) {
//         res.json(req.session.user);
//     }
//     else {
//         res.json(false);
//     }
// });

// router.get("/logout", (req, res) => {
//     req.session.user = null;
//     res.sendStatus(200);
// })


// router.post("/signup", (req, res) => {

//     const emailFormat = /.*?@.*?.com/;
//     console.log ();
//     if (req.body.username.length > 0
//         && req.body.password.length > 0
//         && req.body.email.length > 0
//         && emailFormat.test(String(req.body.email).toLowerCase())) {
//             db.User.create(req.body).then(dbUser => {
//                 const response = {
//                     id: dbUser.id,
//                     username: dbUser.username,
//                     email: dbUser.email
//                 };
//                 req.session.user = response;
//                 res.json(response);
//             })
//             .catch(err => {
//                 console.log(err.errors[0].validatorKey);
//                 if (err.errors[0].validatorKey === "not_unique") {
//                     res.json({message: "An account with that email already exists!"});
//                 }
//                 res.json(err);
//             });
//     }

//     else res.json({
//         message: "Double check to see if you typed in your email correctly."
//     });

// });

module.exports = router;
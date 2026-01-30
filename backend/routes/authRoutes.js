const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { v4 : uuidv4 } = require('uuid');


router.post("/login",async (req, res) => {
  const {email, password} = req.body;
  const  person =await User.findOne({email, password});
   if(person){
    const sessionId = uuidv4();
    // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");
    res.cookie("uuid",sessionId);
    res.redirect("/api/description/afterLogIn");
   }
    else{
    res.status(401).send("Invalid credentials");
    }
});



router.post("/register", (req, res) => {
  const {username,email,password} = req.body;
  const newUser = new User({username,email,password});
  newUser.save()
    .then(() => {
      res.redirect("/api/description/afterSignIn");
    })
    .catch((err) => {
      res.status(500).send("Error registering user");
    });
});

module.exports = router;

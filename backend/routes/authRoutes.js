const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { v4 : uuidv4 } = require('uuid');


router.post("/login",async (req, res) => {
  const {email, password} = req.body;
  const  person =await User.findOne({email, password});
   if(person){
    const sessionId = uuidv4();
    // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");
    //protected using sessionId and cookie

   // res.cookie("uuid",sessionId);
    // res.redirect("/api/description/afterLogIn");

    //now,protected using jwt
const token = jwt.sign({id: person._id}, "jwtSecret123");
    res.cookie("token", token);
    res.redirect("/api/description/afterLogIn");
   }

    else{
    res.status(401).json({ message: "Invalid credentials" });
    
    }
});



router.post("/register", (req, res) => {
  const {username,email,password} = req.body;
  const newUser = new User({username,email,password});
  newUser.save()
    .then(() => {
      res.status(200).json({ message: "Registration successful" });
    })
    .catch((err) => {
      res.status(500).send("Error registering user");
    });
});

module.exports = router;

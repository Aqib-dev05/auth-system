const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/authProject';
const authRoutes = require('./routes/authRoutes');
const descriptionafterauthRoutes = require('./routes/descriptionafterauthRoutes');
const PORT= 3000;

 const app= express();

  function checkrestrictedforAuth(req,res,next){
    //session id based
    // const sessionId = req.cookies.uuid;                 
    // if(!sessionId){
    //   return res.status(401).send("Unauthorized: Please log in to access this resource.");
    // }

    //now,toekn based 
    const token=req.cookies.token;
    if(!token){
      return res.status(401).send("Unauthorized: No token provided.");
    }
    // Verify the token using jwt.verify
    jwt.verify(token, 'jwtSecret123', (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden: Invalid token.");
      }
      req.user = user; // Attach user payload to the request object
      next();
    });
  }

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());
 
  app.use(express.static(path.join(__dirname, "/")));
  app.use("/api/auth",authRoutes);
  app.use("/api/description",descriptionafterauthRoutes);

   app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
  });

  //this path will be available only for loggin users.
  app.get('/restrictedtoauth',checkrestrictedforAuth,(req,res)=>{
    res.sendFile(path.join(__dirname, 'restricted.html'));
  })


  //mongodb connection
  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

